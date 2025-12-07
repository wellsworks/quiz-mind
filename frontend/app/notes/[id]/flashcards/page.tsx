import { FlashcardList } from "@/components/FlashcardsList";
import { FlashcardCreateForm } from "@/components/FlashcardCreateForm";
import getCurrentUserSSR from "@/lib/server-auth";
import { redirect } from "next/navigation";

export default async function FlashcardsPage() {
    const user = await getCurrentUserSSR();
        
    if (!user) redirect("/login");

    return (
        <main className="p-6 space-y-8">
            <h1 className="text-3xl font-bold">Your Flashcards</h1>

            <section className="max-w-lg">
                <p>FlashcardCreateForm</p>
            </section>

            <section className="mt-8">
                <p>FlashcardsList</p>
            </section>
        </main>
    );
}