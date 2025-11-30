# app/deps.py

from fastapi import Depends, HTTPException, status, Cookie
from sqlalchemy.orm import Session
from jose import JWTError, jwt
from app.db import get_db
from app.models import User
from app.util.security import SECRET_KEY, ALGORITHM
from app.schemas.auth import TokenData
import os


def get_current_user(
        db: Session = Depends(get_db),
        token: str = Cookie(None, alias="access_token")
):

    if token is None: 
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated"
        )

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        sub: str | None = payload.get("sub")
        if sub is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token"
            )
        token_data = TokenData(sub=sub)
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token"
        )
    
    user = db.query(User).filter(User.id == token_data.sub).first()
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found"
        )
    return user