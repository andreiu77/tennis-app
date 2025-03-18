import React from "react";


interface HeaderProps {
    setSearchQuery: (query: string) => void;
}

const Header: React.FC<HeaderProps>  = ({ setSearchQuery }) => {
    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <i className="bi bi-search" style={{ marginRight: '8px', fontSize: '20px' }}></i>
          <input type="text" placeholder="Search by name..." 
          onChange={(e) => setSearchQuery(e.target.value.toLowerCase())} />
        </div>
     );
};

export default Header;