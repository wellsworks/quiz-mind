import NotesList from "@/components/NotesList";
import  NoteCreateForm  from "@/components/NoteCreateForm";
import  getCurrentUserSSR  from "@/lib/server-auth";
import { redirect } from "next/navigation";
import { getNotesServer } from "@/lib/api-server";

export default async function NotesPage({ params }: { params: { id: string }}) {
    const user = await getCurrentUserSSR();
    const noteId  = params.id
    
    if (!user) redirect("/login");

    const notes = await getNotesServer();

    return (
        <main className="p-6 space-y-8">
            <h1 className="text-3xl font-bold">Your Notes</h1>
            
            <section className="max-w-lg">
                <NoteCreateForm />
            </section>

            <section className="mt-8">
                <NotesList />
            </section>
            
        </main>
    );

}