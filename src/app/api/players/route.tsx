import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"
import { validatePlayerData } from "./Validation";


// GET all players
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q")?.toLowerCase() || "";
    const sortParam = searchParams.get("sort") || "ranking-asc";
    const sortDirection = sortParam.endsWith("desc") ? "desc" : "asc";

    const players = await prisma.player.findMany({
        where: query
            ? {
                  name: {
                      contains: query,
                      mode: "insensitive",
                  },
              }
            : undefined,
        orderBy: {
            ranking: sortDirection,
        },
        include: {
            racket: true,
        },
    });

    //return NextResponse.json(players);
    //just for testing
    return new Response(JSON.stringify(players), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}

// ADD a new player
export async function POST(req: Request) {
    const body = await req.json();
    // Validation
    const validationError = validatePlayerData(body);
    if (validationError){
        return NextResponse.json({ error: validationError }, { status: 400 });
        // just for testing
        // return new Response(
        //     JSON.stringify({ error: "Player not found" }),
        //     { status: 404 }
        // );
    }
    // Add player
    try {
        const newPlayer = await prisma.player.create({
            data: {
                name: body.name,
                country: body.country,
                date_of_birth: new Date(body.date_of_birth),
                ranking: body.ranking,
                number_of_titles: body.number_of_titles,
                handedness: body.handedness,
                imageUrl: body.imageUrl,
                racket_brand: body.racketBrand,
            },
        });
        return NextResponse.json({ message: "Player added", player: newPlayer });
    } catch (err) {
        return NextResponse.json(
            { error: "Failed to create player", details: err },
            { status: 500 }
        );
    }
}