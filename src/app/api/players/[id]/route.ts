import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { validatePlayerData } from "../Validation";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/authOptions";

// GET a single player by ID
export async function GET(req: Request, context: any) {
    const id = parseInt(context.params.id);
    if (isNaN(id)) {
        return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const player = await prisma.player.findUnique({
        where: { id },
        include: { racket: true },
    });

    if (!player) {
        return NextResponse.json({ error: "Player not found" }, { status: 404 });
    }

    return NextResponse.json(player);
}

// UPDATE a player
export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const id = await parseInt(params.id);
    if (isNaN(id)) {
        return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const session = await getServerSession(authOptions);

    const existingPlayer = await prisma.player.findUnique({ where: { id } });
    if (!existingPlayer) {
        return NextResponse.json({ error: "Player not found" }, { status: 404 });
    }

    const body = await req.json();
    const validationError = validatePlayerData(body, id);
    if (validationError) {
        return NextResponse.json({ error: validationError }, { status: 400 });
    }

    // check racket brand exists
    const racketBrandExists = await prisma.racket.findUnique({
        where: { brand_name: body.racket_brand },
    });

    if (!racketBrandExists) {
        return NextResponse.json({ error: "Racket brand not found" }, { status: 404 });
    }

    const updatedPlayer = await prisma.player.update({
        where: { id },
        data: {
            name: body.name,
            country: body.country,
            date_of_birth: new Date(body.date_of_birth),
            ranking: body.ranking,
            number_of_titles: body.number_of_titles,
            handedness: body.handedness,
            imageUrl: body.imageUrl,
            racket_brand: body.racket_brand,
        },
        include: { racket: true },
    });

    await prisma.log.create({
        data: {
            userId: Number(session.user.id),
            action: "UPDATE",
            createdAt: new Date(),
        },
    });

    return NextResponse.json({ message: "Player updated", player: updatedPlayer });
}


// DELETE a player
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    const id = await parseInt(params.id);
    if (isNaN(id)) {
        return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const session = await getServerSession(authOptions);

    try {
        await prisma.player.delete({ where: { id } });
        await prisma.log.create({
            data: {
                userId: Number(session.user.id),
                action: "DELETE",
                createdAt: new Date(),
            },
        });
        return NextResponse.json({ message: "Player deleted" });
    } catch (error) {
        return NextResponse.json({ error: "Player not found" }, { status: 404 });
    }
}

