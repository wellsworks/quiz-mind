"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useGenerateFlashcard, useAIFlashcardJob } from "@/lib/hooks/flashcards";
import { FlashcardGenerateDialog } from "./FlashcardGenerateDialog";
import { FlashcardJobStatus } from "./FlashcardJobStatus";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function GenerateCard({ noteId }: { noteId: string }) {
    const qc = useQueryClient();

    const [jobId, setJobId] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);

    const generateFlashcard = useGenerateFlashcard(noteId);
    const jobQuery = useAIFlashcardJob(noteId, isGenerating);

    const startGeneration = () => {
        toast.loading("Generating flashcards…", { id: "generate" });

        generateFlashcard.mutate(noteId, {
            onSuccess: (data) => {
                setJobId(data.job_id);
                setIsGenerating(true);
            },
            onError: () => {
                toast.error("Failed to start generation", { id: "generate" });
            },
        });
    };

    const handleCancel = () => {
        setIsGenerating(false);
        toast.dismiss("generate")
        toast("Generation cancelled. Flashcards may still finish in the background.");
    }

    useEffect(() => {
        if (!jobQuery.data) return;
        
        if (jobQuery.data.status === "completed") {
            toast.success("Flashcards generated!", { id: "generate" });
            qc.invalidateQueries({ queryKey: ["flashcards", noteId] });
            setIsGenerating(false);
        }

        if (jobQuery.data.status === "failed") {
            toast.error("Generation failed", { id: "generate" });
            setIsGenerating(false);
        }
    }, [jobQuery.data, noteId, qc]);

    return (
        <Card className="w-56">
            <CardContent className="mx-auto">
                <FlashcardGenerateDialog
                    onConfirm={startGeneration}
                    disabled={generateFlashcard.isPending || isGenerating}
                />

                <FlashcardJobStatus
                    status={jobQuery.data?.status}
                    isGenerating={isGenerating}
                    onCancel={handleCancel}
                    onRetry={startGeneration}
                />
            </CardContent>
        </Card> 
    );
}
