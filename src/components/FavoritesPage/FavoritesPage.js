import React from 'react';
import './FavoritesPage.css';
import { useNavigate } from 'react-router-dom';

function FavoritesPage() {
    const navigate = useNavigate();

    const fitnessCenters = [
        {
            id: 1,
            name: 'X-fit',
            address: 'ул. Генерала Лизюкова, 35Б',
            rating: 4.5,
            image: 'https://tpmag.ru/assets/cache_image/images/partners/xfit-logo_400x450_e1c.png',
            link: '/fitnessPage/xfit',
        },
        {
            id: 2,
            name: 'Lion-fitnes',
            address: 'площадь Ленина,8Б',
            rating: 4.8,
            image: 'https://cdn.dribbble.com/users/1802/screenshots/1642015/lion.jpg?compress=1&resize=400x300',
            link: '/fitnessPage/lion'
        },
    ];

    const handlePersAccButtonClick = () => {
        navigate('/personalAccount');
    };

    const handleHistoryButtonClick = () => {
        navigate('/historyPage');
    };

    return (
        <div className="favorites-page-container">
            <div className="favorites-page">
                <h1 className="favorites-title">Избранное</h1>
                <div className="favorite-center-info">
                    <div className="center-info">
                        <h2 className="center-name">{fitnessCenters[0].name}</h2>
                        <p className="center-address">{fitnessCenters[0].address}</p>
                        <p className="center-rating">Рейтинг: {fitnessCenters[0].rating}</p>
                        <a href={fitnessCenters[0].link} className="center-link">Подробнее</a>
                    </div>
                </div>
                <div className="profile-buttons-favorite">
                    <button onClick={handlePersAccButtonClick} className="profile-button-favorite">Профиль</button>
                    <button className="profile-button-favorite current">Избранное</button>
                    <button onClick={handleHistoryButtonClick} className="profile-button-favorite">История</button>
                </div>
            </div>
        </div>
    );
}

export default FavoritesPage;
