# app/main.py

from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from app.db import get_db
from sqlalchemy import text
from app.routers import user, note, flashcard, study_sessions, auth
import logging
import os
from fastapi.middleware.cors import CORSMiddleware

logging.basicConfig(level=logging.DEBUG)

app = FastAPI()

# Get origins from environment variable, split by comma, and strip whitespace
# Default to an empty list if the environement variable isn't set
allowed_origins_str = os.getenv("ALLOWED_CORS_ORIGINS", "")
origins = [origin.strip() for origin in allowed_origins_str.split(',') if origin.strip()]

# add middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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

