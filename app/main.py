# app/main.py

from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from app.db import SessionLocal
from sqlalchemy import text

app = FastAPI()

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def health_check(db: Session = Depends(get_db)):
    result = db.execute(text("SELECT 1")).scalar()
    return {"db_ok": result == 1}

