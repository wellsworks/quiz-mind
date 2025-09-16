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

