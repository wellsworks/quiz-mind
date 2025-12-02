"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/lib/api";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
    const router = useRouter();

    const { data: user, isLoading, isError } = useQuery({
        queryKey: ["currentUser"],
        queryFn: getCurrentUser,
        retry: false,
    });

    useEffect(() => {
        if (isLoading) return;
        if (isError || !user) {
            router.push("/login");
        }
    }, [isLoading, isError, user, router]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (isError || !user) {
        return null;
    }

    return <>{children}</>;
}