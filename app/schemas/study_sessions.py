# study_sessions.py schema

from pydantic import BaseModel
from datetime import datetime

class StudySessionBase(BaseModel):
    started_at: datetime
    ended_at: datetime | None = None
    user_id: int

class StudySessionCreate(StudySessionBase):
    pass

class StudySessionUpdate(StudySessionBase):
    pass

class StudySessionOut(StudySessionBase):
    id: int
    note_id: int | None = None

    class Config:
        orm_mode = True