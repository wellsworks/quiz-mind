"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiLogin } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

export default function LoginForm() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const loginMutation = useMutation({
        mutationFn: (payload: { email: string; password: string }) =>
            apiLogin(payload),

        onSuccess: () => {
            router.push("/dashboard");
        },

        onError: (err: any) => {
            setError(err.message || "Login failed");
        },
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Email and password are required");
            return;
        }

        loginMutation.mutate({ email, password });
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
            <h2 className="text-2xl font-bold mb-2">Login</h2>

            <input
                className="border rounded p-2"
                type="email"
                name="email"
                autoComplete="email"
                placeholder="Email"
                value={email}
                onInput={e => setEmail(e.target.value)}
            />

            <input
                className="border rounded p-2"
                type="password"
                name="password"
                autoComplete="password"
                placeholder="Password"
                value={password}
                onInput={e => setPassword(e.target.value)}
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button className="bg-blue-600 text-white rounded p-2" type="submit">
                Login
            </button>
        </form>
    );
}