'use client';

import React, { useState } from 'react';
import './main-page.css';
import Link from 'next/link';

import MainMenu from './components/main-menu/main-menu';
import PlayersList from './components/players-list/players-list';
import Header from './components/players-list/list-header';


export default function MainPage() {
    const [showForm, setShowForm] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");    
    const [sortOrder, setSortOrder] = useState("ranking-asc"); 



    return (
        <div className='page'>
            <div className='sidebar'>
                <MainMenu onAddPlayerClick={() => setShowForm(true)}/>
            </div>
            <div className='content'>
                <div className='header'>
                    <Header setSearchQuery={setSearchQuery} setSortOrder={setSortOrder}/>
                </div>

                <div>
                    <PlayersList searchQuery={searchQuery} sortOrder={sortOrder} showForm={showForm} onCloseForm={() => setShowForm(false)}/>
                </div>

            </div>
        </div>
    );
}