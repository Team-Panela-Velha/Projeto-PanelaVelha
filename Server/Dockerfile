FROM python:3.12-alpine

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    GUNICORN_WORKERS=2

WORKDIR /app

# dependências primeiro: a camada fica em cache enquanto o requirements.txt não mudar
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN adduser -D -H appuser
USER appuser

EXPOSE 5000

HEALTHCHECK --interval=15s --timeout=5s --start-period=20s --retries=3 \
    CMD wget -q -O /dev/null http://127.0.0.1:5000/api/health || exit 1

CMD ["sh", "-c", "exec gunicorn --bind 0.0.0.0:5000 --workers ${GUNICORN_WORKERS} --access-logfile - app:app"]
