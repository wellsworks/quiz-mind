from sqlalchemy.orm import Session
from app.models.note import Note

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