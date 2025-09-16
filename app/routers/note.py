# routers/note.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db import get_db
from app.schemas.note import NoteCreate, NoteOut, NoteUpdate
from app.models.note import Note

router = APIRouter(prefix="/notes", tags=["notes"])

@router.post("/", response_model=NoteOut)
def create_note(note: NoteCreate, db: Session = Depends(get_db)):
    new_note = Note(title=note.title, content=note.content, user_id=1)  # Assuming user_id=1 for simplicity, update after auth is implemented
    db.add(new_note)
    db.commit()
    db.refresh(new_note)
    return NoteOut.model_validate(new_note, from_attributes=True)

