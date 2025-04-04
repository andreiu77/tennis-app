import { Player } from "../api/players/data";

const API_BASE = "/api/players";

export const fetchPlayers = async (searchQuery = "", sortOrder = ""): Promise<Player[]> => {
    const res = await fetch(`${API_BASE}?q=${searchQuery}&sort=${sortOrder}`);
    if (!res.ok) throw new Error("Failed to fetch players");
    return res.json();
};

export const addPlayer = async (player: Partial<Player>): Promise<Player> => {
    const res = await fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(player),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to add player");
    return data.player;
};

export const deletePlayer = async (id: number): Promise<void> => {
    const res = await fetch(`${API_BASE}/${id}`, {
        method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete player");
};

export const updatePlayer = async (id: number, player: Partial<Player>): Promise<Player> => {
    const res = await fetch(`${API_BASE}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(player),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to update player");
    return data;
};
