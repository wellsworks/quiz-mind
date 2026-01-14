import Section from "@/components/Section";
import PageHeader from "@/components/PageHeader";
import Container from "@/components/Container";
import FlashcardSession from "@/components/FlashcardSession";
import { NotebookText } from "lucide-react";
import  getCurrentUserSSR  from "@/lib/server-auth";
import { redirect } from "next/navigation";
import { getNotesServer } from "@/lib/api-server";
import { Separator } from "@/components/ui/separator";
import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty";
import Link from "next/link";

export default async function StudyPage() {
    const user = await getCurrentUserSSR();
    if (!user) redirect("/login");
    
    const notes = await getNotesServer();

    return (
        <Container className="py-10 space-y-6 bg-background text-foreground">
            <PageHeader 
                title="Study and Review"
                description="Test yourself by reviewing key concepts from your notes and flashcards."
            />
            <main>
                <Separator className="my-4" />

                {(!notes || notes.length === 0) && (
                    <Empty>
                        <EmptyHeader>
                            <EmptyMedia variant="icon">
                                <NotebookText />
                            </EmptyMedia>
                            <EmptyTitle>No Notes Yet</EmptyTitle>
                            <EmptyDescription>
                                You haven&apos;t created any notes yet. 
                                Add some <Link href="/notes"><strong>Notes</strong></Link> to start studying.
                            </EmptyDescription>
                        </EmptyHeader>
                    </Empty>
                )}

                {notes.length > 0 && (
                    <Section title={"Flashcard Review"}>
                        <div className="flex items-center justify-between">
                            <FlashcardSession />
                        </div>
                    </Section> 
                )}
            </main>  
            <footer> 
            </footer>
        </Container>
    )
}