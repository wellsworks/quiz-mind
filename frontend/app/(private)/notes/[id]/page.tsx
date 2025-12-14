import { getNoteByIdServer } from "@/lib/api-server";
import NoteEditForm from "@/components/NoteEditForm";
import NoteView from "@/components/NoteView";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import Container from "@/components/Container";

export default async function NoteDetailPage(props: { params: Promise<{ id: string }> }) {
    const { id } = await props.params;

    const noteId  = Number(id);
    if (Number.isNaN(noteId)) {
        throw new Error(`Invalid note id: ${id}`);
    }

    const note = await getNoteByIdServer(noteId);

    return (
        <Container className="py-10 space-y-8">
            <PageHeader
                title="Note Details"
                description="Edit and review this note."
            />

            <Section title="Note Review">
                <NoteView note={note} />
            </Section>

            <Section title="Edit this Note">
                <NoteEditForm initialData={note}/>
            </Section>
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
        </Container>
    );
}