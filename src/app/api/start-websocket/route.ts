// src/app/api/start-websocket/route.ts

import { WebSocketServer } from "ws";
import { startRandomPlayerGenerator } from "../../utils/startGenerateRandomPlayers";

let wss;

export async function POST(req: Request, res: Response) {
  if (!wss) {
    wss = new WebSocketServer({ port: 3001 });

    wss.on("connection", (ws) => {
      console.log("Client connected");

      ws.on("close", () => {
        console.log("Client disconnected");
      });
    });

    startRandomPlayerGenerator((newPlayer) => {
      const data = JSON.stringify({ type: "new-player", payload: newPlayer });
      wss.clients.forEach((client) => {
        if (client.readyState === 1) {
          client.send(data);
        }
      });
    });

    console.log("WebSocket server started on ws://localhost:3001");
  }

  return new Response(
    JSON.stringify({ message: "WebSocket server started" }),
    { status: 200 }
  );
}

export async function GET(req: Request) {
  // You could handle GET requests here if needed
  return new Response(
    JSON.stringify({ message: "WebSocket server is already running" }),
    { status: 200 }
  );
}

export async function DELETE(req: Request) {
  if (wss) {
    // Close WebSocket server
    wss.close(() => {
      console.log("WebSocket server stopped");
    });
    wss = null;

    return new Response(
      JSON.stringify({ message: "WebSocket server stopped" }),
      { status: 200 }
    );
  }

  return new Response(
    JSON.stringify({ message: "WebSocket server is not running" }),
    { status: 400 }
  );
}

