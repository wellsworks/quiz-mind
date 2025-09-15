# note.py schema 

from pydantic import BaseModel
from datetime import datetime

class NoteBase(BaseModel):
    title: str
    content: str
    created_at: datetime

class NoteCreate(NoteBase):
    user_id: int

class NoteUpdate(NoteBase):
    pass

class NoteOut(NoteBase):
    id: int

    class Config:
        orm_mode = True