import { getFlashcardByIdServer } from "@/lib/api-server";
import FlashcardEditForm from "@/components/FlashcardEditForm";
import Link from "next/link";


export default async function FlashcardDetailPage(props: { params: Promise<{ id: string, flashcardId: string }> }) {
    const { id, flashcardId } = await props.params;

    const noteId  = Number(id);
    const flashcardIdNum = Number(flashcardId);
    if (Number.isNaN(noteId)) {
        throw new Error(`Invalid note id: ${id}`);
    }
    if (Number.isNaN(flashcardIdNum)) {
        throw new Error(`Invalid flashcard id: ${flashcardId}`);
    }

    const fc = await getFlashcardByIdServer(flashcardIdNum);

    return (
        <main className="p-6 space-y-4">
            <h1 className="text-2xl font-bold">Flashcard Detail</h1>

            <div className="p-4 border rounded-xl cursor-pointer hover:bg-gray-50">
                <h2 className="font-semibold text-lg">{fc.question}</h2>
                <p className="text-sm text-gray-600 line-clamp-2">{fc.answer}</p>
            </div>

            <section>
                <FlashcardEditForm flashcardId={flashcardIdNum} initialData={fc}/>
            </section>

            <div>
                <Link href={`/notes/${noteId}/flashcards`} className="text-blue-600 underline">
                    Back to other Flashcards
                </Link>
            </div>

            <div>
                <Link href={`/notes/${noteId}/`} className="text-blue-600 underline">
                    Back to Note
                </Link>
            </div>
        </main>
    )
}