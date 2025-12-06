"use client";

import { useNotes } from "@/lib/hooks/notes";
import Link from "next/link";

export default function NotesList() {
    const { data, isLoading, isError } = useNotes();

    if (isLoading) return <p>Loading notes...</p>;
    if (isError) return <p>Error loading notes.</p>;

    const notes = data || [];

    return (
        <div className="space-y-4">
            {notes.length === 0 && <p>No notes yet.</p>}

            {notes.map((note: any) => (
                <div 
                    key={note.id}
                    className="p-4 border rounded-xl cursor-pointer hover:bg-gray-50"
                >
                    <h2 className="font-semibold text-lg">{note.title}</h2>
                    <p className="text-sm text-gray-600 line-clamp-2">{note.content}</p>
                    <div className="mt-3 flex gap-3">
                        <Link href={`/notes/${note.id}`} className="text-blue-600 underline">
                            View
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
}