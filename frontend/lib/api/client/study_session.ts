import { request } from "@/lib/api";
import { StudySession } from "@/lib/types";

export async function getStudySessions(): Promise<StudySession> {
    return request("/study-sessions/", { method: "GET", cache: 'no-store' });
}

export async function createStudySession(payload: { mode: string; scope: string; note_id: any }): Promise<StudySession> {
    return request("/study-sessions/", { method: "POST", body: JSON.stringify(payload) });
}

export async function stopStudySession(id: number) {
    return request(`/study-sessions/${id}/end`, { method: "POST", body: JSON.stringify(id) });
}