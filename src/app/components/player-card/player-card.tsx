import './player-card.css';
import { Player } from '../../api/players/data';
import React from 'react';
import { useRouter } from 'next/navigation';



interface PlayerCardProps {
    player: Player;
    onDelete: (id: number) => void;
    cardLabel: string;
}


const PlayerCard: React.FC<PlayerCardProps> = ({ player, onDelete, cardLabel }) => {
    const router = useRouter();

    const handleDetailsClick = () => {
        router.push(`/detail-page/${player.id}`);
    };

    return (
        <main className='player-card'>
            <div className='player-card__header'>
                <div className='player-card__image'>
                    <img src={player.imageUrl} alt={player.name} />
                </div>
                <h2 className='player-card__name'>{player.name}</h2>
            </div>
            <div className='player-card__label-container'>
                <div className='player-card__label' style={{ backgroundColor: cardLabel }}></div>
            </div>
            <div className='player-card__body'>
                <p><i className="bi bi-hash"></i>{player.ranking}</p>
                <p><i className="bi bi-flag-fill"></i>{player.country}</p>
                <p><i className="bi bi-trophy-fill"></i>{player.number_of_titles}</p>
            </div>  
            <div className='player-card__footer'>
                <button className='player-card__button' onClick={handleDetailsClick}><i className="bi bi-list"></i></button>
                <button className='player-card__button' onClick={() => onDelete(player.id)}><i className="bi bi-trash3"></i></button>
            </div>
        </main>
    );
};

export default PlayerCard;