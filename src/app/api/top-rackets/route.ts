import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        /*
        Top 10 racket brands with the most players:
        SELECT racket_brand, COUNT(*) as player_count
        FROM Player
        GROUP BY racket_brand
        ORDER BY player_count DESC
        LIMIT 10;
        */
        const topRacketBrands = await prisma.player.groupBy({
            by: ['racket_brand'],
            _count: { racket_brand: true },
            orderBy: { _count: { racket_brand: 'desc' } },
            take: 10,
        });
        return NextResponse.json(topRacketBrands);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch top racket brands' }, { status: 500 });
    }
}
