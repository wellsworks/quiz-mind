# app/main.py

from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from app.db import get_db
from sqlalchemy import text
from app.routers import user, note, flashcard, study_sessions, auth
import logging

logging.basicConfig(level=logging.DEBUG)

app = FastAPI()

# Include routers
app.include_router(user.router)
app.include_router(note.router)
app.include_router(flashcard.router)
app.include_router(study_sessions.router)
app.include_router(auth.router)

@app.get("/")
def health_check(db: Session = Depends(get_db)):
    result = db.execute(text("SELECT 1")).scalar()
    return {"db_ok": result == 1}

