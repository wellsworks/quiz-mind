import { getFlashcardByIdServer } from "@/lib/api-server";

interface FlashcardDetailProps {
    params: { id: string };
}

export default async function FlashcardDetailPage({ params }: FlashcardDetailProps) {
    const resolvedParams = await params;
    const { id } = resolvedParams;

    const fc = await getFlashcardByIdServer(id);

    return (
        <main className="p-6 space-y-4">
            <h1 className="text-2xl font-bold">Flashcard Detail</h1>

            <section>
                <p>Showing flashcard with ID: {id}</p>
                <p>{fc.question}</p>
            </section>
        </main>
    )
}