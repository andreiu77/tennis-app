"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import "./details-page.css";
import players from "../../domain/hardcoded_entities";

export default function DetailsPage() {
    const router = useRouter();
    const { id } = useParams<{ id: string }>();
    const playerData = players.find((player) => player.id === Number(id));

    if (!playerData) {
        return <h1>Player not found</h1>;
    }

    const [isEditable, setEditable] = useState(false);
    const [currentPlayer, setCurrentPlayer] = useState({ ...playerData }); 
    const [editedPlayer, setEditedPlayer] = useState({ ...playerData }); 

    const toggleEdit = () => {
        setEditable(true);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedPlayer((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        const playerIndex = players.findIndex((player) => player.id === Number(id));
        if (playerIndex !== -1) {
            players[playerIndex] = editedPlayer;
        }
        setCurrentPlayer(editedPlayer);
        setEditable(false);
    };

    const handleBackClick = () => {
        router.push("/");
    };

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
            </div>
        </div>
    );
}
