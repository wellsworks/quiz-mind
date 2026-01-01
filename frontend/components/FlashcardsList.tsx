"use client";

import { useFlashcardsByNoteId } from "@/lib/hooks/flashcards";
import FlashcardView from "./FlashcardView";
import { Grid } from "./Grid";
import { ButtonGroup } from "./ui/button-group";
import FlashcardDeleteDialog from "./FlashcardDeleteDialog";
import FlashcardEditForm from "./FlashcardEditForm";

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
                    <div className="flex gap-2">
                        <ButtonGroup>
                            <FlashcardEditForm flashcardId={card.id} initialData={card}/>
                            <FlashcardDeleteDialog flashcardId={card.id} initialData={card}/>
                        </ButtonGroup>
                    </div>
                </div>
            ))}
        </Grid>
    );
}