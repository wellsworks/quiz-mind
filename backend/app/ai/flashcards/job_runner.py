import time
from sqlalchemy.orm import Session
from app.db import SessionLocal 
from app.util.ai_flashcard_jobs import update_job_status, get_flashcard_job
from app.util.notes import get_note
from app.util.flashcards import create_flashcard
from app.ai.flashcards.generator import generate_flashcards_pipeline
from app.schemas.flashcard import FlashcardCreate

def run_flashcard_job(job_id: int, user_id: int):
    db: Session = SessionLocal()
    
    try:
        job = get_flashcard_job(db, job_id, user_id)
        update_job_status(db, job_id, "pending")

        note = get_note(db, job.note_id, user_id)

        flashcards = generate_flashcards_pipeline(note.content)

        for fc in flashcards:
            data = FlashcardCreate(
                question=fc.question,
                answer=fc.answer,
                note_id=note.id,
                source="ai_generated",
            )
            create_flashcard(db=db, data=data)

        update_job_status(db, job_id, "completed")

    except Exception as e:
        update_job_status(db, job_id, "failed", str(e))

    finally:
        db.close()