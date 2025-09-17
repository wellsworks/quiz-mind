# app/schemas/auth.py

from pydantic import BaseModel
from typing import Optional

class Token(BaseModel):
    access_token: str
    token_type: str 

class TokenData(BaseModel):
    sub: Optional[str] = None # user id as string (subject)