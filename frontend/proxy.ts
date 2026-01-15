import { NextResponse, NextRequest } from "next/server";

const protectedPrefixes = [
    '/dashboard', 
    '/notes', 
    '/flashcards', 
    '/test', 
    '/test-ssr'
];

const publicPrefixes = [
    '/login', 
    '/register', 
    '/'
];

export default function proxy(req: NextRequest) {
    const cookie = req.cookies.get("better-auth.session_token");
    const { pathname } = req.nextUrl;

    const isProtected = protectedPrefixes.some(prefix => 
        pathname.startsWith(prefix)
    );

    const isPublic = publicPrefixes.some(prefix => 
        pathname === prefix
    );

    // User is not loggen in -> redirect to login
    if (isProtected && !cookie) {
        const loginUrl = new URL('/login', req.url);
        return NextResponse.redirect(loginUrl);
    }

    // User is logged in and tries to access login/register -> redirect to dashboard
    if (cookie && isPublic) {
        const dashboardUrl = new URL('/dashboard', req.url);
        return NextResponse.redirect(dashboardUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/notes/:path*',
        '/flashcards/:path*',
        '/test',
        '/test-ssr',
    ],
};