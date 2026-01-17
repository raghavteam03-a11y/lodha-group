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
    if (isAdminRoute) {
        if (!token) {
            if (!isAdminLoginRoute) {
                return NextResponse.redirect(new URL('/admin/login', request.url))
            }
            return NextResponse.next()
        }

        // Token exists, redirect away from login if admin
        if (isAdminLoginRoute) {
            try {
                const { payload } = await jose.jwtVerify(token, SECRET_KEY)
                if (payload.role === 'admin') {
                    return NextResponse.redirect(new URL('/admin/balance', request.url))
                }
            } catch (err) {
                return NextResponse.next()
            }
        }

        // Verify admin permissions for protected routes
        try {
            const { payload } = await jose.jwtVerify(token, SECRET_KEY)
            if (payload.role !== 'admin') {
                return NextResponse.redirect(new URL('/login', request.url))
            }
        } catch (err) {
            return NextResponse.redirect(new URL('/admin/login', request.url))
        }
    }

    // 2. Handle User Routes (Non-admin)
    if (!isAdminRoute) {
        if (!token) {
            if (!isPublicRoute) {
                return NextResponse.redirect(new URL('/login', request.url))
            }
            return NextResponse.next()
        }

        // Token exists, redirect away from public pages
        if (isPublicRoute) {
            try {
                const { payload } = await jose.jwtVerify(token, SECRET_KEY)
                if (payload.role === 'admin') {
                    return NextResponse.redirect(new URL('/admin/balance', request.url))
                }
                return NextResponse.redirect(new URL('/', request.url))
            } catch (err) {
                return NextResponse.next()
            }
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
}
