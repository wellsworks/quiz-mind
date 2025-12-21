# app/util/ai_flashcard_jobs.py
from sqlalchemy.orm import Session
from app.models.ai_flashcard_job import AIFlashcardJob

def create_flashcard_job(
        db: Session,
        note_id: int,
        user_id: int,
        model_name: str | None = None,
        requested_count: int | None = None,
):
    job = AIFlashcardJob(
        note_id=note_id,
        user_id=user_id,
        model_name=model_name,
        requested_count=requested_count,
        status="pending",
    )
    db.add(job)
    db.commit()
    db.refresh(job)
    return job

def get_flashcard_job(db: Session, job_id: int, user_id: int):
    return (
        db.query(AIFlashcardJob)
        .filter(AIFlashcardJob.id == job_id)
        .filter(AIFlashcardJob.user_id == user_id)
        .first()
    )

def update_job_status(
        db: Session,
        job_id: int,
        status: str,
        error_message: str | None = None,
):
    job = db.query(AIFlashcardJob).get(job_id)
    job.status = status
    job.error_message = error_message
    db.commit()

def get_flashcard_job_for_note(db: Session, note_id: int, user_id: int):
    return (
        db.query(AIFlashcardJob)
        .filter(AIFlashcardJob.user_id == user_id)
        .filter(AIFlashcardJob.note_id == note_id)
        .order_by(AIFlashcardJob.id.desc())
        .first()
    )