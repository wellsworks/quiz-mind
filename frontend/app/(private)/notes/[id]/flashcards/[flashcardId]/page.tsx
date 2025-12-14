import { getFlashcardByIdServer } from "@/lib/api-server";
import FlashcardEditForm from "@/components/FlashcardEditForm";
import FlashcardView from "@/components/FlashcardView";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import Container from "@/components/Container";
import Button from "@/components/Button";

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
        <Container className="py-10 space-y-8">
            <PageHeader 
                title="Flashcard Details"
                description="Edit and review this Flashcard"
            />

            <Section title="Flashcard Review">
                <FlashcardView flashcard={fc} />
            </Section>

            <Section title="Edit this Flashcard">
                <FlashcardEditForm flashcardId={flashcardIdNum} initialData={fc}/>
            </Section>

            <div>
                <Button size="sm" variant="subtle" className="">
                    <Link href={`/notes/${noteId}/flashcards`} className="text-black-600 underline">
                        Back to other Flashcards
                    </Link>
                </Button>
            </div>

            <Button size="sm" variant="subtle" className="">
                <Link href={`/notes/${noteId}/`} className="text-black-600 underline">
                    Back to Note
                </Link>
            </Button>
        </Container>
    )
}