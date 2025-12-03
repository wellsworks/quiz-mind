//connect to backend to fetch user notes/flashcards

import Link from "next/link";
import  getCurrentUserSSR  from "@/lib/server-auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    const user = await getCurrentUserSSR();

    if (!user) redirect("/login");

    // call backend with fetch to retrieve dashboard data

    return (
        <main className="p-8">
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

            // replace placeholders with real components 
            <section className="space-y-4">
                <p>Logged in as: {user.email}</p>
                <p>Welcome back! Here is your study data:</p>

                <div className="flex gap-4">
                    <Link href="/notes" className="underline text-blue-600">
                        View Notes
                    </Link>
                    <Link href="/flashcards" className="underline text-blue-600">
                        View Flashcards
                    </Link>
                </div>
            </section>
        </main>
    );
}