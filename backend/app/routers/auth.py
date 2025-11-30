# routers/auth.py

from fastapi import APIRouter, Depends, HTTPException, status, Response
from sqlalchemy.orm import Session
from app.db import get_db
from app.models.user import User
from app.schemas.user import UserCreate, UserOut
from app.schemas import auth as auth_schemas
from app.util import security
from datetime import timedelta

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/register", response_model=UserOut)
def register(user_create: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == user_create.email).first()
    if existing_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")
    hashed_password = security.get_password_hash(user_create.password)
    new_user = User(email=user_create.email, password_hash=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return UserOut.model_validate(new_user, from_attributes=True)

@router.post("/login", response_model=auth_schemas.LoginSuccess)
def login(data: UserCreate, response: Response, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()
    if not user or not security.verify_password(data.password, user.password_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect email or password")
    access_token_expires = timedelta(minutes=security.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = security.create_access_token(subject=str(user.id), expires_delta=access_token_expires)
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        secure=True,
        samesite="lax",
        max_age=security.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        expires=security.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        path="/"
    )

    return {"success": True}

@router.post("/logout")
def logout(response: Response):
    response.delete_cookie("access_token", path="/")
    return {"success": True}
