# note.py schema 

from pydantic import BaseModel
from datetime import datetime

class NoteBase(BaseModel):
    title: str
    content: str

class NoteCreate(NoteBase):
    pass

class NoteUpdate(NoteBase):
    pass

class NoteSummary(NoteBase):
    id: int
    flashcard_count: int

class NoteOut(NoteBase):
    id: int
    user_id: int
    created_at: datetime

    class Config:
        orm_mode = True