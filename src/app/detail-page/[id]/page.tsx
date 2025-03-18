"use client";

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import './details-page.css';
import players from '../../domain/hardcoded_entities';

export default function DetailsPage() {
    const router = useRouter();
    const { id } = useParams<{ id: string }>();
    const player = players.find(player => player.id === Number(id));

    if (!player) {
        return <h1>Player not found</h1>;
    }

    const [ isEditable, setEditable ] = useState(false);
    const [ currentPlayer, setCurrentPlayer ] = useState(player);

    const toggleEdit = () => {
        setEditable(!isEditable);
    };

    const handleBackClick = () => {
        router.push('/');
    };

    return (
        <div className="details-page">
            <div className="left-side">
                <img src={player.imageUrl} alt={player.name} />
                <h1>{player.name}</h1>
                <p style={{ margin: 0 }}>{player.handedness}</p>
                <h1>ATP #{player.ranking}</h1>
                <i className="bi bi-pencil-square" onClick={toggleEdit}></i>
            </div>

            <div className="vl"></div>

            <div className="right-side">
                <div className="input-group">
                    <label>Name:</label>
                    <input type="text" placeholder='Current name' 
                    value={player.name} readOnly={!isEditable}/>
                </div>
                <div className="input-group">
                    <label>Country:</label>
                    <input type="text" placeholder='Current country' 
                    value={player.country} readOnly={!isEditable} />
                </div>
                <div className="input-group">
                    <label>Racket Brand:</label>
                    <input type="text" placeholder='Current racket' 
                    value={player.racket_brand} readOnly={!isEditable} />
                </div>
                <div className="input-group">
                    <label>Birth date:</label>
                    <input type="text" placeholder='Date of birth' 
                    value={player.date_of_birth} readOnly={!isEditable} />
                </div>
                <div className="input-group">
                    <label>Ranking:</label>
                    <input type="text" placeholder='Current ranking' 
                    value={player.ranking} readOnly={!isEditable} />
                </div>
                <div className="input-group">
                    <label>Number of titles:</label>
                    <input type="text" placeholder='Current titles' 
                    value={player.number_of_titles} readOnly={!isEditable} />
                </div>  

                <div className='button-group'>
                    <button className='back-button' onClick={handleBackClick}>Back</button>
                    <button className='save-button'>Save</button>
                </div>
            </div>
        </div>
    );
};