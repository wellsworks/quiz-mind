import { useState } from "react";

interface FlashcardCreateFormProps {
    onCreate: (data: { question: string; answer: string }) => void;
}


export function FlashcardCreateForm({ onCreate }: FlashcardCreateFormProps) {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onCreate({ question, answer });
        setQuestion("");
        setAnswer("");
    };


    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-xl">
            <input
                type="text"
                placeholder="Question"
                className="w-full p-2 border rounded-lg"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
            />
            <input
                type="text"
                placeholder="Answer"
                className="w-full p-2 border rounded-lg"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
            />
            <button type="submit" className="px-4 py-2 rounded-xl bg-black text-white">
                Create Flashcard
            </button>
        </form>
    );
}