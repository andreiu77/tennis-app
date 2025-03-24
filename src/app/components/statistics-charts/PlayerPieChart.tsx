"use client";

import React, { useMemo, useRef } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { Player } from "../../domain/hardcoded_entities";

const getRandomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

interface PlayerPieChartProps {
  players: Player[];
}

const PlayerPieChart: React.FC<PlayerPieChartProps> = ({ players }) => {
  const colorMap = useRef<Record<string, string>>({});

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
