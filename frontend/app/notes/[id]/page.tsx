import { cookies } from "next/headers";
import { getNoteByIdServer } from "@/lib/api-server";

interface NotePageProps {
    params: { id: string };
}

export default async function NoteDetailPage({ params }: NotePageProps) {
    const resolvedParams = await params;
    const { id } = resolvedParams;

    const note = await getNoteByIdServer(id);

    return (
        <main className="p-6 space-y-4">
            <h1 className="text-2xl font-bold">Note Detail</h1>

            <section>
                <p>Showing a note with ID: {id}</p>
                <p>{note.title}</p>

            </section>
        </main>
    );
}