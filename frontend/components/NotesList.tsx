"use client";

import { useNotes } from "@/lib/hooks/notes";
import Link from "next/link";
import NoteView from "./NoteView";
import { Grid } from "@/components/Grid";

export default function NotesList() {
    const { data, isLoading, isError } = useNotes();
    const notes = data || [];

    if (isLoading) {
        return <div className="text-sm text-foreground/60">Loading notes...</div>;
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
            <div className="text-sm text-foreground/60">
                No notes yet.
                <br />
                Click <strong>Create Note</strong> to get started.
            </div>
        );
    }
    
    return (
        <Grid>
            {notes.map((note) => (
                <div key={note.id} className="space-y-2">
                    <Link 
                        href={`/notes/${note.id}`} 
                    >
                        <NoteView note={note} />
                    </Link>
                </div>
            ))}
        </Grid>
    );
}