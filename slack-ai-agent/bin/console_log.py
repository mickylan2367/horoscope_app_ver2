from __future__ import annotations

from datetime import datetime


ROLE_COLORS = {
    "planner": "\033[95m",
    "frontend": "\033[94m",
    "backend": "\033[96m",
    "reviewer": "\033[93m",
    "integrator": "\033[92m",
}
RESET = "\033[0m"
COMPLETE_COLORS = ["\033[91m", "\033[93m", "\033[92m", "\033[96m", "\033[94m", "\033[95m"]


def _role_color(role: str | None) -> str:
    return ROLE_COLORS.get((role or "").lower(), "\033[90m")


def log_event(event: str, detail: str, role: str | None = None) -> None:
    timestamp = datetime.now().strftime("%H:%M:%S")
    color = _role_color(role)
    label = f"[{event}]"
    role_part = f" role={role}" if role else ""
    print(f"{color}{label}{RESET}{role_part} {timestamp} {detail}", flush=True)


def complete_banner(text: str) -> str:
    colored = []
    for index, char in enumerate(text):
        color = COMPLETE_COLORS[index % len(COMPLETE_COLORS)]
        colored.append(f"\033[1m{color}{char}{RESET}")
    return "".join(colored)


def supervisor_event(event: str, detail: str) -> str:
    return f"[{event}] {detail}"


def role_event(role: str, event: str, detail: str) -> str:
    color = _role_color(role)
    return f"{color}[{event}] role={role} {detail}{RESET}"
