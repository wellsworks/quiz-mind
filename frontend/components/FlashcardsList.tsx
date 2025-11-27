interface Flashcard {
    id: string;
    question: string;
    answer: string;
}

interface FlashcardsListProps {
    flashcards: Flashcard[];
    onSelect: (id: string) => void;
}

export function FlashcardList({ flashcards, onSelect }: FlashcardsListProps) {
    return (
        <div className="grid grid-cols-2 gap-4">
            {flashcards.map((card) => (
                <div
                    key={card.id}
                    className="p-4 border rounded-xl hover:bg-gray-50 cursor-pointer"
                    onClick={() => onSelect(card.id)}
                >
                    <p className="font-semibold">{card.question}</p>
                </div>
            ))}
        </div>
    );
}