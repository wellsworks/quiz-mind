"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";

export function FlashcardJobStatus({
    status,
    isGenerating,
    onCancel,
    onRetry,
}: {
    status?: "pending" | "processing" | "completed" | "failed";
    isGenerating: boolean;
    onCancel: () => void;
    onRetry: () => void;
}) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (!isGenerating) {
            setProgress(0);
            return;
        }

        if (status === "pending" || status === "processing") {
            const interval = setInterval(() => {
                setProgress((p) => Math.min(p + 0.5, 90));
            }, 500);

            return () => clearInterval(interval);
        }

        if (status === "completed") {
            setProgress(100);
        }
    }, [status, isGenerating]);

    if (!isGenerating && status !== "failed") return null;

    return (
        <div className="mt-4 rounded-lg border p-3 space-y-2">
            {status === "failed" && (
                <>
                    <p className="text-sm text-destructive">
                        Failed to generate flashcards.
                    </p>

                    <div className="flex gap-2">
                        <Button 
                            size="xs" 
                            variant="default" 
                            onClick={onRetry}
                            disabled={isGenerating}
                        >
                            Retry
                        </Button>
                    </div>
                </>
            )}

            {(status === "pending" || status === "processing") && (
                <>
                    <div className="text-sm text-muted-foreground">
                        This might take a few seconds. Generating flashcards… 
                    </div>
                    
                     
                    <div className="w-full bg-muted">
                        <Progress value={progress} className="w-[60%]" />
                    </div>
                    
                    <div className="flex gap-2">
                        <Button 
                            size="xs" 
                            variant="destructive" 
                            onClick={onCancel}
                        >
                            Cancel
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
}