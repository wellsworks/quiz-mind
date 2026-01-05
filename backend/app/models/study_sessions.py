# study_sessions.py model

from sqlalchemy import Column, Integer, Enum, ForeignKey, DateTime, func
from app.db import Base
from sqlalchemy.orm import relationship
from datetime import datetime, timezone

class StudySession(Base):
    __tablename__ = "study_sessions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    note_id = Column(Integer, ForeignKey("notes.id"), nullable=True)

    mode = Column(Enum('flashcards', 'quiz', name='study_mode'), nullable=False, default='flashcards')
    scope = Column(Enum('all', 'note', name='study_scope'), nullable=False, default='all')

    started_at = Column(DateTime, nullable=False, default=func.now())
    ended_at = Column(DateTime, nullable=True)

    # Relationships
    user = relationship("User", back_populates="study_sessions")