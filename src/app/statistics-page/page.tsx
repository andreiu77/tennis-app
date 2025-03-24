"use client";

import PlayerPieChart from "../components/statistics-charts/PlayerPieChart";
import { useState } from "react";
import players from "../domain/hardcoded_entities";
import getRandomPlayer from "../domain/random-players";
import PlayerLineChart from "../components/statistics-charts/PlayerBarChart";

import "./statistics-page.css";
import { get } from "http";


export default function StatisticsPage() {
    const [playersData, setPlayersData] = useState(players);

    const handleAddRandomPlayer = () => {
        const newPlayer = getRandomPlayer();
        while (playersData.some(player => player.ranking === newPlayer.ranking)) {
            getRandomPlayer();
            return;
        }
        console.log("Adding new player", newPlayer);
        setPlayersData((prevPlayers) => [...prevPlayers, newPlayer]);
    };

    return (
        <div>
            <h1>Statistics</h1>
            <button onClick={handleAddRandomPlayer}>Add Random Player</button>
            <PlayerPieChart players={playersData} />
            <PlayerLineChart players={playersData} />
        </div>
    );
}