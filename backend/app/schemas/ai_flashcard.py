from pydantic import BaseModel

class FlashcardAI(BaseModel):
    question: str
    answer: str

class FlashcardAIList(BaseModel):
    flashcards: list[FlashcardAI]