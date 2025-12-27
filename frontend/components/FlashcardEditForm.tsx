"use client";

import { useState } from "react";
import { useUpdateFlashcard } from "@/lib/hooks/flashcards";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { 
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger, 
} from "@/components/ui/dialog";
import { SquarePen } from "lucide-react";
import { toast } from "sonner";


export default function FlashcardEditForm({ flashcardId, initialData }: { flashcardId: number; initialData?: { question: string; answer: string; note_id: number; source: string } }) {
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
        <Dialog 
            open={open} 
            onOpenChange={(nextOpen) => {
                setOpen(nextOpen)
                if (!nextOpen) {
                    resetForm()
                }
            }}
        >
            
            <DialogTrigger asChild>
                <Button variant="default" type="button" size="sm">
                    <SquarePen/>
                </Button>
            </DialogTrigger>
            
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">

                    <DialogHeader>
                        <DialogTitle>Edit flashcard</DialogTitle>
                        <DialogDescription>
                            Make changes to your flashcard here. Click save when you&apos;re done.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Input
                                type="text"
                                placeholder="Question"
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                            />
                        </div>
                        <div className="grid gap-3">
                            <Input
                                type="text"
                                placeholder="Answer"
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                
                        <DialogClose asChild>
                            <Button 
                                type="button"
                                size="sm"
                                variant="outline"
                            >
                                Cancel
                            </Button>
                        </DialogClose>
                        
                        <Button 
                            type="submit"
                            size="sm" 
                            variant="default" 
                            disabled={editFlashcard.isLoading}
                        >
                            Save
                        </Button>
                        
                    </DialogFooter>
                </form> 
            </DialogContent>
        </Dialog>
    );
}