"use client";

import React, { useMemo, useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Player } from "../../api/players/data";

const PlayerLineChart: React.FC = () => {
  // Prepare the data to display rankings of players
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

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

  const data = useMemo(() => {
    return players.map((player) => ({
      name: player.name,
      ranking: player.ranking,
    }));
  }, [players]); // Recalculate when players change

  if (loading) return <p>Loading chart...</p>;

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <text
          x="50%"
          y="20"
          textAnchor="middle"
          dominantBaseline="middle"
          style={{ fontSize: "16px", fontWeight: "bold" }}
        >
          Ranking Breakdown
        </text>
        <CartesianGrid strokeDasharray="3 3" />
        
        {/* Hide XAxis labels */}
        <XAxis dataKey="name" axisLine={false} tick={false} />
        
        <YAxis />
        <Tooltip content={({ payload }) => {
          // Custom Tooltip to show the player's name and ranking
          if (payload && payload.length > 0) {
            const player = payload[0].payload;
            return (
              <div style={{ backgroundColor: '#fff', padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }}>
                <p><strong>{player.name}</strong></p>
                <p>Ranking: {player.ranking}</p>
              </div>
            );
          }
          return null;
        }} />
        
        <Legend />
        <Line type="monotone" dataKey="ranking" stroke="#82ca9d" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default PlayerLineChart;
