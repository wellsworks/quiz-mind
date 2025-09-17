# flashcard.py model

from sqlalchemy import Column, Integer, String, ForeignKey, Text, Enum, DateTime
from app.db import Base
from sqlalchemy.orm import relationship
from datetime import datetime, timezone


class Flashcard(Base):
    __tablename__ = "flashcards"

    id = Column(Integer, primary_key=True, index=True)
    question = Column(Text, nullable=False)
    answer = Column(Text, nullable=False)
    source = Column(Enum('ai_generated', 'user_created', name='flashcard_source', nullable=False))
    note_id = Column(Integer, ForeignKey("notes.id"), nullable=False)
    created_at = Column(DateTime(timezone=True), nullable=False, default=lambda: datetime.now(timezone.utc))

    # Relationships
    note = relationship("Note", back_populates="flashcards")
    flashcard_progress = relationship("UserFlashcardProgress", back_populates="flashcard", cascade="all, delete-orphan")