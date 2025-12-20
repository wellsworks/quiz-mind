from openai import OpenAI
from app.schemas.ai_flashcard import FlashcardAIList
from pydantic import ValidationError 
import os
from pathlib import Path
import time
from app.ai.flashcards.preprocessing import preprocess_note, chunk_text

PROMPT_PATH="prompts/basic.md"
MAX_RETRIES = 2
local_dir = Path(__file__).parent.resolve()
full_path = local_dir / PROMPT_PATH

def load_prompt_from_file(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        return f.read()

flashcard_prompt = load_prompt_from_file(full_path)

client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))


def generate_flashcards_llm(note_text: str) -> FlashcardAIList:
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "system",
                "content": "You generate study flashcards in JSON."
            },
            {
                "role": "user",
                "content": flashcard_prompt.replace(
                    "{{NOTE_TEXT}}", note_text
                )
            }
        ],
        temperature=0.3,
        response_format={"type": "json_object"},
    )

    content = response.choices[0].message.content
    parsed = FlashcardAIList.model_validate_json(content)
    return parsed.flashcards

# wrapper for retrying generation
def generate_flashcards_with_retry(note_text: str):
    last_error = None

    for attempt in range(MAX_RETRIES + 1):
        try:
            return generate_flashcards_llm(note_text)
        except ValidationError as e:
            last_error = e
        except Exception as e:
            last_error = e
        time.sleep(1)

    raise RuntimeError(
        f"Flashcard generation faield after retries: {last_error}"
    )


def generate_flashcards_from_chunks(chunks: list[str]) -> FlashcardAIList:
    all_flashcards = []

    for chunk in chunks:
        result = generate_flashcards_with_retry(chunk)
        all_flashcards.extend(result)

    return all_flashcards

def deduplicate_flashcards(flashcards):
    seen = set()
    unique = []

    for card in flashcards:
        key = card.question.lower().strip()
        if key not in seen:
            seen.add(key)
            unique.append(card)

    return unique

def limit_flashcards(flashcards, max_count=10):
    return flashcards[:max_count]

# final pipeline
def generate_flashcards_pipeline(note_text: str):
    processed = preprocess_note(note_text)
    chunks = chunk_text(processed)

    flashcards = generate_flashcards_from_chunks(chunks)
    flashcards = deduplicate_flashcards(flashcards)
    flashcards = limit_flashcards(flashcards)

    return flashcards