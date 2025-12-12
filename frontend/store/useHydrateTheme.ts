"use client";

import { useEffect } from "react";
import { useUIStore } from "./ui";

export function useHydrateTheme() {
    const setTheme = useUIStore((state) => state.setTheme);

    useEffect(() => {
        const stored = localStorage.getItem("theme") as "light" | "dark" | null;
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

        const theme = stored ?? (prefersDark ? "dark" : "light");
        setTheme(theme);
    }, [setTheme]);
}