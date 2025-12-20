# Role
You are given study notes.

# Task
Generate flashcards that test understanding of key concepts, defintions, and relationships.

# Guidelines
- Prefer "why" or "what is" questions where appropriate.
- Avoid trivial or overly obvious questions.
- Keep answers under 2 sentences.
- Use precise language.

# Output Format
Return valid JSON in the following format:
{
    "flashcards": [
        { "question": string, "answer": string }
    ]
}

# Notes
{{NOTE_TEXT}}