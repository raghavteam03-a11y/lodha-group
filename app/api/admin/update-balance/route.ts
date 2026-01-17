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
                    const prevValue = user.balance
                    const newValue = prevValue + numericAmount
                    updateData.balance = newValue

                    await tx.fundHistory.create({
                        data: {
                            userId,
                            type: 'BALANCE',
                            amount: numericAmount,
                            prevValue,
                            newValue,
                            remark: remark || `Added ${numericAmount} to balance`
                        }
                    })
                }
            }

            if (recharge !== undefined) {
                const numericRecharge = parseFloat(recharge)
                if (!isNaN(numericRecharge)) {
                    const prevValue = user.recharge || 0
                    const newValue = prevValue + numericRecharge
                    updateData.recharge = newValue

                    await tx.fundHistory.create({
                        data: {
                            userId,
                            type: 'RECHARGE',
                            amount: numericRecharge,
                            prevValue,
                            newValue,
                            remark: remark || `Added ${numericRecharge} to recharge`
                        }
                    })
                }
            }

            if (income !== undefined) {
                const numericIncome = parseFloat(income)
                if (!isNaN(numericIncome)) {
                    const prevValue = user.income || 0
                    const newValue = prevValue + numericIncome
                    updateData.income = newValue

                    await tx.fundHistory.create({
                        data: {
                            userId,
                            type: 'INCOME',
                            amount: numericIncome,
                            prevValue,
                            newValue,
                            remark: remark || `Added ${numericIncome} to income`
                        }
                    })
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
