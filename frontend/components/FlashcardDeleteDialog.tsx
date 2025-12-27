"use client";

import React, { useState } from "react";
import { useDeleteFlashcard } from "@/lib/hooks/flashcards";
import { Button } from "./ui/button";
import { 
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger, 
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";


export default function FlashcardDeleteDialog({ flashcardId, initialData }: { flashcardId: number; initialData?: { question: string; answer: string; note_id: number; source: string } }) {
    const [id, setId] = useState(initialData ? String(flashcardId) : "");

    const deleteFlashcard = useDeleteFlashcard();

    
    function handleDelete(e: React.FormEvent) {
        e.preventDefault();
        deleteFlashcard.mutate(
            id,
        {
            onSuccess: () => {
                toast.success("Flashcard deleted") 
            },
            onError: (error) => {
                toast("Deletion failed"); {error instanceof Error ? error.message : "Something went wrong."}
            }
        }
        );
    }


    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>                
                <Button variant="destructive" type="button" size="sm">
                    <Trash2 />
                </Button>
            </AlertDialogTrigger>

            <AlertDialogContent className="sm:max-w-[425px]">
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. Are you sure you want to permanently delete this flashcard?
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                        onClick={handleDelete}
                        variant="destructive" 
                    >
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter> 
            </AlertDialogContent>            
        </AlertDialog>
    );
}