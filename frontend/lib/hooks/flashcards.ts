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
    getAIFlashcardJobByNote,
    getStudyFlashcards,
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

export function useStudyFlashcards(noteIdList: number[]) {
    return useQuery({
        queryKey: [...FLASH_KEY, noteIdList],
        queryFn: () => getStudyFlashcards(noteIdList),
        enabled: !!noteIdList,
    });
}

export function useCreateFlashcard() {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: createFlashcard,
        onSuccess: (_, variables) => {
            qc.invalidateQueries(
                { 
                    queryKey: [...FLASH_KEY, String(variables.note_id)] 
                });
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
    });
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

export function useAIFlashcardJob(
    noteId: string,
    isGenerating: boolean,
) {
    return useQuery({
        queryKey: ["flashcard-job", noteId],
        queryFn: () => getAIFlashcardJobByNote(noteId),
        enabled: isGenerating,
        refetchInterval: isGenerating ? 2000 : false,
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
    });
}