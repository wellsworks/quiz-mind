import NotesList from "@/components/NotesList";
import  NoteCreateForm  from "@/components/NoteCreateForm";
import  getCurrentUserSSR  from "@/lib/server-auth";
import { redirect } from "next/navigation";
import { getNotesServer } from "@/lib/api-server";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import Container from "@/components/Container";
import { Separator } from "@/components/ui/separator";

export default async function NotesPage({ params }: { params: { id: string }}) {
    const user = await getCurrentUserSSR();
    const noteId  = params.id
    
    if (!user) redirect("/login");

    const notes = await getNotesServer();

    return (
        <Container className="py-10 space-y-6 bg-background text-foreground">
            <PageHeader 
                title="Your Notes"
                description="Create and study notes to learn faster."
            />
            <Separator className="my-4" />

            <div className="flex items-center justify-between">
                <NoteCreateForm />
            </div>    

            <Section title={"All Notes"}>
                <div className="flex-items-center justify-betwen">
                    <NotesList />
                </div>
            </Section>      
        </Container>
    );

}