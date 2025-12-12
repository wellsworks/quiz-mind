"use client";

import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import { useUser, useLogout } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/ui";

export default function Navbar() {
    useUser();
    const user = useAuthStore((s) => s.user);
    const logout = useLogout();
    const router = useRouter();

    const handleLogout = () => {
        logout.mutate(undefined, {
            onSuccess: () => {
                router.push("/login");
            },
        });
    };

    return (
        <nav className="border-b bg-background/80 backdrop-blur">
            <div className="container mx-auto flex items-center justify-between py-4 px-4">

                <div className="flex items-center gap-6">
                    <Link href="/" className="font-bold text-lg">
                        Quiz Mind
                    </Link>

                    <div className="hidden md:flex gap-4 text-sm">
                        <Link href="/dashboard" className="hover:underline">
                            Dashboard
                        </Link>
                    </div>

                    <div className="hidden md:flex gap-4 text-sm">
                        <Link href="/notes" className="hover:underline">
                            Notes
                        </Link>
                    </div>
                </div>

                <div className="flex items-center-gap-3">
                    <ThemeToggle />

                    {!user ? (
                        <Link href="/login">
                            <button>Login</button>
                        </Link>
                    ) : ( 
                        <button onClick={handleLogout}>
                            Logout
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}