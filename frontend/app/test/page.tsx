'use client';

import { getNotes, createNote, getFlashcards, apiLogout } from "@/lib/api";
import { useState } from "react";
import NotesList from "@/components/NotesList";
import { NoteCreateForm } from "@/components/NoteCreateForm";
import { FlashcardList } from "@/components/FlashcardsList";
import { FlashcardCreateForm } from "@/components/FlashcardCreateForm";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/lib/api";

export default function TestPage() {
    const { data: user, isLoading, isError } = useQuery({
        queryKey: ["currentUser"],
        queryFn: getCurrentUser,
        retry: false,
    });

    const fakeLogout = () => {
        apiLogout();
    }

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState("");

    const testNotes = [ 
        {
            id: "1001",
            title: "The joys of Calculus",
            content: "I couldn't think of a joke that wasn't derivative"
        },
        {
            id: "10002",
            title: "Information Security",
            content: "It's more like a suggestion, amirite"
        },
    ];

    const testFlashcards = [
        {
            id: "200",
            question: "What is the value of pi?",
            answer: "Usually about $10, but in this economy, who knows?"
        },
        {
            id: "300",
            question: "How far away is the moon?",
            answer: "Not that far"
        }
    ]


    async function test() {
        const token = prompt("Enter token:");
        const flashcards = await getFlashcards();
        console.log(flashcards);
    }
    const handleCreateNote = (data: { title: string; content: string }) => {
        const newNote = {
            id: 11111,
            title: data.title,
            content: data.content,
        };

        console.log("NOTE CREATED:", newNote);

    };

    const handleCreateFlashcard = (data: { question: string; answer: string }) => {
        const newFlashcard = {
            id: 2222,
            question: data.question,
            answer: data.answer,
        };

        console.log("FLASHCARD CREATED:", newFlashcard);
    }

    return (
        <div className="flex flex-col gap-4 w-80">
            <p>Logged in? {user ? " Yes " : " No " }</p>
            <button 
                className="px-4 py-2 rounded bg-red-600 text-white"
                onClick={fakeLogout}
            >
                Fake Logout
            </button>

            <NoteCreateForm onCreate={handleCreateNote}/>
            <ProtectedRoute>
                <NotesList notes={testNotes} onSelect={(id) => alert(id)}/>
            </ProtectedRoute>
            <FlashcardCreateForm onCreate={handleCreateFlashcard}/>
            <ProtectedRoute>
                <FlashcardList flashcards={testFlashcards} onSelect={(id) => alert(id)}/>
            </ProtectedRoute>
        </div>
    );
}
