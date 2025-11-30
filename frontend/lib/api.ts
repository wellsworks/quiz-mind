import { getToken } from "./auth";
import { LoginResponse } from "./types";

// update BASE_URL using environment variables

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const token = getToken();

// Utility function
async function request<T>(path: string, options: RequestInit = {}, token?: string): Promise<T> {
    
    const res = await fetch(`${BASE_URL}${path}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...(options.headers || {}),
        }
    });

    let data: any = null;
    try {
        data = await res.json();
    } catch {}

    if (!res.ok) {
        throw new Error(data?.detail || "Request failed");
    }

    return data;
}

// Auth Endpoints
export function apiLogin(payload: { email: string; password: string }) {
    return request<LoginResponse>("/auth/login", {
        method: "POST",
        body: JSON.stringify(payload),
    });
}

export function apiRegister(payload: { email: string; password: string }) {
    return request("/auth/register", {
        method: "POST", 
        body: JSON.stringify(payload),
    });
}

// add API endpoints for notes and flashcard
export function getNotes(token?: string) {
    return request("/notes/", { cache: 'no-store' }, token);
}

export async function createNote(payload: { title: string; content: string }, token?: string) {
    return request("/notes/", { method: "POST", body: JSON.stringify(payload) }, token)
}

export async function getFlashcards(token?: string) {
    return request("/flashcards/", { cache: 'no-store' }, token);
}