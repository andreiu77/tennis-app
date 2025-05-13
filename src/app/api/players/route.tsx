import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"
import { validatePlayerData } from "./Validation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";

// GET all players
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q")?.toLowerCase() || "";
    const sortParam = searchParams.get("sort") || "ranking-asc";
    const sortDirection = sortParam.endsWith("desc") ? "desc" : "asc";

    const session = await getServerSession(authOptions);

    if(!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const players = await prisma.player.findMany({
        where: {
            userId: Number(session?.user.id),
            ...(query && {
                name: {
                    contains: query,
                    mode: "insensitive",
                },
            }),
        },
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
    const session = await getServerSession(authOptions);

    // check racket brand exists
    const racketBrandExists = await prisma.racket.findUnique({
        where: { brand_name: body.racket_brand },
    });
    
    if (!racketBrandExists) {
        return NextResponse.json({ error: "Racket brand not found" }, { status: 404 });
    }

    try {
        const newPlayer = await prisma.player.create({
            data: {
              name: body.name,
              country: body.country,
              date_of_birth: new Date(body.date_of_birth),
              ranking: body.ranking,
              number_of_titles: body.number_of_titles,
              handedness: body.handedness,
              imageUrl: body.imageUrl || "",
              userId: Number(session.user.id),
              racket_brand: body.racket_brand,
            },
          });

        await prisma.log.create({
            data: {
                userId: Number(session.user.id),
                action: "ADD",
                createdAt: new Date(),
            },
        });
          
        return NextResponse.json({ message: "Player added", player: newPlayer });
    } catch (err) {
        console.error("Error creating player:", err);
        return NextResponse.json(
            { error: "Failed to create player", details: err },
            { status: 500 }
        );
    }
}