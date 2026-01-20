import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth-utils';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const user = await getCurrentUser();
        console.log('POST /api/withdrawal - User:', user?.id, user?.mobile);

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { amount, bankDetails } = await req.json();
        const withdrawAmt = parseFloat(amount);
        console.log('POST /api/withdrawal - Request:', { amount: withdrawAmt, bankDetails });

        if (isNaN(withdrawAmt) || withdrawAmt < 1000) {
            return NextResponse.json({ error: 'Minimum withdrawal is ₹1000' }, { status: 400 });
        }

        if (withdrawAmt > user.balance) {
            return NextResponse.json({ error: 'Insufficient balance' }, { status: 400 });
        }

        const withdrawal = await prisma.withdrawal.create({
            data: {
                userId: user.id,
                amount: withdrawAmt,
                status: 'PENDING',
                bankDetails: bankDetails || {},
            },
        });

        console.log('POST /api/withdrawal - Created withdrawal:', withdrawal.id, withdrawal.status);
        return NextResponse.json({ success: true, withdrawal }, { status: 201 });
    } catch (error) {
        console.error('API /api/withdrawal POST error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const withdrawals = await prisma.withdrawal.findMany({
            where: { userId: user.id },
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json({ withdrawals }, { status: 200 });
    } catch (error) {
        console.error('API /api/withdrawal GET error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
