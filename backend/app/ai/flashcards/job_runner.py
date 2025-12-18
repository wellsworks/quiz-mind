import time
from sqlalchemy.orm import Session
from app.db import SessionLocal 
from app.util.ai_flashcard_jobs import update_job_status

def run_flashcard_job(job_id: int):
    db: Session = SessionLocal()

    try:
        update_job_status(db, job_id, "pending")
        time.sleep(15)
        update_job_status(db, job_id, "completed")

    except Exception as e:
        update_job_status(db, job_id, "failed", str(e))

    finally:
        db.close()