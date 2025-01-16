from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail
from celery import Celery
from app.config import Config
from flask_cors import CORS
from os import environ

# Extensions
db = SQLAlchemy()
mail = Mail()
celery = Celery()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize extensions
    db.init_app(app)
    mail.init_app(app)

    # Configure Celery
    celery.conf.update(app.config)

    CORS(app, origins=[environ.get('CORS_ORIGIN', 'http://localhost:4173')])

    with app.app_context():
        # Import routes after app creation to avoid circular imports
        from app.routes.patient_routes import patient_bp
        app.register_blueprint(patient_bp, url_prefix='/')

    return app
