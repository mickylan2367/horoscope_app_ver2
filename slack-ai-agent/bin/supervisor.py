from __future__ import annotations

import os
import subprocess
import sys
import threading
import time
from pathlib import Path

from .agent_roles import ROLE_ORDER
from .profile_loader import AGENT_ROOT, resolve_profile_env_path


APP_PATH = AGENT_ROOT / "app.py"
LOG_DIR = AGENT_ROOT / "logs"
RESET = "\033[0m"
ROLE_COLORS = {
    "planner": "\033[95m",
    "frontend": "\033[94m",
    "backend": "\033[96m",
    "reviewer": "\033[93m",
    "integrator": "\033[92m",
}


def _supervisor_event(event: str, detail: str) -> str:
    return f"[{event}] {detail}"


def _role_event(role: str, event: str, detail: str) -> str:
    color = ROLE_COLORS.get(role, "\033[90m")
    return f"{color}[{event}] role={role} {detail}{RESET}"


def _build_command(role: str, env_file: Path | None) -> list[str]:
    command = [sys.executable, str(APP_PATH), "--role", role, "--no-banner"]
    if env_file:
        command.extend(["--env-file", str(env_file)])
    return command


def _relay_output(role: str, stream, log_file) -> None:
    for raw_line in iter(stream.readline, ""):
        if not raw_line:
            break
        line = raw_line.rstrip("\r\n")
        if not line:
            print("", flush=True)
            log_file.write("\n")
            log_file.flush()
            continue
        print(line, flush=True)
        log_file.write(raw_line)
        log_file.flush()
    stream.close()


def _launch_process(role: str, env_file: Path | None) -> tuple[subprocess.Popen, object, Path]:
    LOG_DIR.mkdir(parents=True, exist_ok=True)
    log_path = LOG_DIR / f"{role}.log"
    log_file = log_path.open("a", encoding="utf-8")

    env = os.environ.copy()
    env["PYTHONUNBUFFERED"] = "1"

    process = subprocess.Popen(
        _build_command(role, env_file),
        cwd=str(AGENT_ROOT.parent),
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        env=env,
        text=True,
        bufsize=1,
    )
    return process, log_file, log_path


def launch_all_agents(roles: list[str] | None = None) -> None:
    selected_roles = roles or ROLE_ORDER
    processes: dict[str, tuple[subprocess.Popen, object, Path]] = {}

    print(_supervisor_event("launch", "Launching Slack agent processes:"))
    for role in selected_roles:
        env_file = resolve_profile_env_path(role)
        process, log_file, log_path = _launch_process(role, env_file)
        processes[role] = (process, log_file, log_path)
        env_label = str(env_file) if env_file else "[os.environ only]"
        print(_role_event(role, "launch", f"pid={process.pid} env={env_label} log={log_path}"))
        if process.stdout is not None:
            relay_thread = threading.Thread(
                target=_relay_output,
                args=(role, process.stdout, log_file),
                daemon=True,
            )
            relay_thread.start()

    print(_supervisor_event("complete", "all requested agents launched"))

    try:
        while processes:
            for role, (process, log_file, log_path) in list(processes.items()):
                exit_code = process.poll()
                if exit_code is None:
                    continue
                print(_role_event(role, "exit", f"code={exit_code}; log={log_path}"))
                log_file.close()
                processes.pop(role, None)
            time.sleep(2)
    except KeyboardInterrupt:
        print(_supervisor_event("shutdown", "Stopping agent processes..."))
        for role, (process, log_file, log_path) in processes.items():
            if process.poll() is None:
                process.terminate()
                print(_role_event(role, "shutdown", f"terminate requested; log={log_path}"))
            log_file.close()
        for role, (process, _, log_path) in processes.items():
            if process.poll() is None:
                try:
                    process.wait(timeout=10)
                except subprocess.TimeoutExpired:
                    process.kill()
                    print(_role_event(role, "shutdown", f"killed; log={log_path}"))
