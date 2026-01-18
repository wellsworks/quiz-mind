# app/models/ai_flashcard_job.py
from sqlalchemy import Column, Integer, String, DateTime, Text, ForeignKey, func
from app.db import Base
from sqlalchemy.orm import relationship

class AIFlashcardJob(Base):
    __tablename__ = "ai_flashcard_jobs"

    id = Column(Integer, primary_key=True, index=True)
    note_id = Column(Integer, ForeignKey("notes.id", ondelete="CASCADE"), nullable=False, index=True)
    app_user_id = Column(Integer, ForeignKey("app_users.id", ondelete="CASCADE"), nullable=False, index=True)

    status = Column(String, nullable=False, default="pending")
    error_message = Column(Text, nullable=True)

    model_name = Column(String, nullable=True)
    requested_count = Column(Integer, nullable=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(
        DateTime(timezone=True), 
        server_default=func.now(),
        onupdate=func.now(),
    )

    # relationships
    app_user = relationship("AppUser", back_populates="ai_flashcard_jobs")
    note = relationship("Note", back_populates="ai_flashcard_jobs")
