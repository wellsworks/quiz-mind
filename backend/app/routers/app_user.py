# routers/user.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db import get_db
from app.schemas.app_user import AppUserCreate, AppUserOut
from app.models.app_user import AppUser
from app.deps import get_current_app_user

router = APIRouter(prefix="/users", tags=["users"])

@router.get("/me", response_model=AppUserOut)
def read_current_user(current_app_user: AppUser = Depends(get_current_app_user)):
    return AppUserOut.model_validate(current_app_user, from_attributes=True)

@router.get("/{user_id}", response_model=AppUserOut)
def get_user(app_user_id: int, db: Session = Depends(get_db)):
    db_user = db.query(AppUser).filter(AppUser.id == app_user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    return AppUserOut.model_validate(db_user, from_attributes=True)
    
@router.get("/", response_model=list[AppUserOut])
def list_users(db: Session = Depends(get_db)):
    app_users = db.query(AppUser).all()
    return [AppUserOut.model_validate(app_user, from_attributes=True) for app_user in app_users]

@router.put("/{user_id}", response_model=AppUserOut)
def update_user(app_user_id: int, app_user: AppUserCreate, db: Session = Depends(get_db)):
    db_user = db.query(AppUser).filter(AppUser.id == app_user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    db_user.auth_user_id = app_user.auth_user_id
    db.commit()
    db.refresh(db_user)
    return AppUserOut.model_validate(db_user, from_attributes=True)

@router.patch("/{user_id}", response_model=AppUserOut)
def partial_update_user(app_user_id: int, app_user: AppUserCreate, db: Session = Depends(get_db)):
    db_user = db.query(AppUser).filter(AppUser.id == app_user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    if app_user.auth_user_id:
        db_user.auth_user_id = app_user.auth_user_id
    db.commit()
    db.refresh(db_user)
    return AppUserOut.model_validate(db_user, from_attributes=True)

@router.delete("/{user_id}", response_model=dict)
def delete_user(app_user_id: int, db: Session = Depends(get_db)):
    db_user = db.query(AppUser).filter(AppUser.id == app_user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    db.delete(db_user)
    db.commit()
    return {"detail": "User deleted"}
