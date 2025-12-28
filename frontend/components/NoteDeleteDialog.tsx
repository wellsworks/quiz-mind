"use client";

import React, { useState } from "react";
import { useDeleteNote } from "@/lib/hooks/notes";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
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


export default function NoteDeleteDialog({ noteId }: { noteId: string; }) {
    const [id, setId] = useState(noteId ? noteId : "");


    const deleteNote = useDeleteNote();
    
    function handleDelete(e: React.FormEvent) {
        e.preventDefault();
        deleteNote.mutate(
            id,
        {
            onSuccess: () => {
                toast.success("Note deleted", { id: "delete" });
            },
            onError: (error) => {
                toast.error("Deletion failed", { id: "delete" });
            }
        });
        redirect("/notes");
    };

    return (
        <AlertDialog> 
            <AlertDialogTrigger asChild>
                <Button variant="destructive" type="button" size="icon-sm">
                    <Trash2/>
                </Button>
            </AlertDialogTrigger>
            
            <AlertDialogContent className="sm:max-w-[425px]">
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete this note?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. Are you sure you want to permanently delete this note?
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