# study_sessions.py schema

from pydantic import BaseModel
from datetime import datetime
from enum import Enum

class StudyMode(str, Enum):
    flashcards = "flashcards"
    quiz = "quiz"

class StudyScope(str, Enum):
    all = "all"
    note = "note"

class StudySessionBase(BaseModel):
    pass

class StudySessionCreate(StudySessionBase):
    mode: StudyMode
    scope: StudyScope
    note_id: int | None = None

class StudySessionUpdate(StudySessionBase):
    ended_at: datetime | None = None 

class StudySessionOut(StudySessionBase):
    id: int
    user_id: int
    mode: StudyMode
    scope: StudyScope
    note_id: int | None = None
    started_at: datetime
    ended_at: datetime | None = None

    class Config:
        orm_mode = True