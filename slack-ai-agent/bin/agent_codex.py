from __future__ import annotations

import subprocess
import re
from pathlib import Path

from .agent_context import read_markdown, safe_truncate
from .agent_roles import RoleConfig
from .profile_loader import AGENT_ROOT


def build_role_bundle(role_config: RoleConfig) -> str:
    docs = [
        ("rules", AGENT_ROOT / "agents" / "rules.md"),
        ("role", AGENT_ROOT / role_config.instructions_file),
    ]
    docs.extend((Path(doc).stem, AGENT_ROOT / doc) for doc in role_config.extra_docs)

    parts = []
    seen: set[Path] = set()
    for label, path in docs:
        if path in seen:
            continue
        seen.add(path)
        parts.append(f"## {label}\n\n{read_markdown(path).strip()}\n")
    return "\n".join(parts).strip()


def format_thread_context(messages: list[dict], current_user_text: str, max_message_chars: int) -> str:
    lines = []
    for msg in messages:
        text = re.sub(r"\s+", " ", (msg.get("text", "") or "")).strip()
        if not text:
            continue
        if len(text) > max_message_chars:
            text = safe_truncate(text, max_message_chars)
        user = msg.get("user") or msg.get("bot_id") or msg.get("username") or "unknown"
        lines.append(f"- {user}: {text}")

    if current_user_text:
        lines.append(f"- latest_request: {current_user_text}")

    return "\n".join(lines).strip() or "- [no thread context]"


def build_codex_prompt(role_config: RoleConfig, task_text: str, thread_context: str) -> str:
    docs_bundle = build_role_bundle(role_config)
    allowed_roots_text = "\n".join(f"- {root}" for root in role_config.allowed_roots) or "- [no editable roots]"
    edit_policy = (
        "You are not allowed to edit files."
        if role_config.sandbox == "read-only"
        else "You may edit only the paths listed below. Do not modify files outside these roots."
    )
    return f"""You are the Slack-connected {role_config.name} agent for this repository.

Follow the repository instructions below.
Do not output progress updates, planning chatter, or readiness messages.
Do not say things like "I'm thinking" or "I'm ready".
If the task is already satisfied or duplicates the last request, say so briefly and do not repeat previous content.
Keep the response concise and useful for Slack.
{edit_policy}

## Editable Roots

{allowed_roots_text}

## Role Context

{docs_bundle}

## Slack Thread Context

{thread_context}

## Current Request

{task_text}

## Output Rules

- Respond in Japanese unless the thread is clearly English.
- If you need clarification, ask one short question only.
- If you can act, give the concrete result, changed file list, or review findings that matter.
- Avoid repeating the same conclusion twice.
"""


def run_codex(prompt: str, codex_command: str, project_root: Path, sandbox: str, timeout: int, output_limit: int) -> str:
    command = [
        codex_command,
        "exec",
        "-",
        "--sandbox",
        sandbox,
        "--color",
        "never",
    ]

    try:
        result = subprocess.run(
            command,
            cwd=str(project_root),
            input=prompt,
            capture_output=True,
            text=True,
            timeout=timeout,
            encoding="utf-8",
            errors="replace",
        )
    except subprocess.TimeoutExpired:
        return "Codex execution timed out."
    except FileNotFoundError:
        return f"Codex command not found: {codex_command}"

    stdout = (result.stdout or "").strip()
    stderr = (result.stderr or "").strip()

    if result.returncode != 0:
        detail = stderr or stdout or "unknown error"
        return f"Codex error:\n```text\n{safe_truncate(detail, output_limit)}\n```"

    output = (stdout or stderr).strip()
    if not output:
        return ""

    return safe_truncate(output, output_limit)


def post_message(client, channel: str, text: str) -> None:
    if not text:
        return
    client.chat_postMessage(channel=channel, text=text)
