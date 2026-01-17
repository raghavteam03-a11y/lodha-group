import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const { userId, amount, recharge, income, remark } = await request.json()

        if (!userId) {
            return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
        }

        // Use a transaction to update balance and create history record
        const result = await prisma.$transaction(async (tx) => {
            const user = await tx.user.findUnique({
                where: { id: userId }
            })

            if (!user) {
                throw new Error('User not found')
            }

            const updateData: any = {}

            if (amount !== undefined) {
                const numericAmount = parseFloat(amount)
                if (!isNaN(numericAmount)) {
                    const prevBalance = user.balance
                    const newBalance = prevBalance + numericAmount
                    updateData.balance = newBalance

                    await tx.balanceHistory.create({
                        data: {
                            userId,
                            amount: numericAmount,
                            prevBalance,
                            newBalance,
                            remark: remark || `Added ${numericAmount} to balance`
                        }
                    })
                }
            }

            if (recharge !== undefined) {
                const numericRecharge = parseFloat(recharge)
                if (!isNaN(numericRecharge)) {
                    updateData.recharge = numericRecharge
                }
            }

            if (income !== undefined) {
                const numericIncome = parseFloat(income)
                if (!isNaN(numericIncome)) {
                    updateData.income = numericIncome
                }
            }

            const updatedUser = await tx.user.update({
                where: { id: userId },
                data: updateData
            })

            return { updatedUser }
        })

        return NextResponse.json(result)
    } catch (error: any) {
        console.error('Update balance error:', error)
        return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
    }
}
