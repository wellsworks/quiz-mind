"use client";

import { useState } from "react";
import { useLogin } from "@/lib/hooks/auth";
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
import { Checkbox } from "./ui/checkbox";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);
    const [error, setError] = useState("");

    const login = useLogin();

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        login.mutate({ email, password, remember },
            {
                onError: (err: any) => {
                    setError(err.message || "Login failed");
                }
            }
        );
    }

    return (
        <form onSubmit={handleSubmit} className={cn("flex flex-col gap-6")}>
            <FieldGroup>
                <div className="flex flex-col items-center gap-2 text-center">
                    <h1 className="text-2xl font-bold">Login to your account</h1>
                    <p className="text-muted-foreground text-sm text-balance">
                        Enter your information below to login to your account
                    </p>
                </div>
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
                <Field orientation="horizontal">
                    <Checkbox
                        id="remember-me"
                        name="remember-me"
                        onCheckedChange={() => setRemember}
                    />
                    <FieldLabel htmlFor="remember-me">Remember Me</FieldLabel>
                </Field>
                <Field>
                    <Button type="submit">Login</Button>
                    <FieldDescription className="text-center">
                        Don&apos;t have an account?
                        <Link href="/register"> Sign up</Link>
                    </FieldDescription>
                </Field>

                <Field>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                </Field>
            </FieldGroup>
        </form>
    );
}