"use client";

import Container from "@/components/Container";

export default function NoteDetailView({ note }: { note: { id: number; title: string; content: string } }) {

    return (
        <Container className="space-y-3">
            <h3 className="text-lg font-semibold">{note.title}</h3>
                <p className="text-sm text-foreground/70">
                    {note.content}
                </p>
        </Container>
    )
}