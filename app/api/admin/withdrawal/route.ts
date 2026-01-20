import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth-utils';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const user = await getCurrentUser();
        if (!user || user.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        console.log('user', user);
        const withdrawals = await prisma.withdrawal.findMany({
            include: {
                user: {
                    select: {
                        mobile: true,
                        fullName: true,
                        balance: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json({ withdrawals }, { status: 200 });
    } catch (error) {
        console.error('API /api/admin/withdrawal GET error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
