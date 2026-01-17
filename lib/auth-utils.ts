import { cookies } from 'next/headers'
import prisma from '@/lib/prisma'
import { verifyToken } from './token-verification'

export async function getCurrentUser() {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get('token')?.value
        const userId = cookieStore.get('userId')?.value

        if (!token || !userId) return null

        const { valid, decoded } = verifyToken(token)

        if (!valid || !decoded || typeof decoded !== 'object' || !('userId' in decoded)) {
            return null
        }

        const decodedUserId = (decoded as any).userId

        if (decodedUserId !== userId) return null

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { id: true, mobile: true, fullName: true, role: true, balance: true },
        })

        return user
    } catch (error) {
        console.error('Error getting current user:', error)
        return null
    }
}
