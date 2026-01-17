import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        const users = await prisma.user.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                balanceHistory: {
                    orderBy: {
                        createdAt: 'desc'
                    },
                    take: 5
                }
            }
        })

        return NextResponse.json({ users })
    } catch (error) {
        console.error('Fetch users error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
