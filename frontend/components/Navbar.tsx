import Link from "next/link";

export function Navbar() {
    return (
        <nav className="p-4 border-b flex items-center justify-between">
            <Link href="/" className="font-bold text-lg">
                Quiz Mind
            </Link>
            <div className="space-x-4">
                <Link href="/dashboard" className="hover:underline">
                    Dashboard
                </Link>
                <Link href="/notes" className="hover:underline">
                    Notes
                </Link>
                <Link href="/flashcards" className="hover:underline">
                    Flashcards
                </Link>
            </div>
        </nav>
    );
}