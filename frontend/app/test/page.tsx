'use client';

import { getNotes, createNote, getFlashcards } from "@/lib/api";
import { useState } from "react";
import NotesList from "@/components/NotesList";
import { NoteCreateForm } from "@/components/NoteCreateForm";
import { FlashcardList } from "@/components/FlashcardsList";

export default function TestPage() {
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
        const flashcards = await getFlashcards(token!);
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

    return (
        <div className="flex flex-col gap-4 w-80">
            <NoteCreateForm onCreate={handleCreateNote}/>
            <NotesList notes={testNotes} onSelect={(id) => alert(id)}/>
            <FlashcardList flashcards={testFlashcards} onSelect={(id) => alert(id)}/>
        </div>
    );
}
