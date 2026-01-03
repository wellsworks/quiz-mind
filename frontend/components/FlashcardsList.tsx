"use client";

import { useFlashcardsByNoteId } from "@/lib/hooks/flashcards";
import FlashcardView from "./FlashcardView";
import { Grid } from "./Grid";
import { ButtonGroup } from "./ui/button-group";
import FlashcardDeleteDialog from "./FlashcardDeleteDialog";
import FlashcardEditForm from "./FlashcardEditForm";
import { WalletCards } from "lucide-react";
import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty";
import { Skeleton } from "./ui/skeleton";

export default function FlashcardList({ noteId }: { noteId: number }) {
    const id = String(noteId);
    const { data, isLoading, isError } = useFlashcardsByNoteId(id);
    const flashcards = data || [];

    if (isLoading) {
        return (
            <div className="flex flex-col space-y-2">
                <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                </div>
            </div>
        );
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
            <Empty>
                <EmptyHeader>
                    <EmptyMedia variant="icon">
                        <WalletCards />
                    </EmptyMedia>
                    <EmptyTitle>No Flashcards Yet</EmptyTitle>
                    <EmptyDescription>
                        You haven&apos;t created any flashcards yet. 
                        Click <strong>Generate AI Flashcards</strong>,
                        or <strong>Add flashcard</strong> to get started.
                    </EmptyDescription>
                </EmptyHeader>
            </Empty>
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