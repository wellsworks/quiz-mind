# app/deps.py

from fastapi import Depends, HTTPException, status, Request
from sqlalchemy.orm import Session
from app.db import get_db
from app.models import AppUser
import os
import httpx
from dotenv import load_dotenv

load_dotenv()

BETTER_AUTH_URL = os.getenv("BETTER_AUTH_URL")

async def get_session_from_better_auth(request: Request):
    cookies = request.cookies
    if not cookies:
        print("no cookies")
    
    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"{BETTER_AUTH_URL}/get-session",
            cookies=cookies,
            timeout=5.0,
        )
    
    if response.status_code != 200:
        return None
    
    return response.json()

async def get_current_user(request: Request):
    session = await get_session_from_better_auth(request)

    if not session: 
        print("SESSION FAIL")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
        )
    
    user = session.get("user")
    if not user:
        print("USER FAIL")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid session",
        )
    
    return user
    
    
def ensure_app_user(db: Session, auth_user: dict) -> AppUser:
    auth_user_id = auth_user["id"]

    app_user = (
        db.query(AppUser)
        .filter(AppUser.auth_user_id == auth_user_id)
        .first()
    )

    if app_user:
        return app_user
    
    app_user = AppUser(auth_user_id=auth_user_id)
    db.add(app_user)
    db.commit()
    db.refresh(app_user)
    return app_user

async def get_current_app_user(request: Request, db: Session = Depends(get_db)):
    auth_user = await get_current_user(request)
    app_user = ensure_app_user(db, auth_user)
    return app_user

