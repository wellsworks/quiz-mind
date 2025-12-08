import { getNoteByIdServer } from "@/lib/api-server";
import NoteEditForm from "@/components/NoteEditForm";


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

            <div className="p-4 border rounded-xl cursor-pointer hover:bg-gray-50">
                <h2 className="font-semibold text-lg">{note.title}</h2>
                <p className="text-sm text-gray-600 line-clamp-2">{note.content}</p>
            </div>

            <section>
                <NoteEditForm />
            </section>
        </main>
    );
}