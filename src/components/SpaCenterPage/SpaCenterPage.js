import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './SpaCenterPage.css';

function SpaCenterPage() {
    const { id } = useParams(); // Получаем ID центра из URL
    const [centerData, setCenterData] = useState(null); // Данные о центре
    const [services, setServices] = useState([]); // Услуги центра
    const [userRating, setUserRating] = useState(0);
    const [userComment, setUserComment] = useState('');
    const [comments, setComments] = useState([]);
    const userId = localStorage.getItem('userId'); // Получаем userId пользователя

    useEffect(() => {
        const fetchCenterData = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/institution/${id}`);
                setCenterData(response.data);
                setComments(response.data.comments || []);
                setServices(response.data.services || []); // Предполагаем, что услуги приходят с центром
            } catch (error) {
                console.error('Ошибка при получении данных о центре:', error);
            }
        };

        fetchCenterData();
    }, [id]);

    // Функция для бронирования услуги
    const handleBookService = async (serviceId, courseName) => {
        const reservationData = {
            institutionName: centerData.name,  // не обязательно на сервере, но полезно для истории
            courseName: courseName,  // имя курса
            courseId: serviceId,  // id курса, который вы бронируете
            userId,  // id пользователя, который делает бронирование, заменить на актуальный
            clientname: localStorage.getItem('clientName'),
            email: localStorage.getItem('email'),
            phone: localStorage.getItem('phone'),
            approved: false,  // Статус бронирования по умолчанию
            competed: false,  // Завершен ли курс
        };
    
        try {
            const response = await axios.post('http://localhost:8081/reservations', reservationData);
            if (response.status === 201) {
                alert('Вы успешно записались на услугу!');
            } else {
                alert('Ошибка при бронировании');
            }
        } catch (error) {
            console.error('Ошибка при бронировании:', error);
            alert('Произошла ошибка при бронировании');
        }
    };

    if (!centerData) {
        return <div>Загрузка...</div>;
    }

    return (
        <div className="spa-center-page">
            <div className="center-details">
                <div className="details">
                    <h1 className="center-name">{centerData.name}</h1>
                    <p className="address">{centerData.address}</p>
                    <p className="rating">Рейтинг: {centerData.rating ? centerData.rating.toFixed(1) : '0'}</p>
                </div>
                <div className="center-image-container">
                    <img src={centerData.image} alt={centerData.name} className="center-image" />
                </div>
            </div>

            {services.length > 0 ? (
                <div className="services-section">
                    <h2>Услуги центра</h2>
                    <ul>
                        {services.map(service => (
                            <li key={service.id}>
                                {service.courseName} - {service.startTime} - {service.duration} ч.
                                <button onClick={() => handleBookService(service.id, service.courseName)}>Записаться</button>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div className="no-services">
                    <h3>Центр временно не работает, приносим извинения за неудобства</h3>
                </div>
            )}

            <div className="comment-section">
                <h2>Отзывы</h2>
                {comments.map((comment, index) => (
                    <div key={index} className="comment">
                        <p>Оценка: {comment.rating}</p>
                        <p>{comment.comment}</p>
                    </div>
                ))}

                <div>
                    <h3>Оставить отзыв</h3>
                    <textarea
                        value={userComment}
                        onChange={(e) => setUserComment(e.target.value)}
                        placeholder="Введите ваш отзыв"
                    />
                    <div>
                        {[1, 2, 3, 4, 5].map(value => (
                            <span
                                key={value}
                                onClick={() => setUserRating(value)}
                                className={userRating >= value ? 'selected' : ''}
                            >
                                &#9733;
                            </span>
                        ))}
                    </div>
                    <button>Добавить отзыв</button>
                </div>
            </div>
        </div>
    );
}

export default SpaCenterPage;
