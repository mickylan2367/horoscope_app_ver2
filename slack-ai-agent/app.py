import argparse

from bin.agent import ROLE_ORDER, configure_runtime, run
from bin.cli_ui import (
    choose_launch_mode_interactively,
    choose_role_interactively,
    clear_terminal,
    print_launch_banner,
    print_role_picker,
)
from bin.supervisor import launch_all_agents


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Run a Slack AI agent for this repository.")
    mode = parser.add_mutually_exclusive_group()
    mode.add_argument(
        "--all",
        action="store_true",
        help="Launch all roles at once using separate processes.",
    )
    mode.add_argument(
        "--role",
        choices=ROLE_ORDER,
        help="Agent role to run. Overrides AGENT_ROLE from .env.",
    )
    mode.add_argument(
        "--list-roles",
        action="store_true",
        help="Print available roles and exit.",
    )
    parser.add_argument(
        "--no-banner",
        action="store_true",
        help="Suppress the launch banner for child processes.",
    )
    parser.add_argument(
        "--env-file",
        help="Optional profile .env file for the selected role.",
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    if args.all:
        clear_terminal()
        print_launch_banner("ALL AGENTS")
        launch_all_agents()
        return
    if args.list_roles:
        clear_terminal()
        print_launch_banner("ROLE LIST")
        print_role_picker(0)
        return

    if args.role is not None:
        runtime_config = configure_runtime(args.role, args.env_file)
        if not args.no_banner:
            print_launch_banner(args.role, runtime_config.banner_path)
        run(role=args.role, env_file=args.env_file, runtime_config=runtime_config)
        return

    launch_mode = choose_launch_mode_interactively("single")
    if launch_mode == "all":
        clear_terminal()
        print_launch_banner("ALL AGENTS")
        launch_all_agents()
        return

    selected_role = choose_role_interactively("planner")
    runtime_config = configure_runtime(selected_role, args.env_file)
    if not args.no_banner:
        print_launch_banner(selected_role, runtime_config.banner_path)
    run(role=selected_role, env_file=args.env_file, runtime_config=runtime_config)


if __name__ == "__main__":
    main()
