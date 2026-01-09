"use client";

import { useStudyFlashcards } from "@/lib/hooks/flashcards";
import FlashcardView from "./FlashcardView";
import { Skeleton } from "./ui/skeleton";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel";
import { Progress } from "./ui/progress";
import { useEffect, useState } from "react";


export default function FlashcardReview({ noteIdList }: { noteIdList: number[] }) {
    const [flashcards, setFlashcards] = useState([]);
    const { data, isLoading, isError } = useStudyFlashcards(noteIdList);


    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (data) {
            setFlashcards(data.flat());
        }
    }, [data]);

    useEffect(() => {
        if (!api) {
            return
        }

        setCount(api?.scrollSnapList().length)
        setCurrent(api?.selectedScrollSnap() + 1)

        api.on("select", () => {
            setCurrent(api?.selectedScrollSnap() + 1)
        })
    }, [api])


    
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


    return (
        <div className="mx-auto max-w-sm">
            <Carousel setApi={setApi} className="w-full max-w-sm">
                <CarouselContent>
                    {flashcards.map((card: any) => (
                        <CarouselItem key={card.id}>
                            <FlashcardView flashcard={card}/>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
            <div className="text-muted-foreground py-2 text-center text-sm">
                {current} of {count}
                <Progress value={(current/count) * 100} className="w-full" />
            </div>
        </div>
    );
}