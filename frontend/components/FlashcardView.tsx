"use client";

import { useDeleteFlashcard } from "@/lib/hooks/flashcards";

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
    const deleteFlashcard = useDeleteFlashcard();
    const id = String(flashcard.id);

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this flashcard?")) {
            deleteFlashcard.mutate(id);
        } 
        
    };

    return (
        <div className="p-4 border rounded-xl hover:bg-gray-50">
            <div className="flex justify-between items-start">
                <div>
                    <h2 className="font-semibold text-lg">{flashcard.question}</h2>
                    <p className="text-sm text-gray-600 mt-2">{flashcard.answer}</p>
                </div>
                <button
                    onClick={handleDelete}
                    className="text-red-600 hover:underline text-sm"
                >
                    Delete
                </button>
            </div>
            {deleteFlashcard.isError && (
                <p className="text-red-500">{String(deleteFlashcard.error)}</p>
            )}

            {deleteFlashcard.isSuccess && <p className="text-green-600">Flashcard Deleted!</p>}
        </div>
    );
}