"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function NoteView({ 
    note, 
}: { note: { id: number; title: string; content: string }, 
}) {

    return (
        <Card className="bg-secondary text-card-foreground hover:bg-secondary/20">
            <CardHeader>
                <CardTitle>{note.title}</CardTitle>
            </CardHeader>

            <CardContent>
                <p className="line-clamp-3 text-sm text-foreground/70">
                    {note.content}
                </p>
            </CardContent>

        </Card>
    );
}