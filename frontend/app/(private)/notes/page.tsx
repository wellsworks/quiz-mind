import NotesList from "@/components/NotesList";
import  NoteCreateForm  from "@/components/NoteCreateForm";
import  getCurrentUserSSR  from "@/lib/server-auth";
import { redirect } from "next/navigation";
import { getNotesServer } from "@/lib/api-server";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import Container from "@/components/Container";

export default async function NotesPage({ params }: { params: { id: string }}) {
    const user = await getCurrentUserSSR();
    const noteId  = params.id
    
    if (!user) redirect("/login");

    const notes = await getNotesServer();

    return (
        <Container className="py-10 space-y-8">
            <PageHeader 
                title="Your Notes"
                description="Upload, organize, and review notes to learn faster."
            />

            <Section title={"Add a New Note"}>
                <div className="flex items-center justify-between">
                    <NoteCreateForm />
                </div>
            </Section>      

            <Section title={"All Notes"}>
                <div className="flex-items-center justify-betwen">
                    <NotesList />
                </div>
            </Section>      
        </Container>
    );

}