import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth-utils';
import prisma from '@/lib/prisma';

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const user = await getCurrentUser();
        if (!user || user.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        const { status } = await req.json();

        if (!['APPROVED', 'DECLINED'].includes(status)) {
            return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
        }

        const withdrawal = await prisma.withdrawal.findUnique({
            where: { id },
            include: { user: true },
        });

        if (!withdrawal) {
            return NextResponse.json({ error: 'Withdrawal not found' }, { status: 404 });
        }

        if (withdrawal.status !== 'PENDING') {
            return NextResponse.json({ error: 'Withdrawal already processed' }, { status: 400 });
        }

        if (status === 'APPROVED') {
            if (withdrawal.user.balance < withdrawal.amount) {
                return NextResponse.json({ error: 'User has insufficient balance' }, { status: 400 });
            }

            // Use a transaction to update user balance and withdrawal status
            await prisma.$transaction([
                prisma.user.update({
                    where: { id: withdrawal.userId },
                    data: {
                        balance: { decrement: withdrawal.amount },
                    },
                }),
                prisma.fundHistory.create({
                    data: {
                        userId: withdrawal.userId,
                        type: 'BALANCE',
                        amount: -withdrawal.amount,
                        prevValue: withdrawal.user.balance,
                        newValue: withdrawal.user.balance - withdrawal.amount,
                        remark: `Withdrawal processed (ID: ${withdrawal.id})`,
                    },
                }),
                prisma.withdrawal.update({
                    where: { id },
                    data: { status: 'APPROVED' },
                }),
            ]);
        } else {
            await prisma.withdrawal.update({
                where: { id },
                data: { status: 'DECLINED' },
            });
        }

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error('API /api/admin/withdrawal PATCH error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
