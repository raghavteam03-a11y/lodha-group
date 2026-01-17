import { NextResponse } from 'next/server'

export async function POST() {
    const response = NextResponse.json({ message: 'Admin logged out successfully' }, { status: 200 })

    // Clear cookies
    const isProd = process.env.NODE_ENV === 'production'
    response.cookies.set({
        name: 'token',
        value: '',
        httpOnly: true,
        secure: isProd,
        sameSite: 'strict',
        path: '/',
        maxAge: 0,
    })

    return response
}
