# Patient Management System

A full-stack web application for managing patient records and appointments, built with Vue.js, Flask, PostgreSQL, Redis and Celery.

## Features

- Patient record management
- Appointment scheduling and management 
- Email notifications
- Background task processing
- Secure authentication
- RESTful API

## Tech Stack

### Frontend
- Vue.js
- Vite
- Axios for API calls

### Backend
- Flask
- SQLAlchemy ORM
- PostgreSQL database
- Redis for caching and message broker
- Celery for background tasks
- Flask-Mail for email notifications

## Setup

1. Clone the repository

```bash
git clone https://github.com/yourusername/patient-management-system.git
cd patient-management-system

```
2. Set up environment variables

Create a `.env` file in the root directory and add:

```
DATABASE_URL=postgresql://postgres:postgres@db:5432/patient_db
SECRET_KEY=your-secret-key
FLASK_ENV=development
GMAIL_USERNAME=your.email@gmail.com
GMAIL_APP_PASSWORD=your_app_password
```

Create `frontend/.env`:

```
VITE_API_URL=http://localhost:5000
```

3. **Build and run with Docker Compose**

```bash
bash
docker-compose up --build
```

## Usage

1. **Access the application**:
   - Frontend: http://localhost:4173
   - Backend API: http://localhost:5000

2. **Register a patient**:
   - Navigate to http://localhost:4173/register
   - Fill in the patient details
   - Upload a document (supported format: jpg)
   - Submit the form

3. **View registered patients**:
   - Navigate to http://localhost:4173
   - View the list of all registered patients

## API Endpoints

- `POST /register`: Register a new patient
  - Accepts multipart/form-data with fields:
    - name: string
    - email: string
    - phone: string
    - document_photo: file (jpg)

- `GET /patients`: Get list of all patients

## Project Structure

```
patient-management-system/
├── backend/
│ ├── app/
│ │ ├── routes/
│ │ ├── services/
│ │ ├── templates/
│ │ └── tasks.py
│ ├── Dockerfile
│ └── requirements.txt
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── views/
│ │ └── App.vue
│ ├── Dockerfile
│ └── package.json
└── docker-compose.yml
```