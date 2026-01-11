# routers/note.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db import get_db
from app.schemas.note import NoteCreate, NoteOut, NoteUpdate, NoteSummary
from app.models.note import Note
from app.models.user import User
from app.deps import get_current_user
from app.schemas.flashcard import FlashcardOut
from app.models.flashcard import Flashcard
from app.util.notes import get_notes_with_flashcard_counts

router = APIRouter(prefix="/notes", tags=["notes"])

@router.post("/", response_model=NoteOut)
def create_note(note: NoteCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    new_note = Note(title=note.title, content=note.content, user_id=current_user.id)  # Associate note with current user
    db.add(new_note)
    db.commit()
    db.refresh(new_note)
    return NoteOut.model_validate(new_note, from_attributes=True)

@router.get("/summary", response_model=list[NoteSummary])
def list_note_summaries(
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    note_summaries = get_notes_with_flashcard_counts(db, user.id)
    return [NoteSummary.model_validate(note, from_attributes=True) for note in note_summaries]

@router.get("/{note_id}", response_model=NoteOut)
def get_note(note_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_note = db.query(Note).filter(Note.id == note_id).first()
    if not db_note:
        raise HTTPException(status_code=404, detail="Note not found")
    if db_note.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to access this note")
    return NoteOut.model_validate(db_note, from_attributes=True)

@router.get("/", response_model=list[NoteOut])
def list_notes(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    notes = db.query(Note).filter(Note.user_id == current_user.id).all()
    return [NoteOut.model_validate(note, from_attributes=True) for note in notes]

@router.put("/{note_id}", response_model=NoteOut)
def update_note(note_id: int, note: NoteUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_note = db.query(Note).filter(Note.id == note_id).first()
    if not db_note:
        raise HTTPException(status_code=404, detail="Note not found")
    if db_note.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to update this note")
    db_note.title = note.title
    db_note.content = note.content
    db.commit()
    db.refresh(db_note)
    return NoteOut.model_validate(db_note, from_attributes=True)

@router.patch("/{note_id}", response_model=NoteOut)
def partial_update_note(note_id: int, note: NoteUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_note = db.query(Note).filter(Note.id == note_id).first()
    if not db_note:
        raise HTTPException(status_code=404, detail="Note not found")
    if db_note.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to update this note")
    if note.title:
        db_note.title = note.title
    if note.content:
        db_note.content = note.content
    db.commit()
    db.refresh(db_note)
    return NoteOut.model_validate(db_note, from_attributes=True)

@router.delete("/{note_id}", response_model=dict)
def delete_note(note_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_note = db.query(Note).filter(Note.id == note_id).first()
    if not db_note:
        raise HTTPException(status_code=404, detail="Note not found")
    if db_note.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this note")
    db.delete(db_note)
    db.commit()
    return {"detail": "Note deleted"}

@router.get("/{note_id}/flashcards", response_model=list[FlashcardOut])
def list_flashcards_for_note(note_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_note = db.query(Note).filter(Note.id == note_id).first()
    if not db_note:
        raise HTTPException(status_code=404, detail="Note not found")
    if db_note.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to access flashcards for this note")
    flashcards = db.query(Flashcard).filter(Flashcard.note_id == note_id).all()
    return [FlashcardOut.model_validate(fc, from_attributes=True) for fc in flashcards]