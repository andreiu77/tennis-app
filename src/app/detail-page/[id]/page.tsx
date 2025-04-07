"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Player } from "../../api/players/data";
import "./details-page.css";
import { set } from "react-datepicker/dist/date_utils";
import VideoUpload from "./video-upload";

export default function DetailsPage() {
    const router = useRouter();
    const { id } = useParams<{ id: string }>();
    const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
    const [editedPlayer, setEditedPlayer] = useState<Player | null>(null);
    const [isEditable, setEditable] = useState(false);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);


    useEffect(() => {
        const fetchPlayer = async () => {
            try {
                const res = await fetch(`/api/players/${id}`);
                const data = await res.json();
                setCurrentPlayer(data);
                setEditedPlayer(data);
            } catch (error) {
                console.error("Error fetching player:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchPlayer();
    }, [id]);

    const toggleEdit = () => {
        setEditable(true);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedPlayer((prev) => ({
            ...prev!,
            [name]: name === "ranking" || name === "number_of_titles" ? Number(value) : value,
        }));
    };

    const handleSave = async () => {
        console.log("Saving player data:", JSON.stringify(editedPlayer));
        try {
            const res = await fetch(`/api/players/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editedPlayer),
            });

            if (!res.ok) {
                const error = await res.json();
                console.error("Failed to update:", error);
                setErrorMessage("Failed to update player: " + error.error);
                return;
            }

            const { player: updated } = await res.json();
            setCurrentPlayer(updated);
            console.log("Player updated:", updated);
            setEditable(false);
            setErrorMessage(null); // Clear any previous error message
        } catch (error) {
            console.error("Error updating player:", error);
        }
    };

    const handleBackClick = () => {
        router.push("/");
    };

    if (loading) return <h1>Loading...</h1>;
    if (!currentPlayer) return <h1>Player not found</h1>;

    return (
        <div className="details-page">
            <div className="left-side">
                <img src={currentPlayer.imageUrl} alt={currentPlayer.name} />
                <h1>{currentPlayer.name}</h1>
                <p style={{ margin: 0 }}>{currentPlayer.handedness}</p>
                <h1>ATP #{currentPlayer.ranking}</h1>
                {!isEditable && (
                    <i
                        className="bi bi-pencil-square"
                        onClick={toggleEdit}
                        style={{ cursor: "pointer" }}
                    ></i>
                )}
            </div>

            <div className="vl"></div>

            <div className="right-side">
                <div className="input-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={isEditable ? editedPlayer.name : currentPlayer.name}
                        onChange={handleChange}
                        readOnly={!isEditable}
                    />
                </div>
                <div className="input-group">
                    <label>Country:</label>
                    <input
                        type="text"
                        name="country"
                        value={isEditable ? editedPlayer.country : currentPlayer.country}
                        onChange={handleChange}
                        readOnly={!isEditable}
                    />
                </div>
                <div className="input-group">
                    <label>Racket Brand:</label>
                    <input
                        type="text"
                        name="racket_brand"
                        value={isEditable ? editedPlayer.racket_brand : currentPlayer.racket_brand}
                        onChange={handleChange}
                        readOnly={!isEditable}
                    />
                </div>
                <div className="input-group">
                    <label>Birth date:</label>
                    <input
                        type="date"
                        name="date_of_birth"
                        value={isEditable ? editedPlayer.date_of_birth : currentPlayer.date_of_birth}
                        onChange={handleChange}
                        readOnly={!isEditable}
                    />
                </div>
                <div className="input-group">
                    <label>Ranking:</label>
                    <input
                        type="number"
                        name="ranking"
                        value={isEditable ? editedPlayer.ranking : currentPlayer.ranking}
                        onChange={handleChange}
                        readOnly={!isEditable}
                    />
                </div>
                <div className="input-group">
                    <label>Number of titles:</label>
                    <input
                        type="number"
                        name="number_of_titles"
                        value={isEditable ? editedPlayer.number_of_titles : currentPlayer.number_of_titles}
                        onChange={handleChange}
                        readOnly={!isEditable}
                    />
                </div>

                <div className="button-group">
                    <button className="back-button" onClick={handleBackClick}>
                        Back
                    </button>
                    {isEditable ? (
                        <button className="save-button" onClick={handleSave}>
                            Save
                        </button>
                    ) : null}
                </div>

                <div>
                    {currentPlayer && (
                        <VideoUpload playerId={currentPlayer.id.toString()} />
                    )}
                </div>

                {errorMessage && (
                    <div className="error-message">
                        <p>{errorMessage}</p>
                        <button onClick={() => window.location.reload()}>Refresh Page</button>
                    </div>
                )}

            </div>
        </div>
    );
}
