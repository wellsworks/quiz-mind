# tests/test_schemas.py

import pytest
from pydantic import ValidationError
import datetime
from app.schemas.user import UserCreate, UserOut
from app.schemas.note import NoteCreate, NoteOut

def test_user_create_schema_valid():
    valid_data = {
        "email": "test@example.com",
        "password": "securepassword",
        "created_at": datetime.datetime.now().isoformat()}
    user = UserCreate(**valid_data)
    assert user.email == valid_data["email"]
    assert user.password == valid_data["password"]
    assert user.created_at.isoformat() == valid_data["created_at"]

def test_user_create_schema_invalid():
    invalid_data = {
        "email": "not-an-email",
        "password": "short",
        "created_at": "invalid-date"}
    with pytest.raises(ValidationError):
        UserCreate(**invalid_data)

def test_user_out_schema():
    data = {
        "id": 1,
        "email": "test@example.com",
        "password": "securepassword",
        "created_at": datetime.datetime.now().isoformat()}
    user_out = UserOut(**data)
    assert user_out.id == data["id"]
    assert user_out.email == data["email"]
    assert user_out.password == data["password"]
    assert user_out.created_at.isoformat() == data["created_at"]
    
def test_note_create_schema_valid():
    valid_data = {
        "title": "Sample Note",
        "content": "This is a sample note.",
        "created_at": datetime.datetime.now().isoformat(),
        "user_id": 1}
    note = NoteCreate(**valid_data)
    assert note.title == valid_data["title"]
    assert note.content == valid_data["content"]
    assert note.created_at.isoformat() == valid_data["created_at"]
    assert note.user_id == valid_data["user_id"]

def test_note_create_schema_invalid():
    invalid_data = {
        "title": "",
        "content": "",
        "created_at": "invalid-date",
        "user_id": "a string"}
    with pytest.raises(ValidationError):
        NoteCreate(**invalid_data)

def test_note_out_schema():
    data = {
        "id": 1,
        "title": "Sample Note",
        "content": "This is a sample note.",
        "created_at": datetime.datetime.now().isoformat()}
    note_out = NoteOut(**data)
    assert note_out.id == data["id"]
    assert note_out.title == data["title"]
    assert note_out.content == data["content"]
    assert note_out.created_at.isoformat() == data["created_at"]

