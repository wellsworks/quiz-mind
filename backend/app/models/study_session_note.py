from sqlalchemy import Column, Integer, Enum, ForeignKey, DateTime
from app.db import Base
from sqlalchemy.orm import relationship

class StudySessionNote(Base):
    __tablename__ = "study_session_notes"

    id = Column(Integer, primary_key=True)
    session_id = Column(Integer, ForeignKey("study_sessions.id"))
    note_id = Column(Integer, ForeignKey("notes.id"))

    study_session = relationship("StudySession", back_populates="study_session_notes")