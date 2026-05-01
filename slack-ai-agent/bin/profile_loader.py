from __future__ import annotations

import os
from dataclasses import dataclass
from pathlib import Path

from dotenv import dotenv_values


SCRIPT_DIR = Path(__file__).resolve().parent
AGENT_ROOT = SCRIPT_DIR.parent
REPO_ROOT = AGENT_ROOT.parent
PROFILES_DIR = AGENT_ROOT / "agents"
DEFAULT_BANNER_PATH = AGENT_ROOT / "banner.txt"


@dataclass(frozen=True)
class RuntimeConfig:
    role: str
    env_source: Path | None
    slack_bot_token: str
    slack_app_token: str
    project_root: Path
    codex_command: str
    cache_path: Path
    max_thread_messages: int
    max_message_chars: int
    codex_output_limit: int
    codex_timeout: int
    banner_path: Path


def _read_env_file(path: Path | None) -> dict[str, str]:
    if not path or not path.exists():
        return {}

    values = dotenv_values(path)
    return {key: value for key, value in values.items() if value is not None}


def _resolve_relative_path(raw_value: str, base_dir: Path) -> Path:
    path = Path(raw_value).expanduser()
    if not path.is_absolute():
        path = (base_dir / path).resolve()
    return path


def resolve_profile_env_path(role: str, explicit_env_file: str | None = None) -> Path | None:
    if explicit_env_file:
        candidate = Path(explicit_env_file).expanduser()
        if not candidate.is_absolute():
            candidate = (REPO_ROOT / candidate).resolve()
        if not candidate.exists():
            raise RuntimeError(f"env file does not exist: {candidate}")
        return candidate

    candidate = PROFILES_DIR / role / ".env"
    if candidate.exists():
        return candidate

    return None


def load_runtime_config(role: str, env_file: str | None = None) -> RuntimeConfig:
    role_name = role.lower()
    role_key = role_name.upper()

    profile_path = resolve_profile_env_path(role_name, env_file)
    profile_env = _read_env_file(profile_path)
    relative_base = profile_path.parent if profile_path else AGENT_ROOT

    def pick(*keys: str, default: str | None = None) -> str | None:
        for mapping in (profile_env, os.environ):
            for key in keys:
                value = mapping.get(key)
                if value:
                    return value
        return default

    slack_bot_token = pick(f"SLACK_BOT_TOKEN_{role_key}", "SLACK_BOT_TOKEN")
    slack_app_token = pick(f"SLACK_APP_TOKEN_{role_key}", "SLACK_APP_TOKEN")

    if not slack_bot_token:
        raise RuntimeError(
            f"SLACK_BOT_TOKEN is required for role={role_name}. "
            f"Use {profile_path or 'a role-specific .env'} or a role-specific key."
        )
    if not slack_app_token:
        raise RuntimeError(
            f"SLACK_APP_TOKEN is required for role={role_name}. "
            f"Use {profile_path or 'a role-specific .env'} or a role-specific key."
        )

    project_root_raw = pick(f"PROJECT_ROOT_{role_key}", "PROJECT_ROOT", default=str(REPO_ROOT))
    if not project_root_raw:
        raise RuntimeError("PROJECT_ROOT is required")
    project_root = _resolve_relative_path(project_root_raw, relative_base)
    if not project_root.exists():
        raise RuntimeError(f"PROJECT_ROOT does not exist: {project_root}")

    codex_command = pick(f"CODEX_COMMAND_{role_key}", "CODEX_COMMAND", default="codex") or "codex"
    cache_path_raw = pick(
        f"AGENT_STATE_PATH_{role_key}",
        "AGENT_STATE_PATH",
        default=str(AGENT_ROOT / "logs" / f".agent_state.{role_name}.json"),
    )
    cache_path = _resolve_relative_path(cache_path_raw, relative_base)

    banner_path_raw = pick(
        f"BANNER_PATH_{role_key}",
        "BANNER_PATH",
        default=str(DEFAULT_BANNER_PATH),
    )
    banner_path = _resolve_relative_path(banner_path_raw, relative_base)

    max_thread_messages = int(pick("SLACK_THREAD_LIMIT", default="12") or "12")
    max_message_chars = int(pick("SLACK_MESSAGE_LIMIT", default="500") or "500")
    codex_output_limit = int(pick("CODEX_OUTPUT_LIMIT", default="3500") or "3500")
    codex_timeout = int(pick("CODEX_TIMEOUT", default="240") or "240")

    return RuntimeConfig(
        role=role_name,
        env_source=profile_path,
        slack_bot_token=slack_bot_token,
        slack_app_token=slack_app_token,
        project_root=project_root,
        codex_command=codex_command,
        cache_path=cache_path,
        max_thread_messages=max_thread_messages,
        max_message_chars=max_message_chars,
        codex_output_limit=codex_output_limit,
        codex_timeout=codex_timeout,
        banner_path=banner_path,
    )
