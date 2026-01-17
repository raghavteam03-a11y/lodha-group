import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import jwt from 'jsonwebtoken'

const SECRET_KEY = process.env.JWT_SECRET || 'your-default-secret'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { mobile, password } = body

        if (!mobile || !password) {
            return NextResponse.json({ error: 'Mobile number and password are required' }, { status: 400 })
        }

        let user = await prisma.user.findUnique({
            where: { mobile },
        })

        // Auto-seed admin if it doesn't exist and credentials match
        if (!user && mobile === 'admin@gmail.com' && password === 'admin-master') {
            user = await prisma.user.create({
                data: {
                    mobile,
                    password,
                    role: 'admin',
                    fullName: 'System Administrator'
                }
            })
        }

        if (!user || user.password !== password) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
        }

        if (user.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized access' }, { status: 403 })
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
                message: 'Admin login successful',
                user: { id: user.id, mobile: user.mobile, fullName: user.fullName, role: user.role },
                token,
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

        return response
    } catch (error) {
        console.error('Admin Login API error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
