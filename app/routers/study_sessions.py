# routers/study_sessions.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db import get_db
from app.schemas.study_sessions import StudySessionCreate, StudySessionOut, StudySessionUpdate
from app.models.study_sessions import StudySession

router = APIRouter(prefix="/study-sessions", tags=["study_sessions"])

@router.post("/", response_model=StudySessionOut)
def create_study_session(session: StudySessionCreate, db: Session = Depends(get_db)):
    new_session = StudySession(**session.model_dump())
    db.add(new_session)
    db.commit()
    db.refresh(new_session)
    return StudySessionOut.model_validate(new_session, from_attributes=True)

