import os
from flask import Blueprint, request, jsonify, send_from_directory, current_app
from werkzeug.utils import secure_filename
from app.models import Patient
from app.schemas import PatientSchema
from app.utils import allowed_file, save_file
from app import db
from app.tasks import send_confirmation_email
from flask_cors import CORS
from sqlalchemy.exc import IntegrityError, SQLAlchemyError
import logging
import re

patient_bp = Blueprint('patients', __name__)
CORS(patient_bp)

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Create uploads directory if it doesn't exist
@patient_bp.before_request
def create_upload_directory():
    if not os.path.exists(current_app.config['UPLOAD_FOLDER']):
        os.makedirs(current_app.config['UPLOAD_FOLDER'], exist_ok=True)

def validate_patient_data(data, file):
    errors = {}
    
    # Name validation
    if not data.get('name'):
        errors['name'] = 'Name is required'
    elif len(data['name']) < 2:
        errors['name'] = 'Name must be at least 2 characters'
    
    # Email validation
    email_regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    if not data.get('email'):
        errors['email'] = 'Email is required'
    elif not re.match(email_regex, data['email']):
        errors['email'] = 'Invalid email format'
    elif Patient.query.filter_by(email=data['email']).first():
        errors['email'] = 'Email already registered'
    
    # Phone validation
    phone_regex = r'^\+?[\d\s-]{10,}$'
    if not data.get('phone'):
        errors['phone'] = 'Phone number is required'
    elif not re.match(phone_regex, data['phone']):
        errors['phone'] = 'Invalid phone number format'
    
    # File validation
    if not file:
        errors['document'] = 'Document photo is required'
    else:
        if not file.filename or '.' not in file.filename:
            errors['document'] = 'Invalid file'
        else:
            ext = file.filename.rsplit('.', 1)[1].lower()
            if ext not in ['jpg', 'jpeg', 'png']:
                errors['document'] = 'Only JPG and PNG files are allowed'
            if len(file.read()) > 5 * 1024 * 1024:  # 5MB
                errors['document'] = 'File size must be less than 5MB'
            file.seek(0)  # Reset file pointer after reading
    
    return errors

@patient_bp.route('/register', methods=['POST'])
def register_patient():
    try:
        if 'document_photo' not in request.files:
            return jsonify({'errors': {'document': 'No file uploaded'}}), 400
            
        file = request.files['document_photo']
        data = request.form.to_dict()
        
        # Validate data
        errors = validate_patient_data(data, file)
        if errors:
            return jsonify({'errors': errors}), 400
            
        # Save file
        filename = secure_filename(file.filename)
        file.save(f'uploads/{filename}')
        
        # Create patient
        patient = Patient(
            name=data['name'],
            email=data['email'],
            phone=data['phone'],
            document_photo=filename
        )
        
        db.session.add(patient)
        db.session.commit()
        
        # Send email notification
        send_confirmation_email.delay(patient.email)
        
        return jsonify({
            'message': 'Patient registered successfully',
            'patient_id': patient.id
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'errors': {'general': str(e)}}), 500

@patient_bp.route('/patients', methods=['GET'])
def get_patients():
    try:
        patients = Patient.query.all()
        return jsonify([{
            'id': p.id,
            'name': p.name,
            'email': p.email,
            'phone': p.phone,
            'document_photo': p.document_photo
        } for p in patients])
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@patient_bp.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(current_app.config['UPLOAD_FOLDER'], filename)