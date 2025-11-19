# flashcard.py schema

from pydantic import BaseModel
from datetime import datetime
from enum import Enum

class FlashcardSource(str, Enum):
    user_created = 'user_created'
    ai_generated = 'ai_generated'

class FlashcardBase(BaseModel):
    question: str
    answer: str
    source: FlashcardSource
    note_id: int

class FlashcardCreate(FlashcardBase):
    pass

class FlashcardUpdate(FlashcardBase):
    pass    

class FlashcardOut(FlashcardBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True