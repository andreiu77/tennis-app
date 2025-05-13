'use client';

import React, { useEffect, useState } from 'react';
import './main-page.css';

import MainMenu from './components/main-menu/main-menu';
import PlayersList from './components/players-list/players-list';
import Header from './components/players-list/list-header';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import MonitoredUserTable from './components/monitored-users-table/monitored-users-table';


export default function MainPage() {
    const [showForm, setShowForm] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOrder, setSortOrder] = useState("ranking-asc");
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "loading") return; // Do nothing while loading
        if (status === "unauthenticated") {
            router.push("/login-page"); // Redirect to login page if not authenticated
        }
    }, [session, status]);

    const isAdmin = session?.user?.role === 'ADMIN';

    if (status === "loading" || status === "unauthenticated") {
        return <div className='loading'>Loading...</div>;
    }

    return (
        <div className='page'>
            <div className='sidebar'>
                <MainMenu onAddPlayerClick={() => setShowForm(true)} />
            </div>
            <div className='content'>
                <div className='header'>
                    <Header setSearchQuery={setSearchQuery} setSortOrder={setSortOrder} />
                </div>

                <div>
                    <PlayersList searchQuery={searchQuery} sortOrder={sortOrder} showForm={showForm} onCloseForm={() => setShowForm(false)} />
                    {isAdmin && (
                        <div style={{ marginTop: '20px' }}>
                            <MonitoredUserTable />
                        </div>
                    )}
                    
                </div>

            </div>
        </div>
    );
}