from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db import get_db
from app.util.ai_flashcard_jobs import get_flashcard_job
from app.deps import get_current_user

router = APIRouter(prefix="/ai/jobs", tags=["AI Jobs"])

@router.get("/{job_id}")
def get_job_status(
    job_id: int,
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
): 
    job = get_flashcard_job(db, job_id, user.id)
    if not job:
        raise HTTPException(status_code=404)

    return {
        "job_id": job.id,
        "status": job.status,
        "error": job.error_message,
    }