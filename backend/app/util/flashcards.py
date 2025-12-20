from sqlalchemy.orm import Session
from app.models.flashcard import Flashcard
from app.schemas.flashcard import FlashcardOut

def create_flashcard(
        db: Session, 
        *,
        user_id: int,
        note_id: int,
        question: str,
        answer: str,
):
    flashcard = Flashcard(
        user_id=user_id,
        note_id=note_id,
        question=question,
        answer=answer,
    )
    db.add(flashcard)
    db.commit()
    db.refresh(flashcard)
    return flashcard