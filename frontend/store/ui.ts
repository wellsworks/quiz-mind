"use client";

import { create } from "zustand";

export type Theme = "light" | "dark";

interface UIState {
    theme: Theme;
    user: any | null;

    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;
    setUser: (user: any | null) => void;
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

