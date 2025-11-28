"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isLoggedIn } from "@/lib/auth";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
    const router = useRouter();
    const [auth, setAuth] = useState(isLoggedIn());

    useEffect(() => {
        if (!auth) {
            router.push("/login");
        }
    }, [auth, router]);

    useEffect(() => {
        if (!isLoggedIn()) {
            router.push("/login");
        }
    },);

    return <>{auth && children}</>;
}