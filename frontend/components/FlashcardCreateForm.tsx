"use client";

import { useEffect, useState } from "react";
import { useCreateFlashcard, useGenerateFlashcard, useAIJobById } from "@/lib/hooks/flashcards";
import Container from "./Container";
import Button from "./Button";
import Input from "./Input";
import { useQueryClient } from "@tanstack/react-query";


export function FlashcardCreateForm({ note_id }: { note_id?: number }) {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [noteId, setNoteId] = useState(note_id ? String(note_id) : "");
    const source = "user_created";
    const createFlashcard = useCreateFlashcard();

    const [jobId, setJobId] = useState("");
    const qc = useQueryClient();
    const generateFlashcard = useGenerateFlashcard(noteId);
    const getAIJobStatus = useAIJobById(jobId);


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

    const handleGeneration = () => {
        if (window.confirm("Are you sure you want to generate Flashcards for this Note using AI?")) {
            generateFlashcard.mutate( noteId , {
            onSuccess: (data) => {
                setJobId(data.job_id);
                if (getAIJobStatus.data?.status === "completed") {
                    qc.invalidateQueries({
                        queryKey: ["flashcards", noteId],
                    });
                }
            }
        });
        }
    }

    useEffect(() => {
        if (getAIJobStatus.data?.status === "completed") {
            setJobId(null);
        }
    }, [getAIJobStatus.data?.status]);


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
                    className=""
                >
                    Create Flashcard
                </Button>
            </form>
            <Button
                size="sm"
                className=""
                onClick={handleGeneration}
                disabled={
                    generateFlashcard.isPending || 
                    getAIJobStatus.data?.status === "pending"
                }
            >
                {getAIJobStatus.data?.status === "pending"
                    ? "Generating..."
                    : "Generate Flashcards with AI"}
            </Button>

            {getAIJobStatus.data?.status === "pending" && (
                <p className="mt-2 text-sm text-gray-500">
                    Generating flashcards...
                </p>
            )}

            {getAIJobStatus.data?.status === "failed" && (
                <p className="mt-2 text-sm text-red-600">
                    Failed to generate flashcards.
                </p>
            )}

            {getAIJobStatus.data?.status === "failed" && (
                <Button
                    size="sm"
                    variant="outline"
                    className=""
                    onClick={handleGeneration}
                    disabled={
                        generateFlashcard.isPending ||
                        getAIJobStatus.data?.status === "pending"
                    }
                >
                    Retry
                </Button>
            )}
        </Container>
    );
}