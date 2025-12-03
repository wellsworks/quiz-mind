import { NextResponse, NextRequest } from "next/server";

const protectedRoutes = ['/dashboard', '/notes/', '/flashcards/']
const publicRoutes = ['/login', '/register', '/']

export default function proxy(req: NextRequest) {
    const cookie = req.cookies.get("access_token");
    const path = req.nextUrl.pathname
    const isProtectedRoute = protectedRoutes.includes(path)
    const isPublicRoute = publicRoutes.includes(path)

    if (isProtectedRoute && !cookie) {
        return NextResponse.redirect(new URL('/login', req.nextUrl))
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/notes/:path*',
        '/flashcards/:path*',
        '/test',
    ],
};