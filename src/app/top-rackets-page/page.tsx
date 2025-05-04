"use client";
import { useEffect, useState } from 'react';


interface RacketBrand {
    racket_brand: string;
    _count: {
        racket_brand: number;
    };
}

export default function TopRacketsPage() {
    const [topRacketBrands, setTopRacketBrands] = useState<RacketBrand[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch top racket brands when the component mounts
    useEffect(() => {
        async function fetchTopRacketBrands() {
            try {
                const response = await fetch('/api/top-rackets');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setTopRacketBrands(data);
            } catch (err) {
                setError('Error loading top racket brands');
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        fetchTopRacketBrands();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Top Players</h1>
            <p>Top racket brands based on the number of players using them:</p>

            <ul>
                {topRacketBrands.map((brand) => (
                    <li key={brand.racket_brand}>
                        {brand.racket_brand} - {brand._count.racket_brand} players
                    </li>
                ))}
            </ul>
        </div>
    );
}