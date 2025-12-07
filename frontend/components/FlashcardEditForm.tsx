"use client";

import { useState } from "react";
import { useUpdateFlashcard } from "@/lib/hooks/flashcards";

export default function FlashcardEditForm() {
    const [id, setId] = useState("");
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [noteId, setNoteId] = useState("");
    const source = "user_created"

    const editFlashcard = useUpdateFlashcard();

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        editFlashcard.mutate({id, payload: { answer, question, note_id: Number(noteId), source }});
        setId("");
        setQuestion("");
        setAnswer("");
        setNoteId("");
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
            <input
                className="border p-2 w-full rounded"
                placeholder="Flashcard ID"
                value={id}
                onChange={(e) => setId(e.target.value)}
            />

            <input
                className="border p-2 w-full rounded"
                placeholder="Note ID"
                value={noteId}
                onChange={(e) => setNoteId(e.target.value)}
            />

            <input
                className="border p-2 w-full rounded"
                placeholder="Question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
            />

            <textarea
                className="border p-2 w-full rounded"
                placeholder="Answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
            />

            <button
                className="bg-blue-600 text-white p-2 rounded"
                type="submit"
                disabled={editFlashcard.isLoading}
            >
                Edit Flashcard
            </button>

            {editFlashcard.isError && (
                <p className="text-red-500">{String(editFlashcard.error)}</p>
            )}

            {editFlashcard.isSuccess && <p className="text-green-600">Updated!</p>}
        </form>
    );
}