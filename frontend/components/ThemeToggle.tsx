"use client";

import { useUIStore } from "@/store/ui";

export default function ThemeToggle() {
    const theme = useUIStore((s) => s.theme);
    const toggleTheme = useUIStore((s) => s.toggleTheme);

    return (
        <button 
            onClick={toggleTheme}
            className="p-2 rounded-md hover:bg-surface"
            aria-label="Toggle theme"
        >
           {theme === "dark" ? "🌙" : "☀️"}
        </button>
    )
}