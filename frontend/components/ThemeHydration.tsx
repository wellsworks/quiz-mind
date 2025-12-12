"use client";

import { useHydrateTheme } from "@/store/useHydrateTheme";
import React from "react";

export default function ThemeHydration({ children }: { children: React.ReactNode }) {
    useHydrateTheme();

    return <>{children}</>;
}