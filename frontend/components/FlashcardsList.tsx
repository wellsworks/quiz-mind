"use client";

import { useFlashcardsByNoteId } from "@/lib/hooks/flashcards";
import Link from "next/link";
import FlashcardView from "./FlashcardView";
import { Grid } from "./Grid";
import Button from "./Button";

export default function FlashcardList({ noteId }: { noteId: number }) {
    const id = String(noteId);
    const { data, isLoading, isError } = useFlashcardsByNoteId(id);
    const flashcards = data || [];

    if (isLoading) {
        return <div className="text-sm text-foreground/60">Loading flashcards...</div>;
    }

    if (isError) {
        return (
            <div className="text-red-500 text-sm">
                Something went wrong. Try refreshing the page.
            </div>
        );
    }

    if (!flashcards || flashcards.length === 0) {
        return (
            <div className="text-sm text-foreground/60">
                No flashcards yet.
                Click <strong>Create Flashcard</strong> to begin.
            </div>
        );
    }
    

    return (
        <Grid>
            {flashcards.map((card: any) => (
                <div key={card.id} className="space-y-2">
                    <FlashcardView flashcard={card} />
                    <Button size="sm" variant="subtle" className="">
                        <Link 
                            href={`/notes/${noteId}/flashcards/${card.id}`} 
                            className="text-black-600 underline"
                        >
                            View
                        </Link>
                    </Button>
                </div>
            ))}
        </Grid>
    );
}