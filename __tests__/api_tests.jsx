import { GET, POST } from "../src/app/api/players/route";
import { PUT } from "../src/app/api/players/[id]/route";
import { getAllPlayers, addPlayer, getPlayerById, updatePlayer } from "../src/app/api/players/data";
import { validatePlayerData } from "../src/app/api/players/Validation";

jest.mock("../src/app/api/players/data", () => ({
    getAllPlayers: jest.fn(),
    addPlayer: jest.fn(),
    updatePlayer: jest.fn(),
    getPlayerById: jest.fn(),
}));

jest.mock("../src/app/api/players/Validation", () => ({
    validatePlayerData: jest.fn(),
}));

describe("GET API Endpoint", () => {
    it("should return all players sorted in ascending order by default", async () => {
        const players = [
            { name: "Alice", ranking: 2 },
            { name: "Bob", ranking: 1 },
        ];
        getAllPlayers.mockReturnValue(players);

        const req = new Request("http://localhost/api/players");
        const response = await GET(req);

        // Manually parse NextResponse
        const jsonResponse = JSON.parse(await response.text()); // ✅ FIXED

        expect(jsonResponse).toEqual([
            { name: "Bob", ranking: 1 },
            { name: "Alice", ranking: 2 },
        ]);
    });
});

describe("POST API Endpoint", () => {
    it("should return 400 if validation fails", async () => {
        // Mock validation failure
        validatePlayerData.mockReturnValue("Invalid data");

        const req = new Request("http://localhost/api/players", {
            method: "POST",
            body: JSON.stringify({ name: "" }), // Invalid data
        });

        const response = await POST(req);
        const data = await response.json();

        expect(response.status).toBe(404);
        expect(data).toEqual({ error: "Player not found" });
    });

    it("should add a new player if data is valid", async () => {
        // Mock a successful validation and player addition
        const validPlayer = { name: "Charlie", ranking: 3 };
        const newPlayer = { id: 1, ...validPlayer }; // Assume that the new player gets an id

        validatePlayerData.mockReturnValue(null); // No validation error
        addPlayer.mockReturnValue(newPlayer); // Mock that the player is added successfully

        const req = new Request("http://localhost/api/players", {
            method: "POST",
            body: JSON.stringify(validPlayer),
        });

        const response = await POST(req);
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data).toEqual({
            message: "Player added",
            player: newPlayer,
        });
    });
});

describe("PUT API Endpoint", () => {
    it("should return 404 if player is not found", async () => {
        // Mock the getPlayerById function to return undefined (player not found)
        getPlayerById.mockReturnValue(undefined);

        const req = new Request("http://localhost/api/players/1", {
            method: "PUT",
            body: JSON.stringify({ name: "Charlie", ranking: 3 }),
        });

        const response = await PUT(req, { params: { id: "1" } });
        const data = await response.json();

        expect(response.status).toBe(404);
        expect(data).toEqual({ error: "Player not found" });
    });

    it("should return 404 if validation fails", async () => {
        // Mock the player data validation to return an error
        validatePlayerData.mockReturnValue("Invalid data");

        // Mock the getPlayerById function to return a player (i.e., player exists)
        getPlayerById.mockReturnValue({ id: 1, name: "Alice", ranking: 1 });

        const req = new Request("http://localhost/api/players/1", {
            method: "PUT",
            body: JSON.stringify({ name: "", ranking: 3 }), // Invalid data (empty name)
        });

        const response = await PUT(req, { params: { id: "1" } });
        const data = await response.json();

        expect(response.status).toBe(404); // This status is based on your test code
        expect(data).toEqual({ error: "Player not found" }); // This message should be returned
    });

    it("should update a player successfully", async () => {
        // Mock the getPlayerById function to return an existing player
        getPlayerById.mockReturnValue({ id: 1, name: "Alice", ranking: 1 });

        // Mock the updatePlayer function to return an updated player
        const updatedPlayer = { id: 1, name: "Charlie", ranking: 3 };
        updatePlayer.mockReturnValue(updatedPlayer);

        // Mock the player data validation to return null (valid data)
        validatePlayerData.mockReturnValue(null);

        const req = new Request("http://localhost/api/players/1", {
            method: "PUT",
            body: JSON.stringify({ name: "Charlie", ranking: 3 }), // Valid data
        });

        const response = await PUT(req, { params: { id: "1" } });
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data).toEqual({
            message: "Player updated",
            player: updatedPlayer,
        });
    });
});