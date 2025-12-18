import re

MAX_CHARS = 8_000
CHUNK_SIZE = 2_000

def normalize_text(text: str) -> str:
    # normalize note text before LLM input
    if not text:
        return ""

    text = text.strip()
    text = text.replace("\r\n", "\n")
    text = re.sub(r"\n{3,}", "\n\n", text)
    text = re.sub(r"[ \t]{2,}", " ", text)

    return text

def limit_length(text: str, max_chars: int = MAX_CHARS) -> str:
    if len(text) <= max_chars:
        return text
    
    return text[:max_chars]

def chunk_text(text: str, chunk_size: int = CHUNK_SIZE) -> list[str]:
    chunks = []
    start = 0

    while start < len(text):
        end = start + chunk_size
        chunks.append(text[start:end])
        start = end
    
    return chunks

def preprocess_note(text: str) -> str:
    text = normalize_text(text)
    text = limit_length(text)
    return text