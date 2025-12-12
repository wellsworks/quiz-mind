"use client";

import Link from "next/link";

export default function Navbar() {
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
            </div>
        </nav>
    );
}