# user.py model

from sqlalchemy import Column, Integer, String
from app.db import Base
from sqlalchemy.orm import relationship
from datetime import datetime, timezone

current_timestamp = datetime.now(timezone.utc)

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    created_at = Column(String, nullable=False, default=current_timestamp)

    # Relationships
    notes = relationship("Note", back_populates="user", cascade="all, delete-orphan")
    study_sessions = relationship("StudySession", back_populates="user", cascade="all, delete-orphan")
    flashcard_progress = relationship("UserFlashcardProgress", back_populates="user", cascade="all, delete-orphan")
