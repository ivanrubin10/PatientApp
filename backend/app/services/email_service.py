from flask_mail import Message
from app import mail
from flask import current_app
import logging

logger = logging.getLogger(__name__)

def send_email(recipient, subject, template_path):
    """Send an email using Flask-Mail."""
    try:
        # Log mail configuration for debugging
        logger.info(f"Mail settings: SERVER={current_app.config['MAIL_SERVER']}, "
                   f"PORT={current_app.config['MAIL_PORT']}, "
                   f"USERNAME={current_app.config['MAIL_USERNAME']}, "
                   f"TLS={current_app.config['MAIL_USE_TLS']}, "
                   f"SSL={current_app.config.get('MAIL_USE_SSL', False)}")
        
        msg = Message(
            subject=subject,
            sender=current_app.config['MAIL_DEFAULT_SENDER'],
            recipients=[recipient]
        )
        
        # Render the email template
        with open(template_path, "r") as template_file:
            msg.html = template_file.read()
        
        mail.send(msg)
        logger.info(f"Email sent successfully to {recipient}")
        return True
    except Exception as e:
        logger.error(f"Failed to send email: {str(e)}")
        logger.exception("Detailed error:")
        raise
