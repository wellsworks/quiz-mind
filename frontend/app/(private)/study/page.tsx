import Section from "@/components/Section";
import PageHeader from "@/components/PageHeader";
import Container from "@/components/Container";
import FlashcardSession from "@/components/FlashcardSession";
import { Separator } from "@/components/ui/separator";

export default async function StudyPage() {

    return (
        <Container className="py-10 space-y-6 bg-background text-foreground">
            <PageHeader 
                title="Study and Review"
                description="Test yourself by reviewing key concepts from your notes and flashcards."
            />
            <main>
                <Separator className="my-4" />
                <Section title={"Flashcard Review"}>
                    <div className="flex items-center justify-between">
                        <FlashcardSession />
                    </div>
                </Section> 
            </main>  
            <footer> 
            </footer>
        </Container>
    )
}