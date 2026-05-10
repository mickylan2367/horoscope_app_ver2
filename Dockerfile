FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    VIRTUAL_ENV=/opt/venv \
    PATH="/opt/venv/bin:$PATH"

WORKDIR /app

RUN python -m venv "$VIRTUAL_ENV" \
    && pip install --upgrade pip setuptools wheel

COPY django_backend/requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r /app/requirements.txt

COPY django_backend/ /app/django_backend/

WORKDIR /app/django_backend

RUN python manage.py collectstatic --noinput

EXPOSE 8000

CMD gunicorn horoscope.wsgi:application --bind 0.0.0.0:${PORT:-8000}
