import { getNoteByIdServer } from "@/lib/api-server";
import NoteEditForm from "@/components/NoteEditForm";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import Container from "@/components/Container";
import NoteDetailView from "@/components/NoteDetailView";
import { GenerateCard } from "@/components/GenerateCard";
import FlashcardList from "@/components/FlashcardsList";
import NoteDeleteDialog from "@/components/NoteDeleteDialog";
import { FlashcardCreatePopover } from "@/components/FlashcardCreatePopover";
import { ButtonGroup } from "@/components/ui/button-group";
import { Separator } from "@/components/ui/separator";

export default async function NoteDetailPage(props: { params: Promise<{ id: string }> }) {
    const { id } = await props.params;

    const noteId  = Number(id);
    if (Number.isNaN(noteId)) {
        throw new Error(`Invalid note id: ${id}`);
    }

    const note = await getNoteByIdServer(noteId);

    return (
        <Container className="py-10 space-y-6 bg-background text-foreground">
            <PageHeader
                title="Note Details"
                description="Review and edit this note."
            />
            <main>
                <Separator className="my-4" />
                <NoteDetailView note={note} />
                <Separator className="my-4" />
                <div className="flex gap-2">
                    <div className="flex justify-start gap-2">
                            <div className="grid gap-2">
                                <div className="mx-auto">
                                    <ButtonGroup>
                                        <NoteEditForm note={note}/>
                                        <NoteDeleteDialog noteId={id}/>
                                    </ButtonGroup>
                                </div>
                                <ButtonGroup>
                                    <FlashcardCreatePopover note_id={noteId}/>
                                </ButtonGroup>
                            </div>
                    </div>
                    <div className="flex justify-end">
                        <GenerateCard noteId={id}/>
                    </div>
                </div>
            </main>
            <footer>
                <Section title="Flashcards for this note">
                    <div className="w-full">
                        <FlashcardList noteId={noteId}/>
                    </div>
                </Section>
            </footer>
        </Container>
    );
}