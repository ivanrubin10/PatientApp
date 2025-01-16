FROM python:3.9-slim

WORKDIR /app

# Create a non-root user
RUN groupadd -r celery && \
    useradd -r -g celery celery && \
    mkdir -p /app/uploads && \
    chown -R celery:celery /app

COPY requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

COPY . .
RUN chown -R celery:celery /app

# Expose the backend port
EXPOSE 5000

# Switch to non-root user for running the application
USER celery

CMD ["python", "run.py"]