"use client";

import { useFlashcardsByNoteId } from "@/lib/hooks/flashcards";
import Link from "next/link";

export default function FlashcardList({ noteId }: { noteId: number }) {
    const id = String(noteId);
    const { data, isLoading, isError } = useFlashcardsByNoteId(id);

    if (isLoading) return <p>Loading flashcards...</p>;
    if (isError) return <p>Error loading flashcards.</p>;

    const flashcards = data || [];

    return (
        <div className="grid grid-cols-2 gap-4">
            {flashcards.length === 0 && <p>No flashcards yet.</p>}

            {flashcards.map((card: any) => (
                <div
                    key={card.id}
                    className="p-4 border rounded-xl hover:bg-gray-50 cursor-pointer"
                >
                    <h2 className="text-lg font-semibold">{card.question}</h2>
                    <p className="text-sm text-gray-600 line-clamp-2">{card.answer}</p>
                    <div className="mt-3 flex gap-3">
                        <Link href={`/notes/${noteId}/flashcards/${card.id}`} className="text-blue-600 underline">
                            View
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
}