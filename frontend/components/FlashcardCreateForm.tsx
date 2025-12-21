"use client";

import { useEffect, useState } from "react";
import { useCreateFlashcard, useGenerateFlashcard, useAIFlashcardJob } from "@/lib/hooks/flashcards";
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
    const [isGenerating, setIsGenerating] = useState(false);
    const jobQuery = useAIFlashcardJob(noteId, isGenerating);


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
                setIsGenerating(true);
                },
            });
        }
    }

    useEffect(() => {
        if (jobQuery.data?.status === "completed") {
            qc.invalidateQueries({ queryKey: ["flashcards", noteId] });
            setIsGenerating(false);
        }
    }, [jobQuery.data?.status, noteId, qc]);


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
                    jobQuery.data?.status === "pending"
                }
            >
                {jobQuery.data?.status === "pending"
                    ? "Generating..."
                    : "Generate Flashcards with AI"}
            </Button>

            {jobQuery.data?.status === "pending" && (
                <p className="mt-2 text-sm text-gray-500">
                    Generating flashcards...
                </p>
            )}

            {jobQuery.data?.status === "failed" && (
                <p className="mt-2 text-sm text-red-600">
                    Failed to generate flashcards.
                </p>
            )}

            {jobQuery.data?.status === "failed" && (
                <Button
                    size="sm"
                    variant="outline"
                    className=""
                    onClick={handleGeneration}
                    disabled={
                        generateFlashcard.isPending ||
                        jobQuery.data?.status === "pending"
                    }
                >
                    Retry
                </Button>
            )}
        </Container>
    );
}