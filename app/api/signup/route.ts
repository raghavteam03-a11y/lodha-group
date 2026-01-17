import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const { mobile, password, fullName } = await request.json()

        if (!mobile || !password) {
            return NextResponse.json({ error: 'Mobile number and password are required' }, { status: 400 })
        }

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { mobile }
        })

        if (existingUser) {
            return NextResponse.json({ error: 'User already exists' }, { status: 400 })
        }

        const user = await prisma.user.create({
            data: {
                mobile,
                password, // Plain text
                fullName,
            },
            select: {
                id: true,
                mobile: true,
                fullName: true,
                role: true,
            }
        })

        return NextResponse.json({ user }, { status: 201 })
    } catch (error) {
        console.error('Signup API error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
