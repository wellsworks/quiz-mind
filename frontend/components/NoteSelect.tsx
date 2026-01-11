"use client";

import { useNoteSummaries } from "@/lib/hooks/notes";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { CheckboxTree } from "@/components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import {
    Dialog,
    DialogTrigger,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogContent,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";
import React, { useState } from "react";


export default function NoteSelect({
    onStart,
}: {
    onStart: (noteIds: number[]) => void;
}) {
    const { data: notes = [], isLoading, isError } = useNoteSummaries();
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [open, setOpen] = useState(false);

    const items = notes.map(note => ({
        id: note.id,
        label: note.title,
        disabled: note.flashcard_count > 0 ? false : true
    }))
    

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

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        onStart(selectedIds)
        setOpen(false)
    }

    function resetForm() {
        setSelectedIds([]);
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
                <Button variant="default">Select notes</Button>
            </DialogTrigger>
            <DialogContent>
                <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
                    <DialogHeader>
                        <DialogTitle>Choose notes</DialogTitle>
                        <DialogDescription>
                            Select the notes that you want to study. Click start when you&apos;re done.
                        </DialogDescription>
                    </DialogHeader>

                    <Command>
                        <CommandInput placeholder="Search for notes..." />
                        <CommandList>
                            <CommandEmpty>No results found.</CommandEmpty>
                            <CommandGroup heading="Notes">
                                <CheckboxTree 
                                    parent="All Notes" 
                                    items={items}
                                    selectedIds={selectedIds}
                                    onChange={setSelectedIds} 
                                />
                            </CommandGroup>
                        </CommandList>
                    </Command>
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
                        disabled={selectedIds.length === 0}
                    >
                        Start studying
                    </Button>
                                            
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}