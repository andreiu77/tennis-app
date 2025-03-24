"use client";

import PlayerPieChart from "../components/statistics-charts/PlayerPieChart";
import { useState } from "react";
import players from "../domain/hardcoded_entities";
import getRandomPlayer from "../domain/random-players";


export default function StatisticsPage() {
    const [playersData, setPlayersData] = useState(players);

    const handleAddRandomPlayer = () => {
        const newPlayer = getRandomPlayer();
        console.log("Adding new player", newPlayer);
        setPlayersData((prevPlayers) => [...prevPlayers, newPlayer]);
    };

    return (
        <div>
            <h1>Statistics</h1>
            <button onClick={handleAddRandomPlayer}>Add Random Player</button>
            <PlayerPieChart players={playersData} />
        </div>
    );
}