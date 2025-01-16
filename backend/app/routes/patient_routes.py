import os
from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
from app.models import Patient
from app.schemas import PatientSchema
from app.utils import allowed_file, save_file
from app import db
from app.tasks import send_confirmation_email
from flask_cors import CORS
from sqlalchemy.exc import IntegrityError, SQLAlchemyError
import logging

UPLOAD_FOLDER = 'uploads/'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

patient_bp = Blueprint('patients', __name__)
CORS(patient_bp)

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@patient_bp.route('/register', methods=['POST'])
def register_patient():
    try:
        data = request.form
        file = request.files.get('document_photo')

        if not file or not allowed_file(file.filename):
            logger.warning(f"Invalid file format attempted: {file.filename if file else 'No file'}")
            return jsonify({'errors': {'document_photo': 'Invalid file format. Only .jpg allowed'}}), 400

        filename = save_file(file, UPLOAD_FOLDER)

        patient_data = {
            'name': data.get('name'),
            'email': data.get('email'),
            'phone': data.get('phone'),
            'document_photo': filename
        }

        schema = PatientSchema()
        errors = schema.validate(patient_data)
        if errors:
            logger.warning(f"Validation errors: {errors}")
            return jsonify({'errors': errors}), 400

        # Check if email already exists
        if patient_data['email'] and Patient.query.filter_by(email=patient_data['email']).first():
            logger.info(f"Duplicate email registration attempt: {patient_data['email']}")
            return jsonify({'errors': {'email': 'This email is already registered'}}), 400

        patient = Patient(**patient_data)
        db.session.add(patient)
        try:
            db.session.commit()
        except IntegrityError as e:
            db.session.rollback()
            logger.warning(f"IntegrityError during registration: {str(e)}")
            return jsonify({'errors': {'email': 'This email is already registered'}}), 400
        except SQLAlchemyError as e:
            db.session.rollback()
            logger.error(f"Database error during registration: {str(e)}")
            return jsonify({'errors': {'general': 'Database error occurred'}}), 500

        if patient.email:
            send_confirmation_email.delay(patient.email)
            logger.info(f"Registration successful for email: {patient.email}")

        return jsonify({'message': 'Patient registered successfully!'}), 201

    except Exception as e:
        db.session.rollback()
        logger.error(f"Unexpected error in register_patient: {str(e)}", exc_info=True)
        return jsonify({'errors': {'general': 'An error occurred while registering the patient'}}), 500

@patient_bp.route('/patients', methods=['GET'])
def get_patients():
    try:
        patients = Patient.query.all()
        schema = PatientSchema(many=True)
        return jsonify(schema.dump(patients)), 200
    except Exception as e:
        logger.error(f"Error fetching patients: {str(e)}", exc_info=True)
        return jsonify({'errors': {'general': 'Error fetching patients'}}), 500