"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { apiRegister } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

export default function RegisterForm() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const registerMutation = useMutation({
        mutationFn: (payload: { email: string; password: string }) =>
            apiRegister(payload),

        onSuccess: (data) => {
            router.push("/login");
        },

        onError: (err: any) => {
            setError(err.message || "Registration failed")
        },
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);

        registerMutation.mutate({ email, password });
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
            <h2 className="text-2xl font-bold mb-2">Create an Account</h2>

            <input
                className="border rounded p-2"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                className="border rounded p-2"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button className="bg-blue-600 text-white rounded p-2" type="submit">
                Register
            </button>
        </form>
    );
}