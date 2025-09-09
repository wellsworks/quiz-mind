# flashcard.py model

from sqlalchemy import Column, Integer, String, ForeignKey, Text, Enum
from app.db import Base
from sqlalchemy.orm import relationship
from datetime import datetime, timezone

current_timestamp = datetime.now(timezone.utc)

class Flashcard(Base):
    __tablename__ = "flashcards"

    id = Column(Integer, primary_key=True, index=True)
    question = Column(Text, nullable=False)
    answer = Column(Text, nullable=False)
    source = Enum('ai_generated', 'user_created', name='flashcard_source', nullable=False)
    note_id = Column(Integer, ForeignKey("notes.id"), nullable=False)
    created_at = Column(String, nullable=False, default=current_timestamp)

    # Relationships
    note = relationship("Note", back_populates="flashcards")