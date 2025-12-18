"use client";

import { useQuery, useMutation, useQueryClient, QueryClientContext } from "@tanstack/react-query";
import {
    getFlashcards,
    getFlashcardById,
    getFlashcardsByNoteId, 
    createFlashcard,
    updateFlashcard,
    deleteFlashcard,
    startFlashcardGeneration,
    getAIJobById,
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

export function useFlashcardsByNoteId(noteId: string) {
    return useQuery({
        queryKey: [...FLASH_KEY, noteId],
        queryFn: () => getFlashcardsByNoteId(noteId),
        enabled: !!noteId,
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

export function useGenerateFlashcard(noteId: string) {

    return useMutation({
        mutationFn: startFlashcardGeneration,
        onSuccess: (data) => {
        },
    });
}

export function useAIJobById(jobId: string) {

    return useQuery({
        queryKey: ["ai-job", jobId],
        queryFn: () => getAIJobById(jobId!),
        enabled: !!jobId,
        refetchInterval: (data) => {
            if (!data) return false;
            return data.status === "pending" ? 2000 : false;
        },
    })
}