# study_sessions.py model

from sqlalchemy import Column, Integer, Enum, ForeignKey, DateTime, func
from app.db import Base
from sqlalchemy.orm import relationship
from datetime import datetime, timezone

class StudySession(Base):
    __tablename__ = "study_sessions"

    id = Column(Integer, primary_key=True, index=True)
    app_user_id = Column(Integer, ForeignKey("app_users.id"), nullable=False)
    note_id = Column(Integer, ForeignKey("notes.id"), nullable=True)

    mode = Column(Enum('flashcards', 'quiz', name='study_mode'), nullable=False, default='flashcards')
    scope = Column(Enum('all', 'note', name='study_scope'), nullable=False, default='all')

    started_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now())
    ended_at = Column(DateTime(timezone=True), nullable=True)

    # Relationships
    app_user = relationship("AppUser", back_populates="study_sessions")
    study_session_notes = relationship("StudySessionNote", cascade="all, delete-orphan")