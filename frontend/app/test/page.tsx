'use client';

import { getNotes } from "@/lib/api";

export default function TestPage() {
    async function test() {
        const token = prompt("Enter token:");
        const notes = await getNotes(token!);
        console.log(notes);
    }

    return (
        <button onClick={test}>
            Test getNotes
        </button>
    );
}
