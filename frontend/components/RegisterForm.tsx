"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useRegister } from "@/lib/hooks/auth";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "./ui/input";
import Link from "next/link";

export default function RegisterForm() {
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const register = useRegister();

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);

        register.mutate({ name, email, password },
            {
                onSuccess: () => {
                    router.push("/dashboard");
                },
                onError: (err: any) => {
                    setError(err.message || "Registration failed")
                },
            }
        );
    }

    return (
        <form onSubmit={handleSubmit} className={cn("flex flex-col gap-6")}>
            <FieldGroup>
                <div className="flex flex-col items-center gap-2 text-center">
                    <h1 className="text-2xl font-bold">Sign up for an account</h1>
                    <p className="text-muted-foreground text-sm text-balance">
                        Enter your email and password to sign up
                    </p>
                </div>
                <Field>
                    <FieldLabel htmlFor="name">Name</FieldLabel>
                    <Input
                        id="name"
                        className="border rounded p-2"
                        name="name"
                        type="text"
                        autoComplete="name"
                        placeholder="My Name"
                        required
                        value={name}
                        onInput={e => setName(e.target.value)}
                    />
                </Field>
                <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                        id="email"
                        className="border rounded p-2"
                        type="email"
                        name="email"
                        autoComplete="email"
                        placeholder="me@example.com"
                        required
                        value={email}
                        onInput={e => setEmail(e.target.value)}
                    />
                </Field>
                <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                        id="password"
                        className="border rounded p-2"
                        type="password"
                        name="password"
                        autoComplete="password"
                        placeholder="Password"
                        required
                        value={password}
                        onInput={e => setPassword(e.target.value)}
                    />
                </Field>
                <Field>
                    <Button type="submit">Sign up</Button>
                    <FieldDescription className="text-center">
                        Already have an account?
                        <Link href="/login"> Login</Link>
                    </FieldDescription>
                </Field>
                <Field>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                </Field>
            </FieldGroup>
        </form>
    );
}