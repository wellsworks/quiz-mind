"use client";

import { useNotes } from "@/lib/hooks/notes";
import Link from "next/link";
import NoteView from "./NoteView";
import { Grid } from "@/components/Grid";
import { NotebookText } from "lucide-react";
import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty";
import { Skeleton } from "./ui/skeleton";

export default function NotesList() {
    const { data, isLoading, isError } = useNotes();
    const notes = data || [];

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

    if (!notes || notes.length === 0) {
        return (
            <Empty>
                <EmptyHeader>
                    <EmptyMedia variant="icon">
                        <NotebookText />
                    </EmptyMedia>
                    <EmptyTitle>No Notes Yet</EmptyTitle>
                    <EmptyDescription>
                        You haven&apos;t created any notes yet. 
                        Click <strong>New Note</strong> to get started.
                    </EmptyDescription>
                </EmptyHeader>
            </Empty>
        );
    }
    
    return (
        <Grid>
            {notes.map((note) => (
                <Link 
                    key={note.id}
                    className="space-y-2 focus-visible:border-ring focus-visible:ring-ring/50"
                    href={`/notes/${note.id}`} 
                >
                    <NoteView note={note} />
                </Link>
            ))}
        </Grid>
    );
}