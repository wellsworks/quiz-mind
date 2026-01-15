import { createAuthClient } from "better-auth/react";

export const { signIn, signUp, signOut, getSession } = createAuthClient();

export async function login(payload: { email: string; password: string; remember: boolean }) {
    const { data, error } = await signIn.email({
        email: payload.email,
        password: payload.password,
        rememberMe: payload.remember,
        callbackURL: "/dashboard",
    });
    return data;
}

export async function register(payload: { name: string; email: string; password: string }) {
    const { data, error } = await signUp.email({
        name: payload.name,
        email: payload.email,
        password: payload.password,
        callbackURL: "/dashboard",
    });
    return data;
}

export async function getCurrentUser() {
    const { data: session, error } = await getSession();
    if (error) {
        console.error("Couldn't retrieve current user:", error)
    } 
    return session?.user ?? null;
}

export async function logout() {
    const data = await signOut();
    return data ?? null;
}