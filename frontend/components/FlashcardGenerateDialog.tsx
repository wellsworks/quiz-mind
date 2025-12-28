"use client";

import { Button } from "./ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function FlashcardGenerateDialog({
    onConfirm,
    disabled,
}: {
    onConfirm: () => void;
    disabled?: boolean;
}) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button size="sm" disabled={disabled}>
                Generate AI Flashcards
                </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Generate AI flashcards from this note?
                    </AlertDialogTitle>
                </AlertDialogHeader>

            <div className="flex justify-end gap-2">
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={onConfirm}>
                    Confirm
                </AlertDialogAction>
            </div>
            </AlertDialogContent>
        </AlertDialog>
    );
}
