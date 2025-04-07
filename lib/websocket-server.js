import { WebSocketServer } from "ws";
import { startRandomPlayerGenerator } from "../src/app/utils/startGenerateRandomPlayers.js";

// Initialize WebSocket server only once
let wss;
let stopPlayerGeneration = false;  // Flag to stop player generation

export function startWebSocketServer() {
  if (!wss) {
    wss = new WebSocketServer({ port: 3001 });

    wss.on("connection", (ws) => {
      console.log("Client connected");

      // Listen for close event to handle client disconnection
      ws.on("close", () => {
        console.log("Client disconnected");
      });
    });

    // Start the random player generator and broadcast to all connected clients
    startRandomPlayerGenerator((newPlayer) => {
      if (!stopPlayerGeneration) {  // Check if generation is stopped
        const data = JSON.stringify({ type: "new-player", payload: newPlayer });
        wss.clients.forEach((client) => {
          if (client.readyState === 1) {  // ReadyState = 1 means the connection is open
            client.send(data);
          }
        });
      }
    });

    console.log("WebSocket server started on ws://localhost:3001");
  }
}

export function stopWebSocketServer() {
  if (wss) {
    // Stop player generation when the WebSocket server is stopped
    stopPlayerGeneration = true;

    wss.clients.forEach((client) => {
      client.close();  // Close all connections
    });

    wss.close(() => {
      console.log("WebSocket server stopped");
    });
  }
}
