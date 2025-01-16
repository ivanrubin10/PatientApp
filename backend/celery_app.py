from app import create_app, celery
from app.celeryconfig import *

flask_app = create_app()

# Configure Celery with Redis
celery.conf.update(
    broker_url='redis://redis:6379/0',
    result_backend='redis://redis:6379/0',
    broker_connection_retry_on_startup=True
)

# Update with Flask config
celery.conf.update(flask_app.config)

# This ensures the application context is available to tasks
TaskBase = celery.Task
class ContextTask(TaskBase):
    abstract = True
    def __call__(self, *args, **kwargs):
        with flask_app.app_context():
            return TaskBase.__call__(self, *args, **kwargs)
celery.Task = ContextTask 