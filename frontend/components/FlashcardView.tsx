"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

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
    const [isFlipped, setIsFlipped] = useState(false)

    const handleFlip = () => setIsFlipped(!isFlipped)

    return (
        <div>
            <Card 
                className="w-full max-w-sm h-60 bg-secondary text-card-foreground hover:bg-secondary/20" 
                onClick={handleFlip}
            >
                {(!isFlipped) && (
                    <CardContent className="flex items-center justify-center h-full p-6 relative">
                        <div className="absolute inset-0 flex items-center justify-center p-6">
                            <p className="text-lg font-semibold">{flashcard.question}</p>
                        </div>
                    </CardContent>
                )}
                
                {(isFlipped) && (
                    <CardContent className="flex items-center justify-center h-full p-6 relative">
                        <div className="absolute inset-0 flex items-center justify-center p-6">
                            <p className="text-lg font-semibold">{flashcard.answer}</p>
                        </div>
                    </CardContent>
                )}
            </Card>
        </div>
    )
}