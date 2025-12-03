import { cookies } from "next/headers";

export default async function getCurrentUserSSR() {
    const cookieStore = await cookies();
    const cookie = cookieStore.get("access_token");

    if (!cookie) return null;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
        method: "GET",
        credentials: "include",
        headers: {
            Cookie: `access_token=${cookie.value}`,
        },
        cache: "no-store",
    });

    if (!res.ok) return null;

    return res.json();
}