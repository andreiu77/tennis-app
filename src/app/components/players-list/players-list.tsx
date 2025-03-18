'use client';

import React, { useState } from 'react';
import players from '../../domain/hardcoded_entities';
import PlayerCard from '../player-card/player-card';
import AddPlayerForm from '../add-player-form/add-player-form';

import './players-list.css';
import ReactPaginate from 'react-paginate';

const playersPerPage = 6;

interface PlayersListProps {
    searchQuery: string;
    showForm: boolean;
    onCloseForm: () => void;
  }

const PlayersList: React.FC<PlayersListProps> = ({ searchQuery, showForm, onCloseForm }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [playersData, setPlayers] = useState(players);

    const filteredPlayers = playersData.filter((player) =>
        player.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const offset = currentPage * playersPerPage;
    const currentPlayers = filteredPlayers.slice(offset, offset + playersPerPage);    
    const pageCount = Math.ceil(filteredPlayers.length / playersPerPage);



    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    const handleDelete = (id: number) => {
        const updatedPlayers = playersData.filter(player => player.id !== id);
        setPlayers(updatedPlayers);
        setCurrentPage(0);
    };

    const handleAddPlayer = (newPlayer: any) => {
        setPlayers([...players, newPlayer]);
        console.log(newPlayer);
    };
    
    return (
        <div className='players-list-container'>
            <div className='players-list'>
                {currentPlayers.map(player => (
                    <PlayerCard key={player.id} player={player} onDelete={handleDelete} />
                ))}
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