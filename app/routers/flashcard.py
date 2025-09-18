# routers/flashcard.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db import get_db
from app.schemas.flashcard import FlashcardCreate, FlashcardOut, FlashcardUpdate
from app.models.flashcard import Flashcard
from app.models.user import User
from app.models.note import Note
from app.deps import get_current_user

router = APIRouter(prefix="/flashcards", tags=["flashcards"])

@router.post("/", response_model=FlashcardOut)
def create_flashcard(flashcard: FlashcardCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    # Ensure the flashcard's note exists and belongs to the current user
    db_note = db.query(Note).filter(Note.id == flashcard.note_id).first()
    if not db_note:
        raise HTTPException(status_code=404, detail="Associated note not found")
    if db_note.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to add flashcard to this note")
    new_flashcard = Flashcard(**flashcard.model_dump())
    db.add(new_flashcard)
    db.commit()
    db.refresh(new_flashcard)
    return FlashcardOut.model_validate(new_flashcard, from_attributes=True)

@router.get("/{flashcard_id}", response_model=FlashcardOut)
def get_flashcard(flashcard_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_flashcard = db.query(Flashcard).filter(Flashcard.id == flashcard_id).first()
    if not db_flashcard:
        raise HTTPException(status_code=404, detail="Flashcard not found")
    # Ensure the flashcard belongs to a note owned by the current user
    if db_flashcard.note.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to access this flashcard")
    return FlashcardOut.model_validate(db_flashcard, from_attributes=True)

@router.get("/", response_model=list[FlashcardOut])
def list_flashcards(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    flashcards = db.query(Flashcard).join(Note).filter(Note.user_id == current_user.id).all()
    return [FlashcardOut.model_validate(fc, from_attributes=True) for fc in flashcards]

@router.put("/{flashcard_id}", response_model=FlashcardOut)
def update_flashcard(flashcard_id: int, flashcard: FlashcardUpdate, db: Session = Depends(get_db)):
    db_flashcard = db.query(Flashcard).filter(Flashcard.id == flashcard_id).first()
    if not db_flashcard:
        raise HTTPException(status_code=404, detail="Flashcard not found")
    for key, value in flashcard.model_dump().items():
        setattr(db_flashcard, key, value)
    db.commit()
    db.refresh(db_flashcard)
    return FlashcardOut.model_validate(db_flashcard, from_attributes=True)

@router.patch("/{flashcard_id}", response_model=FlashcardOut)
def partial_update_flashcard(flashcard_id: int, flashcard: FlashcardUpdate, db: Session = Depends(get_db)):
    db_flashcard = db.query(Flashcard).filter(Flashcard.id == flashcard_id).first()
    if not db_flashcard:
        raise HTTPException(status_code=404, detail="Flashcard not found")
    flashcard_data = flashcard.model_dump(exclude_unset=True)
    for key, value in flashcard_data.items():
        setattr(db_flashcard, key, value)
    db.commit()
    db.refresh(db_flashcard)
    return FlashcardOut.model_validate(db_flashcard, from_attributes=True)

@router.delete("/{flashcard_id}", response_model=dict)
def delete_flashcard(flashcard_id: int, db: Session = Depends(get_db)):
    db_flashcard = db.query(Flashcard).filter(Flashcard.id == flashcard_id).first()
    if not db_flashcard:
        raise HTTPException(status_code=404, detail="Flashcard not found")
    db.delete(db_flashcard)
    db.commit()
    return {"detail": "Flashcard deleted"}

