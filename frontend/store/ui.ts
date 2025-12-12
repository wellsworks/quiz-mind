"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Theme = "light" | "dark";

interface UIState {
    theme: Theme;
    user: any | null;

    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;
    setUser: (user: any | null) => void;
}

interface AuthState {
    user: any | null;
    setUser: (u: any | null) => void;
    logout: () => void;
}

export const useUIStore = create<UIState>((set) => ({
    theme: "light",
    user: null,

    setTheme: (theme) => {
        document.documentElement.classList.toggle("dark", theme === "dark");
        localStorage.setItem("theme", theme);
        set({ theme });
    },

    toggleTheme: () => 
        set((state) => {
            const next = state.theme === "light" ? "dark" : "light";
            document.documentElement.classList.toggle("dark", next === "dark");
            localStorage.setItem("theme", next);
            return { theme: next };
        }),
    
    setUser: (user) => set({ user }),
}));

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            setUser: (user) => set({ user }),
            logout: () => set({ user: null }),
        }),
        {
            name: "auth-store",
        }
    )
);
