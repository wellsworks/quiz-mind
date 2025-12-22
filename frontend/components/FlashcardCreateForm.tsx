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

    const [progress, setProgress] = useState(0);
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

    useEffect(() => {
        if (jobQuery.data?.status === "pending" || jobQuery.data?.status === "processing") {
            const interval = setInterval(() => {
                setProgress(p => Math.min(p + 0.5, 90))
            }, 500)

            return () => clearInterval(interval);
        }

        if (jobQuery.data?.status === "completed") {
            setProgress(100);
        }

        if (jobQuery.data?.status === "failed") {
            setProgress(0);
        }
    }, [jobQuery.data?.status])


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
                Generate Flashcards with AI
            </Button>

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

            <div className="mt-4 space-y-2">
                {jobQuery.data?.status === "pending" && (
                    <p className="mt-2 rounded border border-gray-200 bg-gray-50 p-3 text-sm text-gray-700">
                        Checking your notes...
                    </p>
                )}

                {jobQuery.data?.status === "processing" && (
                    <p className="mt-2 rounded border border-blue-200 bg-blue-50 p-3 text-sm text-blue-700">
                        Generating flashcards from your notes. This may take a few seconds.
                    </p>
                )}

                {jobQuery.data?.status === "completed" && (
                    <p className="mt-2 rounded border border-green-200 bg-green-50 p-3 text-sm text-green-700">
                        Flashcards generated!
                    </p>
                )}

                {jobQuery.data?.status === "failed" && (
                    <p className="mt-2 rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                        Failed to generate flashcards.
                    </p>
                )}

                <div className="w-full bg-red-200 rounded-full h-2 overflow-hidden">
                    <div 
                        className="bg-red-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${progress}%`}}
                    />
                </div>
            </div>
            
        </Container>
    );
}