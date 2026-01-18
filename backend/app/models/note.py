# note.py model

from sqlalchemy import Column, Integer, String, ForeignKey, Text, DateTime, func
from app.db import Base
from sqlalchemy.orm import relationship


class Note(Base):
    __tablename__ = "notes"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True, nullable=False)
    content = Column(Text, nullable=False)
    app_user_id = Column(Integer, ForeignKey("app_users.id"), nullable=False)
    created_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now())

    # Relationships
    app_user = relationship("AppUser", back_populates="notes")
    flashcards = relationship("Flashcard", back_populates="note", cascade="all, delete-orphan")
    ai_flashcard_jobs = relationship("AIFlashcardJob", back_populates="note", cascade="all, delete-orphan")