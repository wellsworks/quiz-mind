# study_sessions.py model

from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from app.db import Base
from sqlalchemy.orm import relationship
from datetime import datetime, timezone

current_timestamp = datetime.now(timezone.utc)

class StudySession(Base):
    __tablename__ = "study_sessions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    note_id = Column(Integer, ForeignKey("notes.id"), nullable=True)
    started_at = Column(DateTime, nullable=False, default=current_timestamp)
    ended_at = Column(DateTime, nullable=True)

    # Relationships
    user = relationship("User", back_populates="study_sessions")