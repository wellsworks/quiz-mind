import { LoginResponse } from "./types";

// update BASE_URL using environment variables

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Utility function
async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
    
    const res = await fetch(`${BASE_URL}${path}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {}),
        },
        credentials: "include",
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

export function getCurrentUser() {
    request("/users/me", { method: "GET" });
}

export function apiLogout() {
    request("/auth/logout", { method: "POST" });
}

// add API endpoints for notes and flashcard
export function getNotes() {
    return request("/notes/", { method: "GET", cache: 'no-store' });
}

export async function createNote(payload: { title: string; content: string }) {
    return request("/notes/", { method: "POST", body: JSON.stringify(payload) })
}

export async function getFlashcards() {
    return request("/flashcards/", { method: "GET", cache: 'no-store' });
}