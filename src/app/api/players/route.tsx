import { NextResponse } from "next/server";
import { getAllPlayers, addPlayer } from "./data";
import { validatePlayerData } from "./Validation";


// GET all players
export async function GET(req: Request) {
    const players = getAllPlayers();
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q")?.toLowerCase() || "";
    const sort = searchParams.get("sort") || "asc";

    let filteredPlayers = players;

    if (query) {
        filteredPlayers = players.filter(player => {
            return player.name.toLowerCase().includes(query);
        });
    }

    if (sort === "asc") {
        filteredPlayers.sort((a, b) => a.ranking - b.ranking);
    } else if (sort === "desc") {
        filteredPlayers.sort((a, b) => b.ranking - a.ranking);
    }

    //return NextResponse.json(filteredPlayers);
    //just for testing
    return new Response(JSON.stringify(filteredPlayers), {
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
    const newPlayer = addPlayer(body);
    return NextResponse.json({ message: "Player added", player: newPlayer });
    // just for testing
    // return new Response(
    //     JSON.stringify({ message: "Player added", player: newPlayer }),
    //     { status: 200 }
    // );
}