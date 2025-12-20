from sqlalchemy.orm import Session
from app.models.flashcard import Flashcard
from app.schemas.flashcard import FlashcardCreate

def create_flashcard(
        db: Session, 
        *,
        data: FlashcardCreate,
):
    flashcard = Flashcard(
        **data.model_dump(),
    )
    db.add(flashcard)
    db.commit()
    db.refresh(flashcard)
    return flashcard