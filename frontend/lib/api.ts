import { getToken } from "./auth";

// update BASE_URL using environment variables

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const token = getToken();

// Utility function
async function request(path: string, options: RequestInit) {
    try {
        const res = await fetch(`${BASE_URL}${path}`, {
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : undefined),
                ...(options.headers || {}),
            }
        });

        const data = await res.json().catch(() => null);

        if (!res.ok) {
            return { ok: false, error: data?.detail || "Request failed" };
        }

        return { ok: true, data };
    } catch (err) {
        return { ok: false, error: "Network error" };
    }
}

// Auth Endpoints
export function apiLogin(payload: { email: string; password: string }) {
    return request("/auth/login", {
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