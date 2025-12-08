"use client";

import React, { useState } from "react";
import { useUpdateNote } from "@/lib/hooks/notes";

export default function NoteEditForm({ initialData }: { initialData?: { id: number; title: string; content: string }}) {
    const [id, setId] = useState(initialData ? String(initialData.id) : "");
    const [title, setTitle] = useState(initialData ? initialData.title : "");
    const [content, setContent] = useState(initialData ? initialData.content : "");

    const editNote = useUpdateNote();

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        editNote.mutate({id, payload: { title, content }});
        setId("");
        setTitle("");
        setContent("");
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
            <input
                className="border p-2 w-full rounded"
                placeholder="Note title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
                className="border p-2 w-full rounded"
                placeholder="Note content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />

            <button
                className="bg-blue-600 text-white p-2 rounded"
                type="submit"
                disabled={editNote.isLoading}
            >
                Edit Note
            </button>

            {editNote.isError && (
                <p className="text-red-500">{String(editNote.error)}</p>
            )}

            {editNote.isSuccess && <p className="text-green-600">Updated!</p>}
        </form>
    );
}