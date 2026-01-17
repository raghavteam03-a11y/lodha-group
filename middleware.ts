import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import * as jose from 'jose'

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET || 'your-default-secret')

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value
    const { pathname } = request.nextUrl

    // Public routes for everyone
    const isPublicRoute = pathname === '/login' || pathname === '/signup'

    // Admin routes
    const isAdminRoute = pathname.startsWith('/admin')
    const isAdminLoginRoute = pathname === '/admin/login'

    // 1. Handle Admin Routes
    if (isAdminRoute && !isAdminLoginRoute) {
        if (!token) {
            return NextResponse.redirect(new URL('/admin/login', request.url))
        }

        try {
            const { payload } = await jose.jwtVerify(token, SECRET_KEY)
            if (payload.role !== 'admin') {
                return NextResponse.redirect(new URL('/login', request.url))
            }
        } catch (err) {
            return NextResponse.redirect(new URL('/admin/login', request.url))
        }
    }

    // 2. Handle Regular User Routes
    if (!token) {
        // Not logged in and trying to access protected user routes
        if (!isPublicRoute && !isAdminRoute && pathname !== '/') {
            // For now, let's keep the user's existing logic for home route
            // isHomeRoute in their previous code was just '/'
        }

        if (pathname === '/') {
            return NextResponse.redirect(new URL('/login', request.url))
        }
    } else {
        // Logged in
        if (isPublicRoute || isAdminLoginRoute) {
            // Redirect to appropriate dashboard
            try {
                const { payload } = await jose.jwtVerify(token, SECRET_KEY)
                if (payload.role === 'admin') {
                    return NextResponse.redirect(new URL('/admin/balance', request.url))
                }
                return NextResponse.redirect(new URL('/', request.url))
            } catch (err) {
                // If token invalid, proceed to login
                return NextResponse.next()
            }
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
}
