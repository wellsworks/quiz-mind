"use client";

import { useState } from "react";
import { useUpdateFlashcard } from "@/lib/hooks/flashcards";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "@/components/ui/label";
import { 
    Popover,
    PopoverContent,
    PopoverTrigger, 
} from "@/components/ui/popover";
import { SquarePen } from "lucide-react";
import { toast } from "sonner";


export default function FlashcardEditForm({ 
    flashcardId, initialData 
}: { 
    flashcardId: number; 
    initialData?: { question: string; answer: string; note_id: number; source: string } 
}) {
    const [id, setId] = useState(initialData ? String(flashcardId) : "");
    const [question, setQuestion] = useState(initialData ? initialData.question : "");
    const [answer, setAnswer] = useState(initialData ? initialData.answer : "");
    const [note_id, setNoteId] = useState(initialData ? (initialData.note_id) : "");
    const source = "user_created"

    const [open, setOpen] = useState(false);

    const editFlashcard = useUpdateFlashcard();


    function handleSubmit(e:React.FormEvent) {
        e.preventDefault();
        editFlashcard.mutate({
            id, 
            payload: { answer, question, note_id: Number(note_id), source }
        },
        {
            onSuccess: () => {
                toast.success("Flashcard updated")
                setOpen(false);
            },
            onError: (error) => {
                toast("Update failed"); {error instanceof Error ? error.message : "Something went wrong."}
            }
        },
        );
    }

    function resetForm() {
        setQuestion(initialData?.question ?? "");
        setAnswer(initialData?.answer ?? "");
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
                    <SquarePen/>
                </Button>
            </PopoverTrigger>
            
            <PopoverContent className="max-w-sm" align="start">
                <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">

                    <h3 className="leading-none font-medium">Edit Flashcard</h3>
                        <p className="text-muted-foreground text-sm">
                            Make changes to your flashcard here. Click save when you&apos;re done.
                        </p>

                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="question">Question:</Label>
                            <Input
                                id="question"
                                type="text"
                                placeholder="Question"
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
                                placeholder="Answer"
                                className="w-full p-2 border rounded-lg"
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                            />
                        </div>
                    </div>

                        <Button 
                            type="submit"
                            size="sm" 
                            variant="default" 
                            disabled={editFlashcard.isLoading}
                        >
                            Save
                        </Button>
                </form> 
            </PopoverContent>
        </Popover>
    );
}