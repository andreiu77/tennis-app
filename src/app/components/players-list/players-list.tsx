'use client';

import { fetchPlayers, addPlayer, deletePlayer, updatePlayer } from '../../services/playersApi';

import React, { useState, useEffect } from 'react';
import PlayerCard from '../player-card/player-card';
import AddPlayerForm from '../add-player-form/add-player-form';

import './players-list.css';
import ReactPaginate from 'react-paginate';

// const playersPerPage = 6;

interface PlayersListProps {
    searchQuery: string;
    showForm: boolean;
    onCloseForm: () => void;
    sortOrder: string;
}

const PlayersList: React.FC<PlayersListProps> = ({ searchQuery = '', sortOrder, showForm, onCloseForm }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [playersData, setPlayers] = useState([]);
    const [playersPerPage, setPlayersPerPage] = useState(6);

    const chunkSize = Math.ceil(playersData.length / 3);
    const sectionColors = ["#d4af37", "#c0c0c0", "#cd7f32"];  // Gold, Silver, Bronze
    const playersDataWithColor = playersData.map((player, index) => {
        const sectionIndex = Math.floor(index / chunkSize);
        const color = sectionColors[sectionIndex];
        return { ...player, color };  // Add the color field to each player
    });


    const offset = currentPage * playersPerPage;
    const currentPlayers = playersDataWithColor.slice(offset, offset + playersPerPage);
    const pageCount = Math.ceil(playersDataWithColor.length / playersPerPage);

    const handlePlayersPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setPlayersPerPage(Number(event.target.value));
        setCurrentPage(0);
    };

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    const handleDelete = async (id: number) => {
        try {
            await deletePlayer(id);
            setPlayers((prevPlayers) => prevPlayers.filter((player) => player.id !== id));
        } catch (error) {
            console.error('Error deleting player:', error);
        }
    };

    const handleAddPlayer = async (newPlayer) => {
        try {
            const addedPlayer = await addPlayer(newPlayer);
            setPlayers([...playersData, addedPlayer]);
            console.log('Player added:', addedPlayer);
        } catch (error) {
            console.error('Error adding player:', error);
        }
    };

    useEffect(() => {
        const loadPlayers = async () => {
            try {
                const data = await fetchPlayers(searchQuery, sortOrder);
                setPlayers(data);
            } catch (error) {
                console.error('Error fetching players:', error);
            }
        };
        loadPlayers();
    }, [searchQuery, sortOrder]);

    return (
        <div className='players-list-container'>
            <div className='players-list'>
                {currentPlayers.map((player, index) => {
                    return (<PlayerCard key={player.id} player={player} onDelete={handleDelete} cardLabel={player.color} />)
                })}
            </div>
            <div className="players-list-controls">
                <label htmlFor="players-per-page">Players per page:</label>
                <select
                    id="players-per-page"
                    value={playersPerPage}
                    onChange={handlePlayersPerPageChange}>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                </select>
            </div>
            <div className='pagination-container'>
                <ReactPaginate
                    previousLabel={'previous'}
                    nextLabel={'next'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={'pagination'}
                    activeClassName={'active'}
                />
            </div>

            {showForm && <AddPlayerForm onClose={onCloseForm} onAddPlayer={handleAddPlayer} />}
        </div>
    );
};

export default PlayersList;