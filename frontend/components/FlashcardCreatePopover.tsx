"use client";

import { useState } from "react";
import { useCreateFlashcard } from "@/lib/hooks/flashcards";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
    Popover,
    PopoverContent,
    PopoverTrigger, 
} from "@/components/ui/popover";
import { toast } from "sonner";


export function FlashcardCreatePopover({ note_id }: { note_id?: number }) {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [noteId, setNoteId] = useState(note_id ? String(note_id) : "");
    const source = "user_created";
    const createFlashcard = useCreateFlashcard();

    const [open, setOpen] = useState(false);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        createFlashcard.mutate({ 
            question, 
            answer, 
            note_id: Number(noteId), 
            source,
        },
        {
            onSuccess: () => {
                toast.success("Flashcard created!", { id: "create" });
                setOpen(false);
                setQuestion("");
                setAnswer("");
            },
            onError: (error) => {
                toast("Creation failed", { id: "create" });
            }
        });
    };

    function resetForm() {
        setQuestion("");
        setAnswer("");
    }

    return (
        <Popover
            open={open}
            onOpenChange={(nextOpen) => {
                setOpen(nextOpen)
                if (!nextOpen) {
                    resetForm()
                }
            }}
        >
            <PopoverTrigger asChild>
                <Button variant="default" type="button" size="sm">
                    Add flashcard
                </Button>
            </PopoverTrigger>

            <PopoverContent className="max-w-sm" side="bottom">
                <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">

                    <h4 className="leading-none font-medium">Create a flashcard</h4>
                        <p className="text-muted-foreground text-sm">
                            Add a new flashcard here. Click save when you&apos;re done.
                        </p>

                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="question">Question:</Label>
                            <Input
                                id="question"
                                type="text"
                                required
                                placeholder="2 + 2 = ?"
                                className="w-full p-2 border rounded-lg"
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="answer">Answer:</Label>
                            <Input
                                id="answer"
                                type="text"
                                required
                                placeholder="4"
                                className="w-full p-2 border rounded-lg"
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                            />
                        </div>
                    </div>
                    
                    <Button 
                        size="sm"
                        type="submit" 
                        variant="default"
                        disabled={createFlashcard.isLoading}
                    >
                        Save
                    </Button>
                </form>
            </PopoverContent>
        </Popover>
    );
}