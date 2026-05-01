# Project Decisions

This file records confirmed decisions only. Do not add guesses, temporary ideas, or unapproved architecture changes here.

## Decision Format

### YYYY-MM-DD - Decision title

- Decision:
- Reason:
- Alternatives considered:
- Impact:
- Related files:

---

## Confirmed Decisions

### 2026-04-30 - Keep backend and frontend separated

- Decision: Keep Django and React separated into `django_backend/` and `react_frontend/`.
- Reason: The repository already uses this structure, and it keeps agent scopes clear.
- Alternatives considered: Rename directories to generic `backend/` and `frontend/`.
- Impact: Backend Agent edits `django_backend/` only; Frontend Agent edits `react_frontend/` only.
- Related files: `md/backend.md`, `md/frontend.md`, `md/rules.md`
