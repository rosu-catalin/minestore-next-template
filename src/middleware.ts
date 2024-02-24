import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token');

    // Base redirects:
    if (!token && !request.url.endsWith('/auth')) {
        console.log('No token, redirecting to /auth');
        return NextResponse.redirect(new URL('/auth', request.url));
    }

    // Handle token on /auth:
    if (request.url.endsWith('/auth') && token) {
        console.log('Token present on /auth, redirecting to home');
        return NextResponse.redirect(new URL('/', request.url));
    }

    // Protected routes check (optional):
    if (request.url.match(/^\/(categories|checkout|profile)(\?.*)?$/) && !token) {
        console.log('Missing token for protected route, redirecting to /auth');
        return NextResponse.redirect(new URL('/auth', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/categories/:path*', '/checkout', '/profile', '/auth']
};
