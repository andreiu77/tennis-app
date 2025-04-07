"use client";

import PlayerPieChart from "../components/statistics-charts/PlayerPieChart";
import { useState, useEffect } from "react";
import PlayerLineChart from "../components/statistics-charts/PlayerBarChart";

import "./statistics-page.css";
import { Player } from "../api/players/data";
import usePlayerWebSocket from "../../../hooks/usePlayerWebSocket";

export default function StatisticsPage() {
    const [players, setPlayers] = useState<Player[]>();
    const [loading, setLoading] = useState(true);
    const [websocketStarted, setWebsocketStarted] = useState(false);  // Track WebSocket server status


    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const res = await fetch("/api/players");
                const data = await res.json();
                setPlayers(data);
            } catch (error) {
                console.error("Failed to fetch players:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPlayers();
    }, []);

    usePlayerWebSocket((newPlayer) => {
        setPlayers((prev) => [...prev, newPlayer]);
    });

    const startWebSocketServer = async () => {
        try {
            const res = await fetch("/api/start-websocket", {
                method: "POST", // Trigger WebSocket server start with POST request
            });

            if (res.ok) {
                setWebsocketStarted(true);  // Track that WebSocket server has started
                console.log("WebSocket server started");
            } else {
                console.error("Failed to start WebSocket server:", res.statusText);
            }
        } catch (error) {
            console.error("Error starting WebSocket server:", error);
        }
    };

    const stopWebSocketServer = async () => {
        try {
          const res = await fetch("/api/start-websocket", {
            method: "DELETE", // Trigger WebSocket server stop with DELETE request
          });
    
          if (res.ok) {
            setWebsocketStarted(false); // Update WebSocket server status
            console.log("WebSocket server stopped");
          } else {
            console.error("Failed to stop WebSocket server:", res.statusText);
          }
        } catch (error) {
          console.error("Error stopping WebSocket server:", error);
        }
      };

    return (
        <div>
            <h1>Statistics</h1>
            <button onClick={startWebSocketServer} disabled={websocketStarted}>
                {websocketStarted ? "WebSocket Server Running" : "Start WebSocket Server"}
            </button>
            <button onClick={stopWebSocketServer} disabled={!websocketStarted}>
                Stop WebSocket Server
            </button>
            <PlayerPieChart players={players} />
            <PlayerLineChart players={players} />
        </div>
    );
}
