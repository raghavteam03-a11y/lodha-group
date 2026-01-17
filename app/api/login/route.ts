import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import jwt from 'jsonwebtoken'
import { randomUUID } from 'crypto'

const SECRET_KEY = process.env.JWT_SECRET || 'your-default-secret'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { mobile, password } = body

        if (!mobile || !password) {
            return NextResponse.json({ error: 'Mobile number and password are required' }, { status: 400 })
        }

        const user = await prisma.user.findUnique({
            where: { mobile },
        })

        if (!user || user.password !== password) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
        }

        // Sign token
        const token = jwt.sign(
            {
                userId: user.id,
                mobile: user.mobile,
                role: user.role,
            },
            SECRET_KEY,
            { expiresIn: '1y' }
        )

        const response = NextResponse.json(
            {
                message: 'Login successful',
                user: { id: user.id, mobile: user.mobile, fullName: user.fullName },
                token,
                userId: user.id,
            },
            { status: 200 }
        )

        // Set cookies
        const isProd = process.env.NODE_ENV === 'production'
        response.cookies.set({
            name: 'token',
            value: token,
            httpOnly: true,
            secure: isProd,
            sameSite: 'strict',
            path: '/',
            maxAge: 60 * 60 * 24 * 365,
        })

        response.cookies.set({
            name: 'userId',
            value: user.id,
            httpOnly: true,
            secure: isProd,
            sameSite: 'strict',
            path: '/',
            maxAge: 60 * 60 * 24 * 365,
        })

        return response
    } catch (error) {
        console.error('Login API error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
