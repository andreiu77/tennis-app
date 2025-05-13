import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    try {
        const monitoredUsers = await prisma.monitoredUser.findMany({
            include: {
                user: true,
            },
        });
        return NextResponse.json(monitoredUsers, {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error fetching monitored users:', error);
        return NextResponse.json(
            { error: 'Failed to fetch monitored users' },
            { status: 500 }
        );
    }
}
