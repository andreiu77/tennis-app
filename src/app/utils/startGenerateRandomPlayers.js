import { generateRandomPlayer } from "./generateRandomPlayer.js";

export function startRandomPlayerGenerator(sendToClients) {
  setInterval(async () => {
    const newPlayer = generateRandomPlayer();

    const res = await fetch("http://localhost:3000/api/players", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPlayer),
    });

    if (res.ok) {
      const { player } = await res.json();
      console.log("Generated and added player:", player);
      sendToClients(player);
    }
  }, 5000); // Every 5 seconds
}
