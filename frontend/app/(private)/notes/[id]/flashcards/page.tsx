import  FlashcardList  from "@/components/FlashcardsList";
import { FlashcardCreateForm } from "@/components/FlashcardCreateForm";
import getCurrentUserSSR from "@/lib/server-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import Container from "@/components/Container";
import Button from "@/components/Button";

export default async function FlashcardsPage(props: { params: Promise<{ id: string }> }) {
    const { id } = await props.params;

    const noteId  = Number(id);
    if (Number.isNaN(noteId)) {
        throw new Error(`Invalid note id: ${id}`);
    }

    const user = await getCurrentUserSSR();
        
    if (!user) redirect("/login");

    return (
        <Container className="py-10 space-y-8">
            <PageHeader
                title="Your Flashcards"
                description="Review key concepts from your notes quickly and easily."
            />
            <Section title="Add a New Flashcard">
                <div className="flex items-center justify-between">
                    <FlashcardCreateForm note_id={noteId}/>
                </div>
            </Section>

            <Section title="All Flashcards for this Note">
                <div className="flex items-center justify-between">
                    <FlashcardList noteId={noteId}/>
                </div>
            </Section>

            <Button size="sm" variant="subtle" className="">
                <Link href={`/notes/${noteId}`} className="text-white-600 underline">
                    Back to Note
                </Link>
            </Button>
        </Container>
    );
}