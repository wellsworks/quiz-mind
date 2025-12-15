"use client";

import { useState } from "react";
import { useUpdateFlashcard, useDeleteFlashcard } from "@/lib/hooks/flashcards";
import Container from "./Container";
import Button from "./Button";
import Input from "./Input";
import { redirect } from "next/navigation";


export default function FlashcardEditForm({ flashcardId, initialData }: { flashcardId: number; initialData?: { question: string; answer: string; note_id: number; source: string } }) {
    const [id, setId] = useState(initialData ? String(flashcardId) : "");
    const [question, setQuestion] = useState(initialData ? initialData.question : "");
    const [answer, setAnswer] = useState(initialData ? initialData.answer : "");
    const [note_id, setNoteId] = useState(initialData ? (initialData.note_id) : "");
    const source = "user_created"

    const editFlashcard = useUpdateFlashcard();
    const deleteFlashcard = useDeleteFlashcard();

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (window.confirm("Are you sure you want to change this flashcard?")) {
            editFlashcard.mutate({id, payload: { answer, question, note_id: Number(note_id), source }});
            setId("");
            setQuestion("");
            setAnswer("");
            setNoteId("");
        }
    }

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this flashcard?")) {
            deleteFlashcard.mutate(id);
            redirect(`/notes/${note_id}/flashcards`);
        }
    };

    return (
        <Container>
            <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
                <Input
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

                <Button 
                    size="sm" 
                    variant="default" 
                    className=""
                    type="submit"
                    disabled={editFlashcard.isLoading}
                >
                    Edit Flashcard
                </Button>

                {editFlashcard.isError && (
                    <p className="text-red-500">{String(editFlashcard.error)}</p>
                )}

                {editFlashcard.isSuccess && <p className="text-green-600">Updated!</p>}

            </form>
            <Button
                    size="sm"
                    variant="destructive"
                    className=""
                    onClick={handleDelete}
                >
                    Delete Flashcard
                </Button>

                {deleteFlashcard.isError && (
                    <p className="text-red-500">{String(deleteFlashcard.error)}</p>
                )}

                {deleteFlashcard.isSuccess && <p className="text-green-600">Flashcard Deleted!</p>}
        </Container>
    );
}