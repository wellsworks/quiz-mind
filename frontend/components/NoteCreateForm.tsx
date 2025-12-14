"use client";

import { useState } from 'react';
import { useCreateNote } from '@/lib/hooks/notes';
import Container from './Container';
import Input from './Input';
import Button from './Button';

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
        <Container>
            <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-xl">
                <Input
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

                <Button 
                    size="sm"
                    type="submit" 
                    className="px-4 py-2 rounded-xl bg-black text-white"
                    disabled={createNote.isLoading}
                >
                    Create Note
                </Button>
            </form>
        </Container>
    );
}