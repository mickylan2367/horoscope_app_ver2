import os
import sys
from pathlib import Path

if os.name == "nt":
    import msvcrt

from .agent_roles import ROLE_CONFIGS, ROLE_ORDER

RAINBOW = ["\033[91m", "\033[93m", "\033[92m", "\033[96m", "\033[94m", "\033[95m"]
RESET = "\033[0m"

SCRIPT_DIR = Path(__file__).resolve().parent
DEFAULT_BANNER_PATH = SCRIPT_DIR.parent / "banner.txt"


def rainbow_line(text: str) -> str:
    colored = []
    for index, char in enumerate(text):
        color = RAINBOW[index % len(RAINBOW)]
        colored.append(f"{color}{char}{RESET}")
    return "".join(colored)


def load_banner_lines(banner_path: str | Path | None = None) -> list[str]:
    if banner_path is None:
        banner_path = os.getenv("BANNER_PATH", str(DEFAULT_BANNER_PATH))
    banner_path = Path(banner_path).expanduser()
    if not banner_path.is_absolute():
        banner_path = (SCRIPT_DIR / banner_path).resolve()

    if not banner_path.exists():
        return ["SLACK AI AGENT"]

    for encoding in ("utf-8-sig", "utf-8", "cp932"):
        try:
            text = banner_path.read_text(encoding=encoding)
            lines = text.replace("\r\n", "\n").replace("\r", "\n").expandtabs(4).split("\n")
            while lines and not lines[0].strip():
                lines.pop(0)
            while lines and not lines[-1].strip():
                lines.pop()
            return lines or ["SLACK AI AGENT"]
        except OSError:
            return ["SLACK AI AGENT"]
        except UnicodeDecodeError:
            continue

    return ["SLACK AI AGENT"]


def print_launch_banner(role_name: str, banner_path: str | Path | None = None) -> None:
    title_lines = load_banner_lines(banner_path)
    width = max(len(line) for line in title_lines)
    top = "+" + "-" * (width + 2) + "+"
    bottom = "+" + "-" * (width + 2) + "+"

    print()
    print(rainbow_line(top))
    for index, line in enumerate(title_lines):
        print(f"{RAINBOW[index % len(RAINBOW)]}| {line.ljust(width)} |{RESET}")
    print(rainbow_line(bottom))
    print(rainbow_line(f"ROLE: {role_name.upper()} | THREADS: ON | DUPLICATE GUARD: ON"))
    print()


def print_role_picker(selected_index: int) -> None:
    print(rainbow_line("+--------------------------------------------------+"))
    print(rainbow_line("|      USE UP / DOWN AND ENTER TO CHOOSE ROLE      |"))
    print(rainbow_line("+--------------------------------------------------+"))
    for index, role in enumerate(ROLE_ORDER):
        config = ROLE_CONFIGS[role]
        pointer = ">" if index == selected_index else " "
        line = f" {pointer} {index + 1}. {role:<10} [{config.sandbox}]"
        color = RAINBOW[index % len(RAINBOW)]
        if index == selected_index:
            print(f"{color}{line}{RESET}")
        else:
            print(line)
    print()


def print_launch_mode_picker(selected_index: int) -> None:
    modes = ["single", "all"]
    print(rainbow_line("+--------------------------------------------------+"))
    print(rainbow_line("|      USE UP / DOWN AND ENTER TO CHOOSE MODE      |"))
    print(rainbow_line("+--------------------------------------------------+"))
    for index, mode in enumerate(modes):
        pointer = ">" if index == selected_index else " "
        label = "single role" if mode == "single" else "all roles"
        line = f" {pointer} {index + 1}. {label:<20}"
        color = RAINBOW[index % len(RAINBOW)]
        if index == selected_index:
            print(f"{color}{line}{RESET}")
        else:
            print(line)
    print()


def clear_terminal() -> None:
    if sys.stdout.isatty():
        os.system("cls" if os.name == "nt" else "clear")


def read_single_key() -> str:
    if os.name == "nt":
        first = msvcrt.getwch()
        if first in ("\x00", "\xe0"):
            second = msvcrt.getwch()
            return {"H": "up", "P": "down", "K": "left", "M": "right"}.get(second, "")
        if first in ("\r", "\n"):
            return "enter"
        if first == "\x1b":
            return "escape"
        return first

    import termios
    import tty

    fd = sys.stdin.fileno()
    old_settings = termios.tcgetattr(fd)
    try:
        tty.setraw(fd)
        first = sys.stdin.read(1)
        if first == "\x1b":
            second = sys.stdin.read(1)
            if second == "[":
                third = sys.stdin.read(1)
                return {"A": "up", "B": "down", "C": "right", "D": "left"}.get(third, "")
            return "escape"
        if first in ("\r", "\n"):
            return "enter"
        return first
    finally:
        termios.tcsetattr(fd, termios.TCSADRAIN, old_settings)


def choose_role_interactively(default_role: str) -> str:
    if not sys.stdin.isatty():
        return default_role

    roles = ROLE_ORDER
    selected_index = roles.index(default_role) if default_role in roles else 0

    while True:
        clear_terminal()
        print_launch_banner("ROLE PICKER")
        print_role_picker(selected_index)
        key = read_single_key()
        if key == "up":
            selected_index = (selected_index - 1) % len(roles)
        elif key == "down":
            selected_index = (selected_index + 1) % len(roles)
        elif key == "enter":
            return roles[selected_index]
        elif key == "escape":
            return default_role


def choose_launch_mode_interactively(default_mode: str = "single") -> str:
    if not sys.stdin.isatty():
        return default_mode

    modes = ["single", "all"]
    selected_index = modes.index(default_mode) if default_mode in modes else 0

    while True:
        clear_terminal()
        print_launch_banner("LAUNCH MODE")
        print_launch_mode_picker(selected_index)
        key = read_single_key()
        if key == "up":
            selected_index = (selected_index - 1) % len(modes)
        elif key == "down":
            selected_index = (selected_index + 1) % len(modes)
        elif key == "enter":
            return modes[selected_index]
        elif key == "escape":
            return default_mode
