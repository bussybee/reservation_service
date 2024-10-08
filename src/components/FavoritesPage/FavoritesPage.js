import React, {useEffect, useState} from 'react';
import './FavoritesPage.css';
import {useNavigate} from 'react-router-dom';

function FavoritesPage() {
    const navigate = useNavigate();
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deletedIds, setDeletedIds] = useState([]);

    const userId = localStorage.getItem('userId'); // Получаем userId из localStorage

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await fetch(`http://89.169.150.251:8081/institution/favorites/${userId}`);

                if (!response.ok) {
                    throw new Error('Ошибка при загрузке избранных центров');
                }

                const data = await response.json();
                setFavorites(data);  // Устанавливаем полученные данные в состояние
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchFavorites();
    }, [userId]);

    const handleDeleteFromFavorites = (centerId) => {
        setFavorites(favorites.filter(center => center.id !== centerId));
        setDeletedIds([...deletedIds, centerId]);

        // Отправка запроса на удаление на сервер
        deleteFromFavoritesServer(centerId);
    };

    const deleteFromFavoritesServer = async (centerId) => {
        try {
            const response = await fetch(`http://89.169.150.251:8081/institution/${centerId}/tofavorites/${userId}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Ошибка при удалении центра из избранного');
            }

            // Удаляем ID из массива deletedIds после успешного удаления
            setDeletedIds(deletedIds.filter(id => id !== centerId));
        } catch (err) {
            console.error(err);
            // Обработка ошибок
        }
    };

    const handlePersAccButtonClick = () => {
        navigate('/personalAccount');
    };

    const handleHistoryButtonClick = () => {
        navigate('/historyPage');
    };

    if (loading) {
        return <p>Загрузка...</p>;
    }

    if (error) {
        return <p>Ошибка: {error}</p>;
    }

    return (
        <div className="favorites-page-container">
            <div className="favorites-page">
                <h1 className="favorites-title">Избранное</h1>

                {/* Проверка на наличие избранных центров */}
                {favorites.length === 0 ? (
                    <p>У вас нет избранных центров.</p>
                ) : (
                    favorites.map(center => (
                        <div key={center.id} className="favorite-center-info">
                            <div className="center-info">
                                <h2 className="center-name">{center.name}</h2>
                                <p className="center-address">{center.address}</p>
                                <p className="center-rating">Рейтинг: {center.rating}</p>
                                <a href={`/fitnessPage/${center.id}`} className="center-link">Подробнее</a>
                                <button onClick={() => handleDeleteFromFavorites(center.id)} className="delete-button">Удалить</button>
                            </div>
                        </div>
                    ))
                )}

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
