from sqlalchemy.orm import Session
from app.models.note import Note
from app.models.flashcard import Flashcard
from sqlalchemy import func

def get_note(
        db: Session,
        note_id: int,
        user_id: int,
): 
    return (
        db.query(Note)
        .filter(Note.id == note_id)
        .filter(Note.user_id == user_id)
        .first()
    )

def get_notes_with_flashcard_counts(
        db: Session,
        user_id: int
): 
    return (
        db.query(
            Note.id,
            Note.title,
            Note.content,
            func.count(Flashcard.id).label("flashcard_count"),
        )
        .outerjoin(Flashcard, Flashcard.note_id == Note.id)
        .filter(Note.user_id == user_id)
        .group_by(Note.id)
        .order_by(Note.created_at.desc())
        .all()
    )