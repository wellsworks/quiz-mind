
import Link from "next/link";
import  getCurrentUserSSR  from "@/lib/server-auth";
import { redirect } from "next/navigation";
import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import { Separator } from "@/components/ui/separator";

export default async function DashboardPage() {
    const user = await getCurrentUserSSR();

    if (!user) redirect("/login");

    return (
        <Container className="py-10 space-y-6 bg-background text-foreground">
            <PageHeader 
                title="Dashboard"
                description="Review your study data"
            />
            <main>
                <Separator className="my-4" />

                <div className="space-y-4">
                    <p>Logged in as: {user.email}</p>
                    <p>Welcome back!</p>
                </div>         
            </main>
            <footer>
                <Section title="Coming Soon:">
                    <div className="space-y-4">
                        <ul>
                            <li>Flashcard testing</li>
                            <li>AI generated Quizzes</li>
                            <li>Progress tracking</li>
                        </ul>
                    </div>
                </Section> 
            </footer> 
        </Container>
    );
}