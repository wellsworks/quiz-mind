# routers/study_sessions.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db import get_db
from app.schemas.study_sessions import StudySessionCreate, StudySessionOut, StudySessionUpdate
from app.models.study_sessions import StudySession
from app.deps import get_current_user
from app.models.user import User

router = APIRouter(prefix="/study-sessions", tags=["study_sessions"])

@router.post("/", response_model=StudySessionOut)
def create_study_session(session: StudySessionCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if session.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to create session for this user")
    new_session = StudySession(**session.model_dump())
    db.add(new_session)
    db.commit()
    db.refresh(new_session)
    return StudySessionOut.model_validate(new_session, from_attributes=True)

@router.get("/{session_id}", response_model=StudySessionOut)
def get_study_session(session_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_session = db.query(StudySession).filter(StudySession.id == session_id).first()
    if not db_session:
        raise HTTPException(status_code=404, detail="Study session not found")
    if db_session.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to access this study session")
    return StudySessionOut.model_validate(db_session, from_attributes=True)

@router.get("/", response_model=list[StudySessionOut])
def list_study_sessions(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    sessions = db.query(StudySession).filter(StudySession.user_id == current_user.id).all()
    return [StudySessionOut.model_validate(session, from_attributes=True) for session in sessions]

@router.put("/{session_id}", response_model=StudySessionOut)
def update_study_session(session_id: int, session: StudySessionUpdate, db: Session = Depends(get_db)):
    db_session = db.query(StudySession).filter(StudySession.id == session_id).first()
    if not db_session:
        raise HTTPException(status_code=404, detail="Study session not found")
    for key, value in session.model_dump().items():
        setattr(db_session, key, value)
    db.commit()
    db.refresh(db_session)
    return StudySessionOut.model_validate(db_session, from_attributes=True)

@router.patch("/{session_id}", response_model=StudySessionOut)
def partial_update_study_session(session_id: int, session: StudySessionUpdate, db: Session = Depends(get_db)):
    db_session = db.query(StudySession).filter(StudySession.id == session_id).first()
    if not db_session:
        raise HTTPException(status_code=404, detail="Study session not found")
    for key, value in session.model_dump(exclude_unset=True).items():
        setattr(db_session, key, value)
    db.commit()
    db.refresh(db_session)
    return StudySessionOut.model_validate(db_session, from_attributes=True)

@router.delete("/{session_id}", response_model=dict)
def delete_study_session(session_id: int, db: Session = Depends(get_db)):
    db_session = db.query(StudySession).filter(StudySession.id == session_id).first()
    if not db_session:
        raise HTTPException(status_code=404, detail="Study session not found")
    db.delete(db_session)
    db.commit()
    return {"detail": "Study session deleted"}

