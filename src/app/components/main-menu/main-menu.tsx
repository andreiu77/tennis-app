import React from 'react';
import './main-menu.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

interface MainMenuProps {
    onAddPlayerClick: () => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ onAddPlayerClick }) => {
    return (
        <div className="main-menu">
            <ul className="menu-list">
                <li className="menu-item" onClick={ onAddPlayerClick }><i className="bi bi-person-add"></i></li>
                <li className="menu-item"><i className="bi bi-alarm"></i></li>
            </ul>   
        </div>
    );
};

export default MainMenu;