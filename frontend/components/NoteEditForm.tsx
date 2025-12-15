"use client";

import React, { useState } from "react";
import { useUpdateNote, useDeleteNote } from "@/lib/hooks/notes";
import Container from "./Container";
import Input from "./Input";
import Button from "./Button";
import { redirect } from "next/navigation";

export default function NoteEditForm({ initialData }: { initialData?: { id: number; title: string; content: string }}) {
    const [id, setId] = useState(initialData ? String(initialData.id) : "");
    const [title, setTitle] = useState(initialData ? initialData.title : "");
    const [content, setContent] = useState(initialData ? initialData.content : "");

    const editNote = useUpdateNote();
    const deleteNote = useDeleteNote();

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (window.confirm("Are you sure you want to change this note?")) {
            editNote.mutate({id, payload: { title, content }});
            setId("");
            setTitle("");
            setContent("");
        }
    }
    
    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this note?")) {
            deleteNote.mutate(id);
            redirect("/notes");
        }
    };

    return (
        <Container>
            <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
                <Input
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

                <Button
                    size="sm"
                    className=""
                    type="submit"
                    disabled={editNote.isLoading}
                >
                    Edit Note
                </Button>

                {editNote.isError && (
                    <p className="text-red-500">{String(editNote.error)}</p>
                )}

                {editNote.isSuccess && <p className="text-green-600">Updated!</p>}

            </form>
            <Button
                    className=""
                    size="sm"
                    variant="destructive"
                    onClick={handleDelete}
                >
                    Delete Note
                </Button>

                {deleteNote.isError && (
                    <p className="text-red-500">{String(deleteNote.error)}</p>
                )}

                {deleteNote.isSuccess && <p className="text-green-600">Note Deleted!</p>}
        </Container>
    );
}