import { useState } from 'react';

interface NoteCreateFormProps {
    onCreate: (data: { title: string; content: string }) => void;
}

export function NoteCreateForm({ onCreate }: NoteCreateFormProps) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onCreate({ title, content });
        setTitle("");
        setContent("");
    };

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
                placeholder="Content"
                className="w-full p-2 border rounded-lg"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <button type="submit" className="px-4 py-2 rounded-xl bg-black text-white">
                Create Note
            </button>
        </form>
    );
}