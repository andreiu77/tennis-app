import React from 'react';
import './main-menu.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

interface MainMenuProps {
    onAddPlayerClick: () => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ onAddPlayerClick }) => {
    const router = useRouter();

    const handleStatisticsClick = () => {
        router.push('/statistics-page');
    };

    const handleTopPlayers = () => {
        router.push('/top-rackets-page');
    };


    return (
        <div className="main-menu">
            <ul className="menu-list">
                <li className="menu-item" onClick={ onAddPlayerClick }><i className="bi bi-person-add"></i></li>
                <li className="menu-item" onClick={ handleStatisticsClick }><i className="bi bi-bar-chart-line"></i></li>
                <li className="menu-item" onClick={ handleTopPlayers }><i className="bi bi-list-ol"></i></li>

                <li className="menu-item-logout" onClick={() => signOut({ callbackUrl: "/login-page" })}><i className="bi bi-box-arrow-right"></i></li>
            </ul>   
        </div>
    );
};

export default MainMenu;