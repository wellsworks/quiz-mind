# user_flashcard_progress.py schema

from pydantic import BaseModel
from datetime import datetime
from enum import Enum

class FlashcardStatus(str, Enum):
    unseen  = "unseen"
    learning = "learning"
    reviewing = "reviewing"
    mastered = "mastered"

class UserFlashcardProgressBase(BaseModel):
    status: FlashcardStatus = FlashcardStatus.unseen
    last_reviewed_at: datetime | None = None
    repetition_count: int = 0

class UserFlashcardProgressCreate(UserFlashcardProgressBase):
    user_id: int
    flashcard_id: int

class UserFlashcardProgressUpdate(UserFlashcardProgressBase):
    pass

class UserFlashcardProgressOut(UserFlashcardProgressBase):
    id: int
    user_id: int
    flashcard_id: int

    class Config:
        orm_mode = True