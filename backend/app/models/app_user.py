# app_user.py model

from sqlalchemy import Column, Integer, String, DateTime, func
from app.db import Base
from sqlalchemy.orm import relationship
from datetime import datetime, timezone


class AppUser(Base):
    __tablename__ = "app_users"

    id = Column(Integer, primary_key=True, index=True)
    auth_user_id = Column(String, unique=True, nullable=False)
    created_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now())

    # Relationships
    notes = relationship("Note", back_populates="app_user", cascade="all, delete-orphan")
    study_sessions = relationship("StudySession", back_populates="app_user", cascade="all, delete-orphan")
    flashcard_progress = relationship("UserFlashcardProgress", back_populates="app_user", cascade="all, delete-orphan")
    ai_flashcard_jobs = relationship("AIFlashcardJob", back_populates="app_user", cascade="all, delete-orphan")