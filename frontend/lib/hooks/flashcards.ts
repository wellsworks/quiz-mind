"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    getFlashcards,
    getFlashcardById, 
    createFlashcard,
    updateFlashcard,
    deleteFlashcard,
} from "@/lib/api";

const FLASH_KEY = ["flashcards"];

export function useFlashcards() {
    return useQuery({
        queryKey: FLASH_KEY,
        queryFn: getFlashcards,
    });
}

export function useFlashcardById(id: string) {
    return useQuery({
        queryKey: [...FLASH_KEY, id],
        queryFn: () => getFlashcardById(id),
        enabled: !!id,
    });
}