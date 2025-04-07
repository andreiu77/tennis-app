import { NextResponse } from "next/server";
import { getPlayerById, updatePlayer, deletePlayer, getAllPlayers } from "../data";
import { validatePlayerData } from "../Validation";

// GET a single player by ID
export async function GET(req: Request, context: { params: { id: string } }) {
    const { id } = await context.params;
    const player = getPlayerById(parseInt(id));
    if (!player) return NextResponse.json({ error: "Player not found" }, { status: 404 });
    return NextResponse.json(player);
}

// UPDATE a player
export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const body = await req.json();
    const { id } = await params;
    if (getPlayerById(parseInt(id)) === undefined){
        return NextResponse.json({ error: "Player not found" }, { status: 404 });
        // just for testing
        // return new Response(
        //     JSON.stringify({ error: "Player not found" }),
        //     { status: 404 }
        // );
    }
    const validationError = validatePlayerData(body, parseInt(id));
    if (validationError){
        return NextResponse.json({ error: validationError }, { status: 400 });
        // just for testing
        // return new Response(
        //     JSON.stringify({ error: "Player not found" }),
        //     { status: 404 }
        // );
    }
    const updatedPlayer = updatePlayer(parseInt(id), body);
    return NextResponse.json({ message: "Player updated", player: updatedPlayer });
    // just for testing
    // return new Response(
    //     JSON.stringify({ message: "Player updated", player: updatedPlayer }),
    //     { status: 200 }
    // );
}

// DELETE a player
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    // Validation
    if (!params.id || isNaN(parseInt(params.id)) || getPlayerById(parseInt(params.id)) === undefined) {
        return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }
    const deleted = deletePlayer(parseInt(params.id));
    if (!deleted) return NextResponse.json({ error: "Player not found" }, { status: 404 });
    return NextResponse.json({ message: "Player deleted" });
}
