# note.py model

from sqlalchemy import Column, Integer, String, ForeignKey, Text
from app.db import Base
from sqlalchemy.orm import relationship
from datetime import datetime, timezone

current_timestamp = datetime.now(timezone.utc)

class Note(Base):
    __tablename__ = "notes"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True, nullable=False)
    content = Column(Text, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    created_at = Column(String, nullable=False, default=current_timestamp)

    # Relationships
    user = relationship("User", back_populates="notes")
    flashcards = relationship("Flashcard", back_populates="note", cascade="all, delete-orphan")