import  FlashcardList  from "@/components/FlashcardsList";
import { FlashcardCreateForm } from "@/components/FlashcardCreateForm";
import getCurrentUserSSR from "@/lib/server-auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function FlashcardsPage(props: { params: Promise<{ id: string }> }) {
    const { id } = await props.params;

    const noteId  = Number(id);
    if (Number.isNaN(noteId)) {
        throw new Error(`Invalid note id: ${id}`);
    }

    const user = await getCurrentUserSSR();
        
    if (!user) redirect("/login");

    return (
        <main className="p-6 space-y-8">
            <h1 className="text-3xl font-bold">Your Flashcards</h1>

            <section className="max-w-lg">
                <FlashcardCreateForm note_id={noteId}/>
            </section>

            <section className="mt-8">
                <FlashcardList noteId={noteId}/>
            </section>

            <div>
                <Link href={`/notes/${noteId}`} className="text-blue-600 underline">
                    Back to Note
                </Link>
            </div>
        </main>
    );
}