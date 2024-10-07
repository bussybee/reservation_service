import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './BeautySalonPagee.css';

function BeautySalonPage() {
    const { id } = useParams(); // Получаем ID салона красоты из URL
    const [centerData, setCenterData] = useState(null); // Данные о салоне
    const [services, setServices] = useState([]); // Услуги салона
    const [userRating, setUserRating] = useState(0);
    const [userComment, setUserComment] = useState('');
    const [comments, setComments] = useState([]);
    const userId = localStorage.getItem('userId'); // Получаем userId пользователя

    useEffect(() => {
        const fetchCenterData = async () => {
            try {
                const response = await axios.get(`http://89.169.150.251:8081/institution/${id}`);
                setCenterData(response.data);

                const commentsResponse = await axios.get(`http://89.169.150.251:8081/comments/${id}`);
                setComments(commentsResponse.data);
                setServices(response.data.services || []); // Предполагаем, что услуги приходят с салоном
            } catch (error) {
                console.error('Ошибка при получении данных о салоне красоты:', error);
            }
        };

        fetchCenterData();
    }, [id]);

    // Функция для добавления центра в избранное
    const handleAddToFavorites = async () => {
        if (!userId) {
            alert('Пожалуйста, войдите в систему, чтобы добавить в избранное.');
            return;
        }

        try {
            await axios.get(`http://89.169.150.251:8081/institution/${id}/tofavorites/${userId}`);
            alert('Центр успешно добавлен в избранное!');
        } catch (error) {
            console.error('Ошибка при добавлении центра в избранное:', error);
            alert('Произошла ошибка при добавлении в избранное.');
        }
    };

    // Функция для бронирования услуги
    const handleBookService = async (serviceId, courseName) => {
        const reservationData = {
            institutionName: centerData.name,
            courseName: courseName,
            courseId: serviceId,
            userId,
            clientname: localStorage.getItem('clientName'),
            email: localStorage.getItem('email'),
            phone: localStorage.getItem('phone'),
            approved: false,
            competed: false,
        };

        try {
            await axios.post('http://89.169.150.251:8081/reservations', reservationData);
            alert('Бронирование успешно!');
        } catch (error) {
            console.error('Ошибка при бронировании:', error);
            alert('Произошла ошибка при бронировании');
        }
    };

    const handleAddComment = async () => {
        const newComment = {
            authorId: userId,
            comment: userComment,
            institutionId: id,
            rating: userRating,
        };

        try {
            const response = await axios.post(`http://89.169.150.251:8081/institution/${id}/comment`, newComment);
            setComments([...comments, response.data]); // Обновляем комментарии с сервера
            setUserComment(''); // Очищаем поле комментария
            setUserRating(0); // Сбрасываем рейтинг
        } catch (error) {
            console.error('Ошибка при добавлении комментария:', error);
            alert('Произошла ошибка при добавлении комментария');
        }
    };

    // Функция для отображения рейтинга в виде звёзд
    const renderStars = (rating) => {
        return [...Array(5)].map((_, i) => (
            <span
                key={i}
                onClick={() => setUserRating(i + 1)}
                className={userRating > i ? 'star selected' : 'star'}
            >
                &#9733;
            </span>
        ));
    };

    if (!centerData) {
        return <div>Загрузка...</div>;
    }

    return (
        <div className="fitness-page">
            <div className="center-details">
                <div className="details">
                    <h1 className="center-name">{centerData.name}</h1>
                    <p className="address">{centerData.address}</p>
                    <p className="rating">Рейтинг: {centerData.rating ? centerData.rating.toFixed(1) : '0'}</p>
                    <button className="add-to-favorites" onClick={handleAddToFavorites}>Добавить в избранное</button>
                    {/* Кнопка "Добавить в избранное" */}
                </div>
                <div className="center-image-container">
                    <img src={centerData.image} alt={centerData.name} className="center-image"/>
                </div>
            </div>

            {services.length > 0 ? (
                <div className="services-section">
                    <h2>Услуги центра</h2>
                    <ul>
                        {services.map(service => (
                            <li key={service.id}>
                                {service.courseName} - {service.startTime} - {service.duration} ч.
                                <button
                                    onClick={() => handleBookService(service.id, service.courseName)}>Записаться</button>
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
                        <p><strong>{comment.authorName}</strong> - Оценка: {comment.rating}
                        </p> {/* Отображаем имя автора */}
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
                    <div className="rating-input">
                        {[1, 2, 3, 4, 5].map(value => (
                            <span
                                key={value}
                                onClick={() => setUserRating(value)}
                                className={userRating >= value ? 'star selected' : 'star'}
                            >
                    &#9733;
                </span>
                        ))}
                    </div>
                    <button onClick={handleAddComment}>Добавить отзыв</button>
                </div>
            </div>
        </div>
    );
}

export default BeautySalonPage;
