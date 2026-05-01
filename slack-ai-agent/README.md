# slack-ai-agent

Slack bot runner for this repository's private role agents.

<p style="width:80%;text-align:center">
<img src="img/console.png">
</p>

- Once you activate the app, select the agnets you want to use.

<p style="width:80%;text-align:center">
<img src="img/console2.png">
</p>


## What It Uses

- `slack-ai-agent/app.py` starts the selected role or launches all roles.
- `slack-ai-agent/bin/` contains the runtime code.
- `slack-ai-agent/agents/` stores private role profiles, role instructions, and local state.
- `slack-ai-agent/logs/` stores runtime logs and agent state snapshots.

## Role Structure

Each role is stored in its own directory:

- `agents/planner/`
- `agents/frontend/`
- `agents/backend/`
- `agents/reviewer/`
- `agents/integrator/`

Each role directory should contain:

- `.env` for secrets and runtime settings
- `<role>.md` for the role instructions
- Optional role state files such as `.agent_state.<role>.json`

The shared agent docs live under `slack-ai-agent/agents/` and are loaded by the runtime:

- `agent_board.md`
- `decisions.md`
- `rules.md`

## Environment Files

The launcher first looks for `agents/<role>/.env`, then falls back to process environment variables.

Minimal required keys:

```dotenv
SLACK_BOT_TOKEN=xoxb-...
SLACK_APP_TOKEN=xapp-...
```

Optional overrides:

```dotenv
PROJECT_ROOT=C:\Users\Owner\OneDrive\horoscope_project
CODEX_COMMAND=codex
AGENT_STATE_PATH=slack-ai-agent/logs/.agent_state.planner.json
BANNER_PATH=slack-ai-agent/banner.txt
SLACK_THREAD_LIMIT=12
SLACK_MESSAGE_LIMIT=500
CODEX_OUTPUT_LIMIT=3500
CODEX_TIMEOUT=240
```

Role-specific environment variables are also supported:

- `SLACK_BOT_TOKEN_<ROLE>`
- `SLACK_APP_TOKEN_<ROLE>`
- `PROJECT_ROOT_<ROLE>`
- `CODEX_COMMAND_<ROLE>`
- `AGENT_STATE_PATH_<ROLE>`
- `BANNER_PATH_<ROLE>`

If both are present, the role `.env` file wins over process environment variables.

## Run

From the repository root:

```powershell
python .\slack-ai-agent\app.py
```

Useful options:

- `--role <role>` runs one role directly
- `--all` launches every role
- `--list-roles` prints the available roles
- `--no-banner` suppresses the banner
- `--env-file <path>` uses a specific `.env` file for the selected role

Examples:

```powershell
python .\slack-ai-agent\app.py --role planner
python .\slack-ai-agent\app.py --all
python .\slack-ai-agent\app.py --list-roles
```

## Logs

- Process logs are written to `slack-ai-agent/logs/<role>.log`
- Agent state is written to `slack-ai-agent/logs/.agent_state.<role>.json`

## Notes

- The private role instruction files are intentionally not documented here in detail.
- If you only need the Django app, you do not need to run this Slack agent.
