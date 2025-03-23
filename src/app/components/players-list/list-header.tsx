import React from "react";


interface HeaderProps {
    setSearchQuery: (query: string) => void;
    setSortOrder: (order: string) => void;
}

const Header: React.FC<HeaderProps>  = ({ setSearchQuery, setSortOrder }) => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <i className="bi bi-search" style={{ marginRight: '8px', fontSize: '20px' }}></i>
                <input type="text" placeholder="Search by name..." 
                onChange={(e) => setSearchQuery(e.target.value.toLowerCase())} />
            </div>

            <select onChange={(e) => setSortOrder(e.target.value)} style={{ padding: '5px' }}>
                <option value="ranking-asc">Sort by Ranking (High-Low)</option>
                <option value="ranking-desc">Sort by Ranking (Low-High)</option>
            </select>
        </div>
     );
};

export default Header;