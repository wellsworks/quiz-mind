"use client";

import FlashcardReview from "@/components/FlashcardReview";
import { Card, CardContent } from "@/components/ui/card";
import NoteSelect from "@/components/NoteSelect";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useCreateStudySession, useStopStudySession } from "@/lib/hooks/study_session";
import { useNotes } from "@/lib/hooks/notes";
import { Skeleton } from "./ui/skeleton";
import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty";
import { NotebookText } from "lucide-react";
import Link from "next/link";
import { StudySession } from "@/lib/types.ts";

export default function FlashcardSession() {
    const { data, isLoading, isError } = useNotes();
    const notes = data;

    const [noteIdList, setNoteIdList] = useState<number[]>([]) 
    
    const [allScope, setAllScope] = useState(false);
    const scope = allScope ? "all" : "note";
    const note_id = noteIdList.length > 1 ? null : noteIdList[0];
    const mode = "flashcards";

    const defaultSession: StudySession = {
        id: -1,
        mode: mode,
        scope: scope,
        note_id: note_id, 
    }

    const [session, setSession] = useState<StudySession>(defaultSession);
    const startSession = useCreateStudySession();
    const stopSession = useStopStudySession(0);


    function handleStart() {
        startSession.mutate({ mode, scope, note_id },
            {
                onSuccess: (newSession) => {
                    setSession(newSession);
                }
            }
        )
    }

    function endSession() {
        stopSession.mutate(session.id);
        setSession(defaultSession);
        setNoteIdList([]);
    }

    useEffect(() => {
        return () => {
            if (session.id !== defaultSession.id) {
                endSession();
            }
        }
    }, [session.id])


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

    if (isError) {
        return (
            <div className="text-red-500 text-sm">
                Something went wrong. Try refreshing the page.
            </div>
        );
    }

    if (!notes || notes.length === 0) {
        return (
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
        )
    }

    
    return (
        <Card>
            <CardContent>
                {session.id === defaultSession.id && (
                    <NoteSelect 
                        onStart={handleStart}
                        setAllScope={setAllScope}
                        onConfirm={setNoteIdList}
                    />
                )}

                {session.id !== defaultSession.id && (
                    <div className="space-y-2 px-10">
                        <FlashcardReview noteIdList={noteIdList}/>
                        <div className="flex justify-end gap-2">
                            <Button
                                type="button"
                                onClick={endSession}
                            >
                                Exit
                            </Button>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}