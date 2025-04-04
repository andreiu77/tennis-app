"use client";

import React, { useMemo, useRef, useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { Player } from "../../api/players/data";

const getRandomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;


const PlayerPieChart: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const colorMap = useRef<Record<string, string>>({});

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const res = await fetch("/api/players");
        const data = await res.json();
        setPlayers(data);
      } catch (err) {
        console.error("Failed to fetch players:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  const data = useMemo(() => {
    const countMap: Record<string, number> = {};

    players.forEach((player) => {
      countMap[player.country] = (countMap[player.country] || 0) + 1;
    });

    return Object.entries(countMap).map(([country, value]) => {
      // Assign a persistent color if not already assigned
      if (!colorMap.current[country]) {
        colorMap.current[country] = getRandomColor();
      }

      return {
        name: country,
        value,
        color: colorMap.current[country],
      };
    });
  }, [players]); // Recalculate only when players change

  if (loading) return <p>Loading chart...</p>;

  return (
    <PieChart width={400} height={400}>
      <text
        x="50%"
        y="20"
        textAnchor="middle"
        dominantBaseline="middle"
        style={{ fontSize: "16px", fontWeight: "bold" }}
      >
        Player Count By Nationality
      </text>
      <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8">
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default PlayerPieChart;
