import React from 'react';
import './HistoryPage.css';
import { useNavigate } from 'react-router-dom';

function HistoryPage() {
    const navigate = useNavigate();

    const fitnessCenters = [
        {
            id: 2,
            name: 'Lion-fitnes',
            address: 'площадь Ленина,8Б',
            rating: 4.8,
            image: 'https://cdn.dribbble.com/users/1802/screenshots/1642015/lion.jpg?compress=1&resize=400x300',
            link: '/fitnessPage/lion-fitnes',
        },
    ];

    const handlePersAccButtonClick = () => {
        navigate('/personalAccount');
    };

    const handleFavoritesButtonClick = () => {
        navigate('/favoritesPage');
    };

    return (
        <div className="history-page-container">
            <div className="history-page">
                <h1 className="history-title">История бронирования</h1>
                <div className="history-center-info">
                    <div className="center-info">
                        <h2 className="center-name">{fitnessCenters[0].name}</h2>
                        <p className="center-address">{fitnessCenters[0].address}</p>
                        <p className="center-rating">Рейтинг: {fitnessCenters[0].rating}</p>
                        <a href={fitnessCenters[0].link} className="center-link">Подробнее</a>
                    </div>
                </div>
                <div className="profile-buttons-history">
                    <button onClick={handlePersAccButtonClick} className="profile-button-history">Профиль</button>
                    <button onClick={handleFavoritesButtonClick} className="profile-button-history">Избранное</button>
                    <button className="profile-button-history current">История</button>
                </div>
            </div>
        </div>
    );
}

export default HistoryPage;
