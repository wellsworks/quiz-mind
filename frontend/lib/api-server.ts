import { cookies } from "next/headers";

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// utility function
async function serverFetch(path: string, options: RequestInit = {}) {
    const cookieStore = cookies();
    const token = (await cookieStore).get("access_token")?.value || null;

    const cookierHeader = token ? `access_token=${token}` : "";

    const res = await fetch(`${BASE_URL}${path}`, {
        ...options,
        headers: {
            "Content-Type": "application/json", 
            ...(cookierHeader ? { Cookie: cookierHeader } : {}),
            ...(options.headers || {}),
        },
        cache: "no-store",
    });


    if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        const detail = 
            Array.isArray(error?.detail)
            ? JSON.stringify(error.detail)
            : error?.detail;
        throw new Error(detail || `Request to ${path} failed with status ${res.status}`
        );
    }

    return res.json();
}

// server API functions
export async function getNotesServer() {
    return serverFetch("/notes/", { method: "GET" });
}

export async function getNoteByIdServer(id: string | number) {
    return serverFetch(`/notes/${id}`, { method: "GET" });
}

export async function getFlashcardsServer() {
    return serverFetch("/flashcards/", { method: "GET" });
}

export async function getFlashcardByIdServer(id: string | number) {
    return serverFetch(`/flashcards/${id}`, { method: "GET" });
}

export async function getFlashcardsByNoteIdServer(noteId: string | number) {
    return serverFetch(`/notes/${noteId}/flashcards`, { method: "GET" });
}