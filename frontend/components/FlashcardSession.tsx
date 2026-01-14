"use client";

import FlashcardReview from "@/components/FlashcardReview";
import { Card, CardContent } from "@/components/ui/card";
import NoteSelect from "@/components/NoteSelect";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useCreateStudySession, useStopStudySession } from "@/lib/hooks/study_session";

export default function FlashcardSession() {
    const [noteIdList, setNoteIdList] = useState<number[]>([]) 
    
    const [allScope, setAllScope] = useState(false);
    const scope = allScope ? "all" : "note";
    const noteId = noteIdList.length > 1 ? null : noteIdList[0];
    const mode = "flashcards";

    const [session, setSession] = useState();
    const startSession = useCreateStudySession();
    const stopSession = useStopStudySession(0);


    function handleStart() {
        startSession.mutate({ mode, scope, noteId },
            {
                onSuccess: (session) => {
                    setSession(session);
                }
            }
        )
    }

    function endSession() {
        stopSession.mutate(session?.id);
        setSession(null);
        setNoteIdList([]);
    }

    useEffect(() => {
        return () => {
            if (session?.id) {
                endSession();
            }
        }
    }, [session?.id])


    return (
        <Card>
            <CardContent>
                {!session && (
                    <NoteSelect 
                        onStart={handleStart}
                        setAllScope={setAllScope}
                        onConfirm={setNoteIdList}
                    />
                )}

                {session && (
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