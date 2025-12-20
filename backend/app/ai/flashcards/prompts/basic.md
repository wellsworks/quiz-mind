# Role
You are given study notes.

# Task
Generate 5 to 10 flashcards that test factual recall and basic understanding.

# Rules
- Each flashcard must have a clear question and a concise answer.
- Do not include explanations, commentary, or metadata.
- Do not repeat the same idea in multiple flashcards.
- Use the information strictly from the notes.

# Output Format
Return valid JSON in the following format:
{
    "flashcards": [
        { "question": string, "answer": string }
    ]
}

# Notes
{{NOTE_TEXT}}