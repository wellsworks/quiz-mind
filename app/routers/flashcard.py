# routers/flashcard.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db import get_db
from app.schemas.flashcard import FlashcardCreate, FlashcardOut, FlashcardUpdate
from app.models.flashcard import Flashcard

router = APIRouter(prefix="/flashcards", tags=["flashcards"])

@router.post("/", response_model=FlashcardOut)
def create_flashcard(flashcard: FlashcardCreate, db: Session = Depends(get_db)):
    new_flashcard = Flashcard(**flashcard.model_dump())
    db.add(new_flashcard)
    db.commit()
    db.refresh(new_flashcard)
    return FlashcardOut.model_validate(new_flashcard, from_attributes=True)

@router.get("/{flashcard_id}", response_model=FlashcardOut)
def get_flashcard(flashcard_id: int, db: Session = Depends(get_db)):
    db_flashcard = db.query(Flashcard).filter(Flashcard.id == flashcard_id).first()
    if not db_flashcard:
        raise HTTPException(status_code=404, detail="Flashcard not found")
    return FlashcardOut.model_validate(db_flashcard, from_attributes=True)

@router.get("/", response_model=list[FlashcardOut])
def list_flashcards(db: Session = Depends(get_db)):
    flashcards = db.query(Flashcard).all()
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

