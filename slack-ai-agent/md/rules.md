# Global Agent Rules

These rules apply to every agent in this repository.

## Common Context

- The project is a Django + React astrology app.
- Main directories: `django_backend/`, `react_frontend/`, `slack-ai-agent/md/`.
- The app may include horoscope profiles, heliocentric/geocentric charts, Sabian symbols, AI readings, caching, and a book-like UI.

## Sources of Truth

1. Notion MCP for product intent, requirements, and planning notes
2. Local repository for the current implementation
3. `docs/agent_board.md` for current tasks
4. `docs/decisions.md` for confirmed decisions

If sources conflict, report the conflict and the safest option before editing.

## Hard Restrictions

- Do not delete, rename, or move files, folders, routes, models, or components without approval.
- Do not rewrite large parts of the code or introduce new libraries without approval.
- Do not change unrelated code.
- Do not hide errors or warnings.
- Do not claim tests passed unless you ran them or explained why you could not.

## Before Editing

Before any file edit, output:

### Pre-Change Plan

- Task being handled:
- Target files:
- Reason for each file change:
- Expected UI/API/behavior impact:
- Files that will not be touched:
- Assumptions:

Do not edit until that plan is stated.

## After Editing

After edits, output:

### Task Summary

- What was implemented

### Changed Files

- File path: brief explanation

### Code Changes

- Relevant diff or changed sections only

### Behavior Changes

- What changed for users or developers

### How to Test

- Exact commands
- Exact pages, routes, or endpoints to open
- Expected result

### Risks / Side Effects

- Possible bugs
- Edge cases
- What might break

### Rollback Plan

- How to revert this change

### Next Suggested Task

- One small next task

## Style

- Prefer minimal changes.
- Preserve existing names and structure.
- Keep explanations concise.
- Ask for confirmation before risky edits.
