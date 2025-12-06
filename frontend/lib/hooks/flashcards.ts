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

export function useCreateFlashcard() {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: createFlashcard,
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: FLASH_KEY });
        },
    });
}

export function useUpdateFlashcard() {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: updateFlashcard,
        onSuccess: (updated) => {
            qc.invalidateQueries({ queryKey: FLASH_KEY });

            if (updated?.id) {
                qc.invalidateQueries({ queryKey: [...FLASH_KEY, updated.id]})
            }
        }
    })
}

export function useDeleteFlashcard() {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: deleteFlashcard,
        onSuccess: (_, id) => {
            qc.invalidateQueries({ queryKey: FLASH_KEY });
            qc.invalidateQueries({ queryKey: [...FLASH_KEY, id] });
        },
    });
}