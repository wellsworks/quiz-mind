"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/Card";

export default function FlashcardView({ 
    flashcard 
    }: { 
        flashcard: { 
            id: number; 
            question: string; 
            answer: string; 
            note_id: number; 
            source: string 
        } 
    }) 
    {

    return (
        <Card className="space-y-3">
            <CardHeader>
                <CardTitle>{flashcard.question}</CardTitle>
            </CardHeader>

            <CardContent>
                <p className="line-clamp-3 text-sm text-foreground/70">
                {flashcard.answer}
                </p>
            </CardContent>
        </Card>
    );
}