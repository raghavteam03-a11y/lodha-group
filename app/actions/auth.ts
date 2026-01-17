'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import prisma from '@/lib/prisma'
import jwt from 'jsonwebtoken'

const SECRET_KEY = process.env.JWT_SECRET || 'your-default-secret'

export async function login(formData: FormData) {
    const mobile = formData.get('mobile') as string
    const password = formData.get('password') as string

    if (!mobile || !password) {
        return { error: 'Mobile number and password are required' }
    }

    try {
        const user = await prisma.user.findUnique({
            where: { mobile },
        })

        if (!user || user.password !== password) {
            return { error: 'Invalid credentials' }
        }

        // Sign token (Simplified: No sessions)
        const token = jwt.sign(
            {
                userId: user.id,
                mobile: user.mobile,
            },
            SECRET_KEY,
            { expiresIn: '1y' }
        )

        const cookieStore = await cookies()
        const isProd = process.env.NODE_ENV === 'production'

        cookieStore.set('token', token, {
            httpOnly: true,
            secure: isProd,
            sameSite: 'strict',
            path: '/',
            maxAge: 60 * 60 * 24 * 365,
        })

        // Setting a simple userId cookie instead of session UUID
        cookieStore.set('userId', user.id, {
            httpOnly: true,
            secure: isProd,
            sameSite: 'strict',
            path: '/',
            maxAge: 60 * 60 * 24 * 365,
        })
    } catch (error) {
        if ((error as any).digest?.startsWith('NEXT_REDIRECT')) throw error
        console.error('Login action error:', error)
        return { error: 'Internal server error' }
    }

    redirect('/')
}

export async function signup(formData: FormData) {
    const mobile = formData.get('mobile') as string
    const password = formData.get('password') as string
    const fullName = formData.get('fullName') as string

    if (!mobile || !password) {
        return { error: 'Mobile number and password are required' }
    }

    try {
        const existingUser = await prisma.user.findUnique({
            where: { mobile }
        })

        if (existingUser) {
            return { error: 'Mobile number already registered' }
        }

        await prisma.user.create({
            data: {
                mobile,
                password, // Plain text as requested
                fullName,
            },
        })
    } catch (error) {
        if ((error as any).digest?.startsWith('NEXT_REDIRECT')) throw error
        console.error('Signup action error:', error)
        return { error: 'Internal server error' }
    }

    redirect('/login')
}

export async function logout() {
    const cookieStore = await cookies()
    cookieStore.set('token', '', { maxAge: 0 })
    cookieStore.set('userId', '', { maxAge: 0 })
    redirect('/')
}
