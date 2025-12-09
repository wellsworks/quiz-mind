import { getNoteByIdServer } from "@/lib/api-server";
import NoteEditForm from "@/components/NoteEditForm";
import NoteView from "@/components/NoteView";
import Link from "next/link";

export default async function NoteDetailPage(props: { params: Promise<{ id: string }> }) {
    const { id } = await props.params;

    const noteId  = Number(id);
    if (Number.isNaN(noteId)) {
        throw new Error(`Invalid note id: ${id}`);
    }

    const note = await getNoteByIdServer(noteId);

    return (
        <main className="p-6 space-y-4">
            <h1 className="text-2xl font-bold">Note Detail</h1>

            <section>
                <NoteView note={note} />
            </section>

            <section>
                <NoteEditForm initialData={note}/>
            </section>

            <div>
                <Link href={`/notes/${noteId}/flashcards`} className="text-blue-600 underline">
                    View Flashcards for this Note
                </Link>
            </div>

            <div>
                <Link href="/notes" className="text-blue-600 underline">
                    Back to Notes
                </Link>
            </div>
        </main>
    );
}