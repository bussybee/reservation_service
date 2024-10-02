import React, { useEffect, useState } from 'react';
import './HistoryPage.css';
import { useNavigate } from 'react-router-dom';

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
                
                if (!response.ok) {
                    throw new Error('Ошибка при загрузке истории бронирований');
                }

                const data = await response.json();
                console.log("Полученные данные:", data); // Логируем данные для проверки

                // Проверяем, что данные представляют собой массив
                if (Array.isArray(data)) {
                    setReservations(data); // Устанавливаем полученные данные в состояние
                } else {
                    console.error('Данные не содержат массив reservations:', data);
                    setError('Не удалось получить историю бронирований.');
                }

                setLoading(false);
            } catch (err) {
                console.error(err);
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
                                <p className="center-client-name">Клиент: {reservation.clientName}</p>
                                <p className="center-email">Email клиента: {reservation.email}</p>
                                <p className="center-phone">Телефон клиента: {reservation.phone}</p>
                                <p className="center-course">Название курса: {reservation.courseName}</p>
                                <p className="center-status">Статус: {reservation.approved ? 'Одобрено' : 'Не одобрено'}</p>
                                <p className="center-created-at">Дата создания: {reservation.createdAt}</p>
                                <a href={`/fitnessPage/${reservation.courseName}`} className="center-link">Подробнее</a>
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
