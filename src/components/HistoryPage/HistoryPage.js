import React, { useEffect, useState } from 'react';
import './HistoryPage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function HistoryPage() {
    const navigate = useNavigate();
    const [reservations, setReservations] = useState([]); // Состояние для хранения бронирований
    const [loading, setLoading] = useState(true); // Состояние загрузки
    const [error, setError] = useState(null); // Состояние для ошибок

    const userId = localStorage.getItem('userId'); // Получаем userId из localStorage

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await fetch(`http://89.169.150.251:8081/reservations/user/${userId}`);
                
                if (response.status === 200) {
                    setReservations(response.data);
                } else {
                    throw new Error('Ошибка при загрузке истории бронирований');
                }

                setLoading(false);
            } catch (err) {
                console.error('Ошибка:', err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchReservations();
    }, [userId]);

    const handlePersAccButtonClick = () => {
        navigate('/personalAccount');
    };

    const handleFavoritesButtonClick = () => {
        navigate('/favoritesPage');
    };

    if (loading) {
        return <p>Загрузка...</p>;
    }

    if (error) {
        return <p>Ошибка: {error}</p>;
    }

    return (
        <div className="history-page-container">
            <div className="history-page">
                <h1 className="history-title">История бронирования</h1>

                {/* Проверка на наличие бронирований */}
                {reservations.length === 0 ? (
                    <p>У вас нет истории бронирований.</p>
                ) : (
                    reservations.map((reservation, index) => (
                        <div key={index} className="history-center-info">
                            <div className="center-info">
                                <h2 className="center-name">{reservation.institutionName}</h2>
                                <p className="center-course">Услуга: {reservation.courseName}</p>
                                <p className="center-status">Статус: {reservation.approved ? 'Одобрено' : 'Не одобрено'}</p>
                                <p className="center-created-at">Дата бронирования: {reservation.createdAt}</p>
                            </div>
                        </div>
                    ))
                )}

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