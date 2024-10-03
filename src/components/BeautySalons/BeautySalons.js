import React, { useEffect, useState } from 'react';
import './BeautySalons.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function BeautySalons() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); // Состояние загрузки
    const [error, setError] = useState(null); // Состояние для ошибок

    const navigate = useNavigate();

    useEffect(() => {
        const fetchBeautySalons = async () => {
            try {
                const response = await axios.get("http://89.169.150.251:8081/beautySalons", {
                    headers: {
                        "Access-Control-Allow-Origin": "http://89.169.150.251",
                        "Content-Type": "application/json"
                    }
                });

                setData(response.data); // Устанавливаем данные в состояние
                setLoading(false); // Устанавливаем состояние загрузки в false
            } catch (err) {
                console.error('Ошибка при получении данных с сервера:', err);
                setError('Не удалось загрузить данные.'); // Устанавливаем сообщение об ошибке
                setLoading(false); // Устанавливаем состояние загрузки в false
            }
        };

        fetchBeautySalons(); // Вызов функции для получения данных
    }, []); // Пустой массив зависимостей, чтобы вызов произошел только один раз

    const handleSalonDetailClick = (id) => {
        console.log("pressed ", id);
        navigate(`/beautySalonPage/${id}`);
    };

    // Проверка состояния загрузки и ошибок
    if (loading) {
        return <p>Загрузка...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="beauty-salon-page">
            <h1 className="page-title">Салоны красоты Воронежа</h1>

            <div className="beauty-salon-container">
                {data.map(center => (
                    <div key={center.id} className="beauty-salon-card">
                        <div className="center-image-container">
                            <img src={center.image} alt={center.name} className="center-image" />
                        </div>
                        <div className="center-info">
                            <h2 className="center-name">{center.name}</h2>
                            <p className="center-address">{center.address}</p>
                            <p className="center-rating">Рейтинг: {center.rating}</p>
                        </div>
                        <div className="center-button">
                            <button className="transparent-button-bs" onClick={() => handleSalonDetailClick(center.id)}>
                                Подробнее
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BeautySalons;
