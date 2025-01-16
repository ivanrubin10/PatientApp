import os

class Config:
    # Database
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        'SQLALCHEMY_DATABASE_URI',
        'postgresql://postgres:postgres@db:5432/patient_db'
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # Celery
    CELERY_BROKER_URL = 'redis://redis:6379/0'
    CELERY_RESULT_BACKEND = 'redis://redis:6379/0'
    broker_connection_retry_on_startup = True
    
    # Other configs
    SECRET_KEY = os.environ.get('SECRET_KEY', 'your-secret-key')
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USE_SSL = False
    MAIL_USERNAME = os.environ.get('GMAIL_USERNAME')
    MAIL_PASSWORD = os.environ.get('GMAIL_APP_PASSWORD')
    MAIL_DEFAULT_SENDER = ('Patient App', os.environ.get('GMAIL_USERNAME'))
    MAIL_MAX_EMAILS = None
    MAIL_ASCII_ATTACHMENTS = False
    MAIL_DEBUG = True

    def __init__(self):
        # Add logging for debugging
        print(f"MAIL_USERNAME: {self.MAIL_USERNAME}")
        print(f"Environment variables: {dict(os.environ)}")