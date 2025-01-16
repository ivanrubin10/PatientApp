from celery import shared_task
from app.services.email_service import send_email
from app import create_app
import os

@shared_task
def send_confirmation_email(recipient_email):
    template_path = os.path.join(os.path.dirname(__file__), 'templates/email_confirmation.html')
    try:
        app = create_app()
        with app.app_context():
            send_email(
                recipient=recipient_email,
                subject="Registration Confirmation",
                template_path=template_path
            )
            return f"Email sent successfully to {recipient_email}"
    except Exception as e:
        return f"Failed to send email: {str(e)}"
