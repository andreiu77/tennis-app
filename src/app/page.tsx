'use client';

import React, { useState } from 'react';
import './main-page.css';
import Link from 'next/link';

import MainMenu from './components/main-menu/main-menu';
import PlayerCard from './components/player-card/player-card';
import players from './domain/hardcoded_entities';
import PlayersList from './components/players-list/players-list';
import Header from './components/players-list/list-header';


export default function MainPage() {
    const [showForm, setShowForm] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");     


    return (
        <div className='page'>
            <div className='sidebar'>
                <MainMenu onAddPlayerClick={() => setShowForm(true)}/>
            </div>
            <div className='content'>
                <div className='header'>
                    <Header setSearchQuery={setSearchQuery}/>
                </div>

                <div>
                    <PlayersList searchQuery={searchQuery} showForm={showForm} onCloseForm={() => setShowForm(false)}/>
                </div>

            </div>
        </div>
    );
}