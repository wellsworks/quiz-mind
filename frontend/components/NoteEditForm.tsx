"use client";

import React, { useEffect, useState } from "react";
import { useUpdateNote, useNoteById } from "@/lib/hooks/notes";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger, 
} from "@/components/ui/dialog";
import { SquarePen } from "lucide-react";
import { toast } from "sonner";
import { InputGroup, InputGroupTextarea } from "@/components/ui/input-group";
import { Label } from "./ui/label";
import { Skeleton } from "./ui/skeleton";

export default function NoteEditForm({ noteId }: { noteId: string }) {
    const { data: note, isLoading, isError } = useNoteById(noteId);

    const [id, setId] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const [open, setOpen] = useState(false);
    const editNote = useUpdateNote();

    useEffect(() => {
        if (note) {
            setId(String(note.id));
            setTitle(note.title);
            setContent(note.content);
        }
    }, [note]);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        editNote.mutate({
            id, 
            payload: { title, content }
        },
        {
            onSuccess: () => {
                toast.success("Note updated!", { id: "update" });
                setOpen(false);
            },
            onError: (error) => {
                toast("Update failed", { id: "update"});
            }
        });
    }

    function resetForm() {
        setTitle(note?.title ?? "");
        setContent(note?.content ?? "");
    }
    
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

    if (isError || !note) {
        return (
            <div className="text-red-500 text-sm">
                Something went wrong. Try refreshing the page.
            </div>
        );
    }

    return (
        <Dialog 
            open={open} 
            onOpenChange={(nextOpen) => {
                setOpen(nextOpen)
                if (!nextOpen) {
                    resetForm()
                }
            }}
        >

            <DialogTrigger asChild>
                <Button 
                    variant="default" 
                    type="button" 
                    size="icon-sm"
                    aria-label="Edit note"
                >
                    <SquarePen/>
                </Button>
            </DialogTrigger>
        
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">

                    <DialogHeader>
                        <DialogTitle>Edit Note</DialogTitle>
                        <DialogDescription>
                            Make changes to your note here. Click save when you&apos;re done.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4">
                        <div className="grid gap-3 max-w-xs">
                            <Label htmlFor="note title">Title: </Label>
                            <Input
                                id="note title"
                                type="text"
                                required
                                placeholder="Note title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="grid gap-3">
                            <div className="grid w-full min-w-full gap-4">
                                <Label htmlFor="note content">Note content: </Label>
                                <InputGroup>
                                    <InputGroupTextarea
                                        id="note content"
                                        required
                                        placeholder="Write your note here"
                                        className="min-h-[200px]"
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                    />
                                </InputGroup>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                
                        <DialogClose asChild>
                            <Button 
                                type="button"
                                size="sm"
                                variant="outline"
                            >
                                Cancel
                            </Button>
                        </DialogClose>
                        
                        <Button 
                            type="submit"
                            size="sm" 
                            variant="default" 
                            disabled={editNote.isPending}
                        >
                            Save
                        </Button>
                        
                    </DialogFooter>         
                </form>
            </DialogContent>
        </Dialog>
    );
}