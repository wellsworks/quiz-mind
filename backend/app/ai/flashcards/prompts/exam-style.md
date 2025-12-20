# Role
You are given study notes.

# Task
Generate exam-style flashcards from the notes below.

# Rules
- Questions should resemble exam prompts.
- Answers should be exact and unambiguous.
- No filler text.

# Output Format
Return valid JSON in the following format:
{
    "flashcards": [
        { "question": string, "answer": string }
    ]
}

# Notes
{{NOTE_TEXT}}