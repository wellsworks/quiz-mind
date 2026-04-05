"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/lib/hooks/auth";

export function AuthGuard({ children }: { children: React.ReactNode }) {
    const { data: user, isLoading } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !user) {
            router.push("/login");
        }
    }, [user, isLoading, router]);

    return <>{children}</>;
}