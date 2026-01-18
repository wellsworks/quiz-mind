# user_flashcard_progress.py model

from sqlalchemy import Column, Integer, ForeignKey, DateTime, Enum
from app.db import Base
from sqlalchemy.orm import relationship
from datetime import datetime, timezone


class UserFlashcardProgress(Base):
    __tablename__ = "user_flashcard_progress"

    id = Column(Integer, primary_key=True, index=True)
    app_user_id = Column(Integer, ForeignKey("app_users.id"), nullable=False)
    flashcard_id = Column(Integer, ForeignKey("flashcards.id"), nullable=False)
    status = Column(Enum('unseen', 'learning', 'reviewing', 'mastered', name='flashcard_status'), nullable=False, default='unseen')
    last_reviewed_at = Column(DateTime, nullable=True)
    repetition_count = Column(Integer, nullable=True, default=0)

    # Relationships
    app_user = relationship("AppUser", back_populates="flashcard_progress")
    flashcard = relationship("Flashcard", back_populates="flashcard_progress")