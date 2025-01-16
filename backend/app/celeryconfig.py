# Broker settings
broker_url = 'redis://redis:6379/0'
result_backend = 'redis://redis:6379/0'
broker_connection_retry_on_startup = True

# Serialization
task_serializer = 'json'
result_serializer = 'json'
accept_content = ['json']
timezone = 'UTC'
enable_utc = True

# Make sure Celery recognizes our tasks
imports = ('app.tasks',)

# Redis connection settings
broker_transport_options = {'visibility_timeout': 3600}
redis_max_connections = 20

# Task settings
task_annotations = {'*': {'rate_limit': '10/s'}}
worker_prefetch_multiplier = 1 