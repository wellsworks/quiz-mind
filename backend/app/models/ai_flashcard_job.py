# app/models/ai_flashcard_job.py
from sqlalchemy import Column, Integer, String, DateTime, Text, ForeignKey
from app.db import Base
from sqlalchemy.orm import relationship
from datetime import datetime, timezone

class AIFlashcardJob(Base):
    __tablename__ = "ai_flashcard_jobs"

    id = Column(Integer, primary_key=True, index=True)
    note_id = Column(Integer, ForeignKey("notes.id", ondelete="CASCADE"), nullable=False, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)

    status = Column(String, nullable=False, default="pending")
    error_message = Column(Text, nullable=True)

    model_name = Column(String, nullable=True)
    requested_count = Column(Integer, nullable=True)

    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(
        DateTime(timezone=True), 
        default=lambda: datetime.now(timezone.utc), 
        onupdate=lambda: datetime.now(timezone.utc),
    )

    # relationships
    user = relationship("User", back_populates="ai_flashcard_jobs")
    note = relationship("Note", back_populates="ai_flashcard_jobs")
