import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { validatePlayerData } from "../Validation";

// GET a single player by ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
    const id = parseInt(params.id);
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
    const id = parseInt(params.id);
    if (isNaN(id)) {
        return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const existingPlayer = await prisma.player.findUnique({ where: { id } });
    if (!existingPlayer) {
        return NextResponse.json({ error: "Player not found" }, { status: 404 });
    }

    const body = await req.json();
    const validationError = validatePlayerData(body, id);
    if (validationError) {
        return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const updatedPlayer = await prisma.player.update({
        where: { id },
        data: {
            ...body,
            date_of_birth: new Date(body.date_of_birth),
        },
    });

    return NextResponse.json({ message: "Player updated", player: updatedPlayer });
}


// DELETE a player
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    const id = parseInt(params.id);
    if (isNaN(id)) {
        return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    try {
        await prisma.player.delete({ where: { id } });
        return NextResponse.json({ message: "Player deleted" });
    } catch (error) {
        return NextResponse.json({ error: "Player not found" }, { status: 404 });
    }
}

