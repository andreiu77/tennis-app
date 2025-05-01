import { generateRandomPlayer } from "./generateRandomPlayer.js";

let intervalId = null;

export function startRandomPlayerGenerator(sendToClients) {
  if (intervalId) return; // Prevent multiple intervals

  intervalId = setInterval(async () => {
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
  }, 5000); 
}

export function stopRandomPlayerGenerator() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
    console.log("Stopped random player generation.");
  }
}
