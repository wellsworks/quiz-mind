import NotesList from "@/components/NotesList";
import  NoteCreateForm  from "@/components/NoteCreateForm";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import Container from "@/components/Container";
import { Separator } from "@/components/ui/separator";

export default async function NotesPage({ params }: { params: { id: string }}) {

    return (
        <Container className="py-10 space-y-6 bg-background text-foreground">
            <PageHeader 
                title="Your Notes"
                description="Create and study notes to learn faster."
            />
            <main>
                <Separator className="my-4" />
                <div className="flex items-center justify-between">
                    <NoteCreateForm />
                </div>    
            </main>  
            <footer>
                <Section title={"All Notes"}>
                    <div className="flex-items-center justify-betwen">
                        <NotesList />
                    </div>
                </Section>  
            </footer>
        </Container>
    );

}