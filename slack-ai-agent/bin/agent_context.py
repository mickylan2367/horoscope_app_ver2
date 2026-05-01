from __future__ import annotations

import hashlib
import json
import re
import subprocess
from time import time
from pathlib import Path

from .profile_loader import AGENT_ROOT


DEFAULT_INFLIGHT_TTL_SECONDS = 3600


def load_json_file(path: Path) -> dict:
    if not path.exists():
        return {"threads": {}, "processed_event_ids": {}, "inflight_event_ids": {}}

    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError):
        return {"threads": {}, "processed_event_ids": {}, "inflight_event_ids": {}}

    if not isinstance(data, dict):
        return {"threads": {}, "processed_event_ids": {}, "inflight_event_ids": {}}

    data.setdefault("threads", {})
    data.setdefault("processed_event_ids", {})
    data.setdefault("inflight_event_ids", {})
    return data


def save_json_file(path: Path, data: dict) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")


def normalize_text(text: str) -> str:
    text = re.sub(r"<@[^>]+>", "", text or "")
    text = re.sub(r"\s+", " ", text).strip()
    return text


def safe_truncate(text: str, limit: int) -> str:
    if len(text) <= limit:
        return text
    return text[:limit].rstrip() + "..."


def short_hash(text: str) -> str:
    return hashlib.sha256(text.encode("utf-8")).hexdigest()[:16]


def get_thread_root_ts(event: dict) -> str:
    return str(event.get("thread_ts") or event.get("ts") or "")


def get_event_identity(body: dict, event: dict) -> str:
    event_id = body.get("event_id")
    if event_id:
        return str(event_id)

    channel = event.get("channel", "")
    ts = event.get("ts") or event.get("event_ts") or ""
    user = event.get("user") or event.get("bot_id") or "unknown"
    text = normalize_text(event.get("text", ""))
    return f"{channel}:{ts}:{user}:{short_hash(text)}"


def _purge_expired_inflight(state: dict, ttl_seconds: int = DEFAULT_INFLIGHT_TTL_SECONDS) -> bool:
    inflight = state.get("inflight_event_ids", {})
    if not inflight:
        state["inflight_event_ids"] = {}
        return False

    now = time()
    changed = False
    for event_identity, started_at in list(inflight.items()):
        try:
            if now - float(started_at) >= ttl_seconds:
                inflight.pop(event_identity, None)
                changed = True
        except (TypeError, ValueError):
            inflight.pop(event_identity, None)
            changed = True

    state["inflight_event_ids"] = inflight
    return changed


def claim_event(cache_path: Path, event_identity: str, ttl_seconds: int = 3600) -> bool:
    state = load_state(cache_path)
    _purge_expired_inflight(state, ttl_seconds)
    processed = state.get("processed_event_ids", {})
    if event_identity in processed:
        save_state(cache_path, state)
        return False

    inflight = state.get("inflight_event_ids", {})
    now = time()
    inflight_started_at = inflight.get(event_identity)
    if inflight_started_at is not None:
        try:
            if now - float(inflight_started_at) < ttl_seconds:
                return False
        except (TypeError, ValueError):
            pass

    inflight[event_identity] = now
    state["inflight_event_ids"] = inflight
    save_state(cache_path, state)
    return True


def complete_event(cache_path: Path, event_identity: str) -> None:
    state = load_state(cache_path)
    _purge_expired_inflight(state)
    inflight = state.get("inflight_event_ids", {})
    processed = state.get("processed_event_ids", {})
    inflight.pop(event_identity, None)
    processed[event_identity] = time()
    state["inflight_event_ids"] = inflight
    state["processed_event_ids"] = processed
    save_state(cache_path, state)


def release_event(cache_path: Path, event_identity: str) -> None:
    state = load_state(cache_path)
    _purge_expired_inflight(state)
    inflight = state.get("inflight_event_ids", {})
    inflight.pop(event_identity, None)
    state["inflight_event_ids"] = inflight
    save_state(cache_path, state)


def read_markdown(path: Path) -> str:
    if not path.exists():
        return f"[missing: {path.as_posix()}]"
    try:
        return path.read_text(encoding="utf-8")
    except OSError as exc:
        return f"[read error: {path.as_posix()} | {type(exc).__name__}: {exc}]"


def snapshot_worktree(repo_root: Path) -> set[str]:
    try:
        result = subprocess.run(
            ["git", "-C", str(repo_root), "status", "--porcelain=v1"],
            capture_output=True,
            text=True,
            encoding="utf-8",
            errors="replace",
            check=False,
        )
    except FileNotFoundError:
        return set()

    if result.returncode != 0:
        return set()

    paths: set[str] = set()
    for raw_line in result.stdout.splitlines():
        if len(raw_line) < 4:
            continue
        path_part = raw_line[3:].strip()
        if not path_part:
            continue
        if " -> " in path_part:
            path_part = path_part.split(" -> ", 1)[1]
        paths.add(path_part.replace("\\", "/"))
    return paths


def _is_under(path: Path, root: Path) -> bool:
    try:
        return path.resolve().is_relative_to(root.resolve())
    except AttributeError:
        try:
            path.resolve().relative_to(root.resolve())
            return True
        except ValueError:
            return False


def validate_worktree_changes(
    repo_root: Path,
    before: set[str],
    after: set[str],
    allowed_roots: tuple[str, ...],
) -> list[str]:
    if not allowed_roots:
        return []

    allowed_paths = tuple((repo_root / root).resolve() for root in allowed_roots)
    ignored_prefixes = (
        "slack-ai-agent/logs/",
        "slack-ai-agent/logs\\",
    )

    violations: list[str] = []
    for rel_path in sorted(after - before):
        if rel_path.startswith(ignored_prefixes):
            continue
        full_path = (repo_root / rel_path).resolve()
        if any(_is_under(full_path, allowed_root) for allowed_root in allowed_paths):
            continue
        violations.append(rel_path)
    return violations


def load_state(cache_path: Path) -> dict:
    return load_json_file(cache_path)


def save_state(cache_path: Path, state: dict) -> None:
    save_json_file(cache_path, state)


def get_thread_state(cache_path: Path, thread_key: str) -> dict:
    state = load_state(cache_path)
    return state.get("threads", {}).get(thread_key, {})


def mark_thread_state(cache_path: Path, thread_key: str, **updates) -> None:
    state = load_state(cache_path)
    threads = state.get("threads", {})
    thread_state = threads.get(thread_key, {})
    thread_state.update(updates)
    thread_state["updated_at"] = time()
    threads[thread_key] = thread_state
    state["threads"] = threads
    save_state(cache_path, state)
