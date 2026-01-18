# app_user.py schema

from pydantic import BaseModel
from datetime import datetime

class AppUserBase(BaseModel):
    pass

class AppUserCreate(AppUserBase):
    auth_user_id: str

class AppUserOut(AppUserBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True