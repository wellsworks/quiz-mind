import { request } from "@/lib/api";

export async function getStudySessions() {
    return request("/study-sessions/", { method: "GET", cache: 'no-store' });
}

export async function createStudySession(payload: { mode: string; scope: string; noteId: any }) {
    return request("/study-sessions/", { method: "POST", body: JSON.stringify(payload) });
}

export async function stopStudySession(id: number) {
    return request(`/study-sessions/${id}/end`, { method: "POST", body: JSON.stringify(id) });
}