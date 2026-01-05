"use client";

import { useState } from 'react';
import { useCreateNote } from '@/lib/hooks/notes';
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
import { toast } from "sonner";
import { InputGroup, InputGroupTextarea } from "@/components/ui/input-group"
import { Label } from './ui/label';

export default function NoteCreateForm() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const createNote = useCreateNote();

    const [open, setOpen] = useState(false);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        createNote.mutate({ title, content }, {
            onSuccess: () => {
                toast.success("Note created!", { id: "create" });
                setOpen(false);                
            },
            onError: (error) => {
                toast.error("Creation failed", { id: "create" });
            }
        });
    }

    function resetForm() {
        setTitle("");
        setContent("");
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
                <Button variant="default" type="button" size="sm">
                    New Note
                </Button>
            </DialogTrigger>

            <DialogContent className="min-w-svh">
                <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">

                    <DialogHeader>
                        <DialogTitle>Create a note</DialogTitle>
                        <DialogDescription>
                            Add a new note here. Click save when you&apos;re done.
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
                                        className="min-h-[400px]"
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
                            disabled={createNote.isLoading}
                        >
                            Save
                        </Button>
                                        
                    </DialogFooter>         
                </form>
            </DialogContent>
        </Dialog>
    );
}