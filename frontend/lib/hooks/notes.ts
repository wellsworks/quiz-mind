"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    getNotes,
    getNoteById,
    createNote,
    updateNote,
    deleteNote,
} from "@/lib/api";

const NOTES_KEY = ["notes"];

export function useNotes() {
    return useQuery({
        queryKey: NOTES_KEY,
        queryFn: getNotes,
    });
}