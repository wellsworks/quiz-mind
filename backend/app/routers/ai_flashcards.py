from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db import get_db
from app.util.ai_flashcard_jobs import create_flashcard_job
from app.deps import get_current_user
from app.routers.note import get_note

router = APIRouter(
    prefix="/notes",
    tags=["AI Flashcards"]
)

@router.post("/{note_id}/flashcards/generate")
def generate_flashcards(
    note_id: int,
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
): 
    note = get_note(note_id, db, user)
    if not note:
        raise HTTPException(status_code=404)
    
    job = create_flashcard_job(
        db=db,
        note_id=note.id,
        user_id=user.id,
        model_name="gpt-4o-mini",
        requested_count=10,
    )

    return {
        "job_id": job.id,
        "status": job.status,
    }