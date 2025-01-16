# Patient App

A patient management system built with Vue 3 + Flask. Register patients, store their info and documents, with email notifications.

## Tech Stack

### Frontend
- Vue 3 with Composition API
- TypeScript
- Vite for building
- Font Awesome icons
- Vue Router for navigation

### Backend
- Flask (Python web framework)
- SQLAlchemy ORM
- PostgreSQL database
- Redis for message queue
- Celery for background tasks
- Flask-Mail for emails

## Setup

### Requirements
- Docker & Docker Compose
- Gmail account for sending emails

### 1. Gmail Setup
1. Go to your Google Account settings
2. Navigate to Security > 2-Step Verification
3. At the bottom, click on "App passwords"
5. Click "Generate"
6. Copy the 16-character password

### 2. Environment Setup

1. Create `.env` in root folder:
```bash
GMAIL_USERNAME=your.email@gmail.com
GMAIL_APP_PASSWORD=your-16-char-password  # from step 1
DATABASE_URL=postgresql://postgres:postgres@db:5432/patient_db
SECRET_KEY=your-secret-key-here  # any random string
FLASK_ENV=development
```

2. Create `frontend/.env`:
```bash
VITE_API_URL=http://localhost:5000
```

### 3. Running with Docker

1. First time or clean rebuild:
```bash
# Stop and remove old containers + volumes
docker-compose down -v

# Remove all images (force)
docker rmi $(docker images -q) --force

# Build and start
docker-compose up --build
```

2. Subsequent runs:
```bash
docker-compose up
```

The app will be available at:
- Frontend: http://localhost:4173
- Backend API: http://localhost:5000

### Development Setup (Optional)

If you want to run the frontend separately for development:

1. Start backend with docker:
```bash
docker-compose up
```

2. Run frontend locally:
```bash
cd frontend
npm install
npm run dev
```

## Basic Project Structure

```
patient-manager/
├── backend/           # Flask backend
│   ├── app/
│   │   ├── models/   # Database models
│   │   ├── routes/   # API endpoints
│   │   └── tasks.py  # Celery tasks
│   └── Dockerfile
├── frontend/         # Vue frontend
│   ├── src/
│   │   ├── components/
│   │   ├── views/
│   │   └── assets/
│   └── Dockerfile
└── docker-compose.yml
```
