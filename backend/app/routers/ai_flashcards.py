from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session
from app.db import get_db
from app.util.ai_flashcard_jobs import create_flashcard_job, get_flashcard_job_for_note
from app.deps import get_current_user
from app.routers.note import get_note
from app.ai.flashcards.job_runner import run_flashcard_job
import logging

router = APIRouter(
    prefix="/notes",
    tags=["AI Flashcards"]
)

@router.get("/{note_id}/flashcards/generate")
def get_job_status_for_note(
    note_id: int, 
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
): 
    job = get_flashcard_job_for_note(db, note_id, user.id)
    if not job:
        return {
            "job_id": None,
            "status": "idle"
        }
    
    return {
        "job_id": job.id,
        "status": job.status,
        "error": job.error_message,
    }


@router.post("/{note_id}/flashcards/generate")
def generate_flashcards(
    note_id: int,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
): 
    note = get_note(note_id, db, user)
    if not note:
        raise HTTPException(status_code=404)
    
    existing_job = get_flashcard_job_for_note(db, note_id, user.id)
    if existing_job and existing_job.status == "pending":
        return {
            "job_id": existing_job.id,
            "status":existing_job.status,
        }
    
    job = create_flashcard_job(
        db=db,
        note_id=note.id,
        user_id=user.id,
        model_name="gpt-4o-mini",
        requested_count=10,
    )

    background_tasks.add_task(
        run_flashcard_job, 
        job_id=job.id,
        user_id=user.id,
    )
    logger = logging.getLogger(__name__)
    logger.info(f"Starting flashcard job {job.id}")

    return {
        "job_id": job.id,
        "status": job.status,
    }