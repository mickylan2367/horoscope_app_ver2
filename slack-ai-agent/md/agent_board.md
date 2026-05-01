# Agent Board

## App Summary

Django + React astrology app with a story-driven landing page, diary archive, chart readings, profile/account screens, and book-like UI treatment.

## Current State

- Frontend: React already handles the main app shell, landing page, login/register/profile, diary list/edit/home, chart page, and thank-you screen.
- Frontend: diary archive uses a calendar card and diary cards, and the editor already supports photo attachment and diary updates.
- Backend: Django exposes auth, profile, diary, markdown preview, image, and chart APIs, and still serves legacy template routes alongside `/app/`.
- Backend: React build is already served from Django through `/app/`.

## Requirements

- Source: Notion pages `占いアプリ`, `サイト構成計画`, `2026-04-30 React移行実装ログ`.
- The app should feel like a calm, magical private space rather than a generic dashboard.
- Core flow should center on: landing, login, home/dashboard, diary writing, optional photo capture, diary archive, tarot-like memory reading, horoscope/chart, calendar, and profile.
- Keep AI conversation out of the core product unless a later requirement explicitly adds it.

## Gaps

- There is no single, clearly defined authenticated dashboard that ties diary writing, archive browsing, chart reading, and calendar navigation into one flow.
- Legacy Django template routes still exist beside the React app, so the user journey is split across two surfaces.
- Several visible copy strings and placeholder texts still look inconsistent or unfinished.
- The route map is not yet fully normalized around React as the main user entry point.

## Prioritized Tasks

- Use small task IDs such as `P1-FE-001`, `P1-BE-001`, and `INT-001`.
- Keep each task small, sequential, and safe.

### Priority 1

- `P1-BE-001` - API contract check
  - Agent: Backend
  - Scope: Verify the current auth, diary, image, markdown preview, and chart JSON responses against what React already expects.
  - Dependencies: None.
  - Acceptance criteria: Response shapes are stable, documented in the board, and no current React call is left ambiguous.

- `P1-FE-001` - Authenticated dashboard entry
  - Agent: Frontend
  - Scope: Make the logged-in entry screen clearly present the primary actions: write diary, view archive, open chart, and go to profile/calendar.
  - Dependencies: Stable `/api/auth/me/` and existing layout components.
  - Acceptance criteria: One obvious dashboard route exists, with clear CTAs and no user confusion about where to start.

### Priority 2

- `P2-FE-001` - Copy and polish pass
  - Agent: Frontend
  - Scope: Replace unfinished, garbled, or placeholder copy in the main React surfaces with coherent app text.
  - Dependencies: `P1-FE-001`.
  - Acceptance criteria: Main routes no longer show placeholder-looking copy or encoding noise.

- `INT-001` - Route reconciliation
  - Agent: Integrator
  - Scope: Reconcile React routes and legacy Django routes so main links always land in the intended experience.
  - Dependencies: `P1-FE-001`.
  - Acceptance criteria: Main navigation has no dead ends, and the recommended entry path is consistent across the app.

## Current Decisions

- 2026-04-30 - Keep backend and frontend separated
  - Django and React stay split into `django_backend/` and `react_frontend/`.
  - This keeps agent scopes clear and reduces accidental cross-edits.

## Open Questions

- None blocking.

## Safe Implementation Order

1. Planner updates this board.
2. Backend verifies the API contract.
3. Frontend adds or refines the dashboard entry.
4. Frontend cleans up visible copy and navigation.
5. Integrator reconciles React and legacy Django routes.
6. Reviewer checks the diff.
7. Human confirms.
