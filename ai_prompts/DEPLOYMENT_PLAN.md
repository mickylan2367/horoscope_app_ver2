# Deployment Plan: Vercel + Render

This document is the working checklist for deploying LovelyWitch Life with:

- Vercel for the React/Vite frontend
- Render for the Django backend
- PostgreSQL on Render for production data

## Target Architecture

```text
Browser
  |
  v
Vercel: React frontend
  | /api/* and /media/* rewrites
  v
Render: Django backend
  |
  v
Render PostgreSQL
```

React should stay a static frontend. Django should own the API, auth, uploaded media, chart logic, tarot logic, diary logic, and OpenAI-backed features.

## Phase 1: Code Preparation

### Frontend

1. Done: `react_frontend/vite.config.js` is configured for Vercel.
   - Production build output should be `dist`.
   - Development proxy can remain for local work.
   - Avoid building directly into `django_backend/static/react` for Vercel deploys.

2. Done: `react_frontend/vercel.json` has been added.
   - Rewrite `/api/:path*` to the Render backend.
   - Rewrite `/media/:path*` to the Render backend.
   - Rewrite all other routes to `/index.html` for React Router.
   - Before deploying, replace `REPLACE_WITH_RENDER_SERVICE` with the actual Render service name.

3. Keep API calls as relative paths.
   - Existing calls like `/api/auth/me/` are good.
   - Do not hard-code the Render URL in React components if using Vercel rewrites.

### Backend

1. Done: production dependencies have been added to `django_backend/requirements.txt`.
   - `gunicorn`
   - `dj-database-url`
   - `psycopg[binary]`
   - `whitenoise`

2. Done: `django_backend/horoscope/settings.py` supports production environment variables.
   - Read `SECRET_KEY` from environment.
   - Read `DEBUG` from environment.
   - Read `ALLOWED_HOSTS` from environment.
   - Read `CSRF_TRUSTED_ORIGINS` from environment.
   - Use `DATABASE_URL` when present.
   - Keep SQLite fallback for local development.

3. Done: `Dockerfile` is Render-ready.
   - Keep the `/opt/venv` virtual environment.
   - Use `gunicorn` instead of Django `runserver`.
   - Bind to Render's `$PORT`.
   - Run `collectstatic` during image build.

4. Decide media handling.
   - Short term: Render persistent disk mounted to `django_backend/media`.
   - Better long term: S3-compatible object storage.

## Phase 2: Render Backend Setup

1. Create a PostgreSQL database on Render.
   - Copy the internal database URL.

2. Create a Render Web Service.
   - Source: GitHub repository.
   - Root directory: repository root.
   - Runtime: Docker.
   - Dockerfile path: `Dockerfile`.

3. Set Render environment variables.

```text
SECRET_KEY=<generated-secret>
DEBUG=false
ALLOWED_HOSTS=<your-service>.onrender.com,<your-vercel-domain>
CSRF_TRUSTED_ORIGINS=https://<your-vercel-domain>
DATABASE_URL=<render-postgres-internal-url>
OPENAI_API_KEY=<your-openai-key>
SECURE_SSL_REDIRECT=true
SECURE_HSTS_SECONDS=3600
```

4. Deploy the service.

5. Run migrations.
   - Use Render Shell or a one-off job:

```bash
python manage.py migrate
```

6. Seed required app data if needed.

```bash
python manage.py seed_default_tarot
```

7. Create an admin user if needed.

```bash
python manage.py createsuperuser
```

8. Verify backend endpoints.

```text
https://<your-service>.onrender.com/api/csrf/
https://<your-service>.onrender.com/api/auth/me/
```

## Phase 3: Vercel Frontend Setup

1. Import the GitHub repository into Vercel.

2. Configure the project.

```text
Framework Preset: Vite
Root Directory: react_frontend
Install Command: npm ci
Build Command: npm run build
Output Directory: dist
```

3. Add `react_frontend/vercel.json`.

This file already exists. Replace `REPLACE_WITH_RENDER_SERVICE` before deploying:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://<your-service>.onrender.com/api/:path*"
    },
    {
      "source": "/media/:path*",
      "destination": "https://<your-service>.onrender.com/media/:path*"
    },
    {
      "source": "/:path*",
      "destination": "/index.html"
    }
  ]
}
```

4. Deploy the Vercel project.

5. Copy the Vercel production URL.

6. Add that URL to Render.

```text
CSRF_TRUSTED_ORIGINS=https://<your-vercel-domain>
```

7. Redeploy Render after changing environment variables.

## Phase 4: Verification

Run these checks after both services are deployed.

1. Frontend loads from Vercel.
2. React Router pages refresh correctly.
3. `/api/csrf/` works through Vercel.
4. Register works.
5. Login works.
6. Logout works.
7. Diary list/create/edit/delete works.
8. Image upload works.
9. Profile update works.
10. Chart calculation works.
11. Tarot deck/card/reading flows work.
12. OpenAI-backed chat/consult features work when `OPENAI_API_KEY` is set.
13. Admin login works on Render if needed.

## Phase 5: CI Follow-Up

1. Keep the existing CI jobs:
   - frontend lint
   - frontend build
   - backend tests
   - Docker image build

2. After Vercel config is added, ensure CI uses the same production frontend output.

3. Optional future checks:
   - `python manage.py check --deploy`
   - Docker container smoke test
   - migration check

## Important Notes

- Do not use SQLite for production unless this is only a disposable demo.
- Do not commit `.env`, local database files, media uploads, or API keys.
- Render free services can sleep, so the first request after inactivity can be slow.
- Cross-origin auth is simpler if Vercel proxies `/api/*` to Render and React keeps using relative URLs.
- Uploaded media on Render needs persistent storage or object storage, otherwise files can disappear after redeploys.
