"use client";
import { useNoteById } from "@/lib/hooks/notes";
import { Skeleton } from "./ui/skeleton";
import Container from "@/components/Container";

export default function NoteDetailView({ noteId }: { noteId: string }) {
    const { data, isLoading, isError } = useNoteById(noteId);
    const note = data;

    if (isLoading) {
        return (
            <div className="flex flex-col space-y-2">
                <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                </div>
            </div>
        );
    }

    if (isError || !note) {
        return (
            <div className="text-red-500 text-sm">
                Something went wrong. Try refreshing the page.
            </div>
        );
    }


    return (
        <Container className="w-full space-y-6 bg-background text-foreground">
            <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">
                    {note.title}
                </h2>
            </div>
            <article className="prose prose-sm tracking-wide dark:prose-invert max-w-none">
                <p>{note.content}</p>
            </article>
        </Container>
    );
}