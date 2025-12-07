"use client";

import { useState } from "react";
import { useCreateFlashcard } from "@/lib/hooks/flashcards";


export function FlashcardCreateForm() {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [noteId, setNoteId] = useState("");
    const source = "user_created";
    const createFlashcard = useCreateFlashcard();


    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        createFlashcard.mutate({ 
            question, 
            answer, 
            note_id: Number(noteId), 
            source,
        },
        {
            onSuccess: () => {
                setQuestion("");
                setAnswer("");
                setNoteId("");
            },
        });
    };


    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-xl">
            <input
                className="border p-2 w-full rounded-lg"
                placeholder="Note ID"
                value={noteId}
                onChange={(e) => setNoteId(e.target.value)}
            />
            <input
                type="text"
                placeholder="Question"
                className="w-full p-2 border rounded-lg"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
            />
            <input
                type="text"
                placeholder="Answer"
                className="w-full p-2 border rounded-lg"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
            />
            <button type="submit" className="px-4 py-2 rounded-xl bg-black text-white">
                Create Flashcard
            </button>
        </form>
    );
}