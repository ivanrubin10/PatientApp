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

## Deployment Guide

### 1. Prepare Your Repository
1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin your-github-repo-url
git push -u origin main
```

### 2. Deploy Frontend to Netlify
1. Go to [Netlify](https://www.netlify.com/) and sign up/login
2. Click "Add new site" → "Import an existing project"
3. Choose "Deploy with GitHub"
4. Select your repository
5. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Base directory: `frontend`
6. Click "Deploy site"
7. While deploying, set up environment variables:
   - Go to Site settings → Environment variables
   - Add `VITE_API_URL` with your Railway backend URL (after setting up Railway)

### 3. Deploy Backend to Railway
1. Go to [Railway](https://railway.app/) and sign up/login
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Configure the project:
   - Choose the "backend" directory as source
   - Railway will auto-detect Python
5. Add required services:
   - Click "New" → "Database" → "Add PostgreSQL"
   - Click "New" → "Database" → "Add Redis"
6. Set up environment variables:
   ```
   GMAIL_USERNAME=your.email@gmail.com
   GMAIL_APP_PASSWORD=your-16-char-password
   SECRET_KEY=your-secret-key
   FLASK_ENV=production
   CORS_ORIGIN=your-netlify-url
   ```
   Note: Railway automatically provides DATABASE_URL

### 4. Connect Services
1. Update frontend environment:
   ```bash
   # frontend/.env.production
   VITE_API_URL=https://your-railway-url.railway.app
   ```

2. Trigger a new Netlify deploy:
   - Go to Netlify dashboard
   - Select your site
   - Click "Trigger deploy"

### Troubleshooting
1. If builds fail:
   - Check build logs in respective platforms
   - Verify environment variables are set
   - Ensure all dependencies are listed in requirements.txt/package.json

2. If CORS issues occur:
   - Verify CORS_ORIGIN in Railway matches your Netlify URL
   - Check for trailing slashes in URLs

3. If database issues occur:
   - Check Railway's PostgreSQL connection details
   - Verify DATABASE_URL is being used correctly

### Monitoring
- Netlify: Analytics tab in dashboard
- Railway: Metrics tab in project view
- Both platforms provide deployment logs and error tracking

### Automatic Deployments
Both platforms will automatically deploy when you push to your GitHub repository's main branch.

### Custom Domains (Optional)
1. Netlify:
   - Go to "Domain settings"
   - Click "Add custom domain"
   - Follow DNS configuration instructions

2. Railway:
   - Go to project settings
   - Click "Domains"
   - Add your domain and follow DNS instructions
