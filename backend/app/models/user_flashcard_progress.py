# user_flashcard_progress.py model

from sqlalchemy import Column, Integer, ForeignKey, DateTime, Enum
from app.db import Base
from sqlalchemy.orm import relationship
from datetime import datetime, timezone

current_timestamp = datetime.now(timezone.utc)

class UserFlashcardProgress(Base):
    __tablename__ = "user_flashcard_progress"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    flashcard_id = Column(Integer, ForeignKey("flashcards.id"), nullable=False)
    status = Column(Enum('unseen', 'learning', 'reviewing', 'mastered', name='flashcard_status', nullable=False, default='unseen'))
    last_reviewed_at = Column(DateTime, nullable=True)
    repetition_count = Column(Integer, nullable=True, default=0)

    # Relationships
    user = relationship("User", back_populates="flashcard_progress")
    flashcard = relationship("Flashcard", back_populates="flashcard_progress")