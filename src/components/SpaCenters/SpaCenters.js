import React, { useEffect, useState } from 'react';
import './SpaCenters.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SpaCenters() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); // Состояние загрузки
    const [error, setError] = useState(null); // Состояние для ошибок

    const navigate = useNavigate();

    useEffect(() => {
        const fetchSpaCenters = async () => {
            try {
                const response = await axios.get("http://89.169.150.251:8081/spaCenters");
                setData(response.data); // Устанавливаем данные в состояние
                setLoading(false); // Устанавливаем состояние загрузки в false
            } catch (err) {
                console.error('Ошибка при получении данных с сервера:', err);
                setError('Не удалось загрузить данные.'); // Устанавливаем сообщение об ошибке
                setLoading(false); // Устанавливаем состояние загрузки в false
            }
        };

        fetchSpaCenters(); // Вызов функции для получения данных
    }, []); // Пустой массив зависимостей, чтобы вызов произошел только один раз

    const handleCenterDetailClick = (id) => {
        // Функция для навигации на страницу деталей спа центра
        navigate(`/spaCenterPage/${id}`);
    };

    // Проверка состояния загрузки и ошибок
    if (loading) {
        return <p>Загрузка...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="spa-centers-page">
            <h1 className="page-title">Спа центры Воронежа</h1>

            <div className="spa-centers-container">
                {data.map(center => (
                    <div key={center.id} className="spa-center-card">
                        <div className="center-image-container">
                            <img src={center.image} alt={center.name} className="center-image" />
                        </div>
                        <div className="center-info">
                            <h2 className="center-name">{center.name}</h2>
                            <p className="center-address">{center.address}</p>
                            <p className="center-rating">Рейтинг: {center.rating}</p>
                        </div>
                        <div className="center-button">
                            <button 
                                className="transparent-button-spa" 
                                onClick={() => handleCenterDetailClick(center.id)}
                            >
                                Подробнее
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SpaCenters;
