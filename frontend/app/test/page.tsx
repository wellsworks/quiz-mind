'use client';

import { getNotes, createNote, getFlashcards } from "@/lib/api";
import React, { useState } from "react";

export default function TestPage() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState("");

    async function test() {
        const token = prompt("Enter token:");
        const flashcards = await getFlashcards(token!);
        console.log(flashcards);
    }
    async function handleCreateNote(e: React.FormEvent) {
        e.preventDefault();
        setError("");

        const token = prompt("Enter token:");
        const result = await createNote({ title, content }, token!);
        console.log(result);
    }

    return (
        <form onSubmit={handleCreateNote} className="flex flex-col gap-4 w-80">
            <h2 className="text-2xl font-bold mb-2">Create A Note</h2>

            <input
                className="border rounded p-2"
                placeholder="Note Title"
                value={title}
                onChange={e => setTitle(e.target.value)}
            />

            <input
                className="border rounded p-2"
                placeholder="Content"
                value={content}
                onChange={e => setContent(e.target.value)}
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button className="bg-blue-600 text-white rounded p-2" type="submit">
                Create Note
            </button>
            <button onClick={test}>
                Test getFlashcards
            </button>
        </form>
    );
}
