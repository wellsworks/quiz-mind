"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    getStudySessions,
    createStudySession,
    stopStudySession,
} from "@/lib/api/client/study_session";

const SESSIONS_KEY = ["study-sessions"];

export function useStudySessions() {
    return useQuery({
        queryKey: SESSIONS_KEY,
        queryFn: getStudySessions
    });
}

export function useCreateStudySession() {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: createStudySession,
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: SESSIONS_KEY });
        },
    });
}

export function useStopStudySession(id: number) {
    const qc = useQueryClient();
    
    return useMutation({
        mutationFn: stopStudySession,
        onSuccess: (updated) => {
            qc.invalidateQueries({ queryKey: SESSIONS_KEY });
    
            if (updated?.id) {
                qc.invalidateQueries({ queryKey: [...SESSIONS_KEY, updated.id]});
            }
        },
    });
}