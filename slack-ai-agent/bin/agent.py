from __future__ import annotations

import hashlib
import threading
from pathlib import Path
from time import time

from slack_bolt import App
from slack_bolt.adapter.socket_mode import SocketModeHandler

from .agent_codex import build_codex_prompt, format_thread_context, post_message, run_codex
from .agent_context import (
    claim_event,
    complete_event,
    release_event,
    get_event_identity,
    get_thread_root_ts,
    get_thread_state,
    mark_thread_state,
    snapshot_worktree,
    validate_worktree_changes,
)
from .agent_roles import ROLE_ORDER, RoleConfig, resolve_role_config
from .console_log import log_event
from .profile_loader import RuntimeConfig, load_runtime_config


RUNTIME_CONFIG: RuntimeConfig | None = None
ACTIVE_ROLE_CONFIG: RoleConfig | None = None
SLACK_BOT_TOKEN: str | None = None
SLACK_APP_TOKEN: str | None = None
PROJECT_ROOT_PATH: Path | None = None
CODEX_COMMAND: str = "codex"
CACHE_PATH: Path | None = None
MAX_THREAD_MESSAGES: int = 12
MAX_MESSAGE_CHARS: int = 500
CODEX_OUTPUT_LIMIT: int = 3500
CODEX_TIMEOUT: int = 240
BOT_USER_ID: str | None = None


def _require_runtime_config() -> RuntimeConfig:
    if RUNTIME_CONFIG is None:
        raise RuntimeError("runtime configuration is not initialized")
    return RUNTIME_CONFIG


def configure_runtime(role: str, env_file: str | None = None) -> RuntimeConfig:
    global RUNTIME_CONFIG
    global ACTIVE_ROLE_CONFIG
    global SLACK_BOT_TOKEN
    global SLACK_APP_TOKEN
    global PROJECT_ROOT_PATH
    global CODEX_COMMAND
    global CACHE_PATH
    global MAX_THREAD_MESSAGES
    global MAX_MESSAGE_CHARS
    global CODEX_OUTPUT_LIMIT
    global CODEX_TIMEOUT

    runtime_config = load_runtime_config(role, env_file)
    role_config = resolve_role_config(runtime_config.role)

    RUNTIME_CONFIG = runtime_config
    ACTIVE_ROLE_CONFIG = role_config
    SLACK_BOT_TOKEN = runtime_config.slack_bot_token
    SLACK_APP_TOKEN = runtime_config.slack_app_token
    PROJECT_ROOT_PATH = runtime_config.project_root
    CODEX_COMMAND = runtime_config.codex_command
    CACHE_PATH = runtime_config.cache_path
    MAX_THREAD_MESSAGES = runtime_config.max_thread_messages
    MAX_MESSAGE_CHARS = runtime_config.max_message_chars
    CODEX_OUTPUT_LIMIT = runtime_config.codex_output_limit
    CODEX_TIMEOUT = runtime_config.codex_timeout

    return runtime_config


def should_ignore_event(body: dict, event: dict) -> bool:
    if event.get("subtype") == "bot_message":
        return True
    if BOT_USER_ID and event.get("user") == BOT_USER_ID:
        return True
    if CACHE_PATH is None:
        raise RuntimeError("cache path is not initialized")

    event_identity = get_event_identity(body, event)
    return not claim_event(CACHE_PATH, event_identity)


def initialize_bot_user_id(client) -> None:
    global BOT_USER_ID
    try:
        response = client.auth_test()
        BOT_USER_ID = response.get("user_id")
    except Exception:
        BOT_USER_ID = None


def worker_task(client, channel_id: str, thread_root_ts: str, event_identity: str, event: dict) -> None:
    config = _require_runtime_config()
    role_config = ACTIVE_ROLE_CONFIG or resolve_role_config(config.role)
    latest_request = event.get("text", "")
    if not latest_request:
        if CACHE_PATH is not None:
            release_event(CACHE_PATH, event_identity)
        return

    try:
        log_event("request", f"received channel={channel_id} thread={thread_root_ts}", role=role_config.name)
        before_worktree = snapshot_worktree(config.project_root)
        messages = client.conversations_replies(
            channel=channel_id,
            ts=thread_root_ts,
            limit=MAX_THREAD_MESSAGES,
        ).get("messages", [])
        thread_context = format_thread_context(messages, latest_request, MAX_MESSAGE_CHARS)
        request_fingerprint = hashlib.sha256(
            "\n".join([role_config.name, thread_root_ts, latest_request, thread_context]).encode("utf-8")
        ).hexdigest()

        if CACHE_PATH is None:
            raise RuntimeError("cache path is not initialized")
        thread_state = get_thread_state(CACHE_PATH, thread_root_ts)
        if (
            thread_state.get("last_fingerprint") == request_fingerprint
            and thread_state.get("last_response")
            and time() - float(thread_state.get("updated_at", 0)) < 3600
        ):
            log_event("skip", "duplicate request ignored", role=role_config.name)
            complete_event(CACHE_PATH, event_identity)
            return

        prompt = build_codex_prompt(role_config=role_config, task_text=latest_request, thread_context=thread_context)
        log_event("prompt", f"built context_chars={len(prompt)}", role=role_config.name)
        answer = run_codex(
            prompt=prompt,
            codex_command=CODEX_COMMAND,
            project_root=config.project_root,
            sandbox=role_config.sandbox,
            timeout=CODEX_TIMEOUT,
            output_limit=CODEX_OUTPUT_LIMIT,
        )
        if not answer:
            log_event("post", "empty response; nothing sent", role=role_config.name)
            release_event(CACHE_PATH, event_identity)
            return

        after_worktree = snapshot_worktree(config.project_root)
        violations = validate_worktree_changes(
            repo_root=config.project_root,
            before=before_worktree,
            after=after_worktree,
            allowed_roots=role_config.allowed_roots,
        )
        if violations:
            detail = ", ".join(violations)
            log_event("guard", f"blocked out-of-scope changes: {detail}", role=role_config.name)
            release_event(CACHE_PATH, event_identity)
            return

        post_message(client, channel_id, answer)
        log_event("post", f"sent {len(answer)} chars to channel", role=role_config.name)
        mark_thread_state(
            CACHE_PATH,
            thread_root_ts,
            role=role_config.name,
            last_fingerprint=request_fingerprint,
            last_request=latest_request,
            last_response=answer,
        )
        complete_event(CACHE_PATH, event_identity)
    except Exception as exc:
        if CACHE_PATH is not None:
            release_event(CACHE_PATH, event_identity)
        log_event("error", f"{type(exc).__name__}: {exc}", role=role_config.name)


def register_handlers(app: App) -> None:
    @app.event("app_mention")
    def handle_app_mention(event, body, client):
        event_identity = get_event_identity(body, event)
        if should_ignore_event(body, event):
            return

        channel_id = event.get("channel", "")
        thread_root_ts = get_thread_root_ts(event)
        user_id = event.get("user")
        latest_request = event.get("text", "")

        if not channel_id or not thread_root_ts or not latest_request:
            return

        log_event("mention", f"from={user_id} channel={channel_id}", role=_require_runtime_config().role)

        thread = threading.Thread(
            target=worker_task,
            kwargs={
                "client": client,
                "channel_id": channel_id,
                "thread_root_ts": thread_root_ts,
                "event_identity": event_identity,
                "event": event,
            },
            daemon=True,
        )
        thread.start()


def build_slack_app() -> App:
    if SLACK_BOT_TOKEN is None:
        raise RuntimeError("SLACK_BOT_TOKEN is required")
    app = App(token=SLACK_BOT_TOKEN, token_verification_enabled=False)
    register_handlers(app)
    return app


def run(
    role: str | None = None,
    env_file: str | None = None,
    runtime_config: RuntimeConfig | None = None,
) -> None:
    runtime_config = runtime_config or configure_runtime(role or "planner", env_file=env_file)
    app = build_slack_app()

    initialize_bot_user_id(app.client)
    log_event("startup", "Slack agent starting", role=runtime_config.role)
    log_event("config", f"project_root={runtime_config.project_root}", role=runtime_config.role)
    log_event("config", f"codex_sandbox={ACTIVE_ROLE_CONFIG.sandbox if ACTIVE_ROLE_CONFIG else 'unknown'}", role=runtime_config.role)
    if runtime_config.env_source:
        log_event("config", f"profile_env={runtime_config.env_source}", role=runtime_config.role)
    log_event("config", f"banner_path={runtime_config.banner_path}", role=runtime_config.role)
    log_event("complete", "slack agent ready", role=runtime_config.role)
    SocketModeHandler(app, runtime_config.slack_app_token).start()
