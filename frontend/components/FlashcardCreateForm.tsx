"use client";

import { useState } from "react";
import { useCreateFlashcard } from "@/lib/hooks/flashcards";
import Container from "./Container";
import Button from "./Button";
import Input from "./Input";


export function FlashcardCreateForm({ note_id }: { note_id?: number }) {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [noteId, setNoteId] = useState(note_id ? (note_id) : "");
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
        <Container>
            <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-xl">
                <Input
                    type="text"
                    placeholder="Question"
                    className="w-full p-2 border rounded-lg"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                />
                <Input
                    type="text"
                    placeholder="Answer"
                    className="w-full p-2 border rounded-lg"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                />
                <Button 
                    size="sm"
                    type="submit" 
                    className="">
                    Create Flashcard
                </Button>
            </form>
        </Container>
    );
}