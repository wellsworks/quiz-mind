from app.ai.flashcards.preprocessing import preprocess_note

def test_preprocess_removes_extra_whitespace():
    raw = "Hello\n\n\n\nMy Name is          Slim Shady"
    processed = preprocess_note(raw)
    assert processed == "Hello\n\nMy Name is Slim Shady"

def test_preprocess_limit_length():
    raw = "a" * 9000
    processed = preprocess_note(raw)
    assert len(processed) == 8000
