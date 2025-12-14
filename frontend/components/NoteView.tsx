"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/Card";

export default function NoteView({ note }: { note: { id: number; title: string; content: string } }) {

    return (
        <Card className="space-y-3">
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