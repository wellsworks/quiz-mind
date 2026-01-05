"use client";

import Container from "@/components/Container";

export default function NoteDetailView({ 
    note, 
}: { 
    note: { id: number; title: string; content: string }; 
}) {

    return (
        <Container className="w-full space-y-6 bg-background text-foreground">
            <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">
                    {note.title}
                </h2>
            </div>
            <article className="prose prose-sm tracking-wide dark:prose-invert max-w-none">
                <p>{note.content}</p>
            </article>
        </Container>
    );
}