"use client";

import { useState } from 'react';
import { useCreateNote } from '@/lib/hooks/notes';

export default function NoteCreateForm() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const createNote = useCreateNote();

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        createNote.mutate({ title, content }, {
            onSuccess: () => {
                setTitle("");
                setContent("");
            }
        });
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-xl">
            <input
                type="text"
                placeholder="Title"
                className="w-full p-2 border rounded-lg"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
                placeholder="Note content"
                className="w-full p-2 border rounded-lg"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />

            <button 
                type="submit" 
                className="px-4 py-2 rounded-xl bg-black text-white"
                disabled={createNote.isLoading}
            >
                Create Note
            </button>
        </form>
    );
}