"use client";

import { useDeleteNote } from "@/lib/hooks/notes";

export default function NoteView({ note }: { note: { id: number; title: string; content: string } }) {
    const deleteNote = useDeleteNote();
    const id = String(note.id);

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this note?")) {
            deleteNote.mutate(id);
        } 
        
    };

    return (
        <div className="p-4 border rounded-xl hover:bg-gray-50">
            <div className="flex justify-between items-start">
                <div>
                    <h2 className="font-semibold text-lg">{note.title}</h2>
                    <p className="text-sm text-gray-600 mt-2">{note.content}</p>
                </div>
                <button
                    onClick={handleDelete}
                    className="text-red-600 hover:underline text-sm"
                >
                    Delete
                </button>
            </div>
            {deleteNote.isError && (
                <p className="text-red-500">{String(deleteNote.error)}</p>
            )}

            {deleteNote.isSuccess && <p className="text-green-600">Note Deleted!</p>}
        </div>
    );
}