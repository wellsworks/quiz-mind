import time
from sqlalchemy.orm import Session
from app.db import SessionLocal 
from app.util.ai_flashcard_jobs import update_job_status
from app.ai.flashcards.preprocessing import preprocess_note
from app.routers.note import get_note
from app.deps import get_current_user
from app.models.ai_flashcard_job import AIFlashcardJob

def run_flashcard_job(job_id: int):
    db: Session = SessionLocal()
    user = get_current_user(db)
    job = db.query(AIFlashcardJob).filter(AIFlashcardJob.id == job_id).first()

    try:
        update_job_status(db, job_id, "pending")

        note = get_note(job.note_id)
        processed_text = preprocess_note(note.content)

        time.sleep(15)
        update_job_status(db, job_id, "completed")

    except Exception as e:
        update_job_status(db, job_id, "failed", str(e))

    finally:
        db.close()