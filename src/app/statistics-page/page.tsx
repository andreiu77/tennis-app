"use client";

import PlayerPieChart from "../components/statistics-charts/PlayerPieChart";
import { useState, useEffect } from "react";
import PlayerLineChart from "../components/statistics-charts/PlayerBarChart";

import "./statistics-page.css";

export default function StatisticsPage() {
    const [playersData, setPlayersData] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const res = await fetch("/api/players");
                const data = await res.json();
                setPlayersData(data);
            } catch (error) {
                console.error("Failed to fetch players:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPlayers();
    }, []);

    if (loading) return <p>Loading statistics...</p>;

    return (
        <div>
            <h1>Statistics</h1>
            <PlayerPieChart />
            <PlayerLineChart />
        </div>
    );
}
