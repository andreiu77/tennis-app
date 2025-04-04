"use client";

import PlayerPieChart from "../components/statistics-charts/PlayerPieChart";
import { useState, useRef } from "react";
import players from "../domain/hardcoded_entities";
import getRandomPlayer from "../domain/random-players";
import PlayerLineChart from "../components/statistics-charts/PlayerBarChart";

import "./statistics-page.css";

export default function StatisticsPage() {
    const [playersData, setPlayersData] = useState(players);
    const isAddingRef = useRef(false);

    const handleAddRandomPlayer = async () => {
        isAddingRef.current = true; 

        while (isAddingRef.current) {
            const newPlayer = getRandomPlayer();
            
            if (playersData.some(player => player.ranking === newPlayer.ranking)) {
                continue;
            }

            console.log("Adding new player", newPlayer);
            setPlayersData((prevPlayers) => [...prevPlayers, newPlayer]);

            await new Promise(resolve => setTimeout(resolve, 2000)); 
        }
    };

    const handleStopAdding = () => {
        isAddingRef.current = false;
    };

    return (
        <div>
            <h1>Statistics</h1>
            <button onClick={handleAddRandomPlayer}>
                Start Adding Random Players
            </button>
            <button onClick={handleStopAdding}>
                Stop Adding
            </button>
            <PlayerPieChart players={playersData} />
            <PlayerLineChart players={playersData} />
        </div>
    );
}
