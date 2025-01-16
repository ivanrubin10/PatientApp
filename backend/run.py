from app import create_app, db
import time
from sqlalchemy.exc import OperationalError

app = create_app()

def wait_for_db(retries=10, delay=10):
    for i in range(retries):
        try:
            with app.app_context():
                db.create_all()
            print("Database connection successful!")
            return
        except OperationalError as e:
            if i == retries - 1:
                raise e
            print(f"Database not ready, waiting {delay} seconds... (Attempt {i+1}/{retries})")
            time.sleep(delay)

if __name__ == '__main__':
    wait_for_db()
    app.run(host='0.0.0.0', port=5000)