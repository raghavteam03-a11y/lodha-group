import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const { userId, amount, remark } = await request.json()

        if (!userId || amount === undefined) {
            return NextResponse.json({ error: 'User ID and amount are required' }, { status: 400 })
        }

        const numericAmount = parseFloat(amount)
        if (isNaN(numericAmount)) {
            return NextResponse.json({ error: 'Invalid amount' }, { status: 400 })
        }

        // Use a transaction to update balance and create history record
        const result = await prisma.$transaction(async (tx) => {
            const user = await tx.user.findUnique({
                where: { id: userId }
            })

            if (!user) {
                throw new Error('User not found')
            }

            const prevBalance = user.balance
            const newBalance = prevBalance + numericAmount

            const updatedUser = await tx.user.update({
                where: { id: userId },
                data: {
                    balance: newBalance
                }
            })

            const history = await tx.balanceHistory.create({
                data: {
                    userId,
                    amount: numericAmount,
                    prevBalance,
                    newBalance,
                    remark: remark || `Added ${numericAmount} to balance`
                }
            })

            return { updatedUser, history }
        })

        return NextResponse.json(result)
    } catch (error: any) {
        console.error('Update balance error:', error)
        return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
    }
}
