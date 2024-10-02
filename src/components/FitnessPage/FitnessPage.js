import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './FitnessPage.css';

function FitnessPage() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [userRating, setUserRating] = useState(0);
    const [userComment, setUserComment] = useState('');
    const [comments, setComments] = useState([]);
    const [centerData, setCenterData] = useState(null); // Состояние для хранения данных о центре
    const navigate = useNavigate();

    // Получение данных о центре с сервера
    useEffect(() => {
        const fetchCenterData = async () => {
            try {
                const response = await axios.get('http://89.169.150.251:8081/institution/{centerId}'); // Замените {centerId} на реальный ID центра
                setCenterData(response.data);
                setComments(response.data.comments || []); // Предположим, что комментарии приходят вместе с данными о центре
            } catch (error) {
                console.error('Ошибка при получении данных о центре:', error);
            }
        };

        fetchCenterData();
    }, []);

    const handleAddToFavorites = () => {
        // Логика для добавления центра в избранное
    };

    const handleScheduleItemClick = (date) => {
        setSelectedDate(date);
        setShowModal(true);
    };

    const handleTimeSelection = (time) => {
        setSelectedTime(time);
        setShowModal(false);
        navigate('/booking', {
            state: {
                selectedService: 'Fitness Session',
                selectedDate: selectedDate,
                selectedTime: time,
                serviceCost: '1000 руб.' // Укажите стоимость услуги
            }
        });
    };

    const handleRatingChange = (value) => {
        setUserRating(value);
    };

    const handleCommentChange = (e) => {
        setUserComment(e.target.value);
    };

    const handleAddComment = async () => {
        const newComment = {
            user: 'You',
            comment: userComment,
            rating: userRating,
        };

        try {
            // Отправка нового комментария на сервер
            await axios.post(`http://89.169.150.251:8081/institution/${centerData.id}/comment`, newComment);
            setComments([...comments, newComment]); // Обновляем состояние комментариев
            // Сбросить состояние
            setUserComment('');
            setUserRating(0);
        } catch (error) {
            console.error('Ошибка при добавлении комментария:', error);
        }
    };

    if (!centerData) {
        return <div>Загрузка...</div>; // Отображение во время загрузки
    }

    return (
        <div className="fitness-page">
            <div className="center-details">
                <div className="details">
                    <h1 className="center-name">{centerData.name}</h1>
                    <p className="address">{centerData.address}</p>
                    <p className="rating">Рейтинг: {centerData.rating}</p>
                    <p className="description">{centerData.description}</p>
                    <button className="add-to-favorites" onClick={handleAddToFavorites}>Добавить в избранное</button>
                </div>
                <div className="center-image-container">
                    <img src={centerData.image} alt={centerData.name} className="center-image" />
                </div>
            </div>
            <div className="schedule-section">
                <h2 className="schedule-title">Расписание</h2>
                <div className="schedule-scroll">
                    {centerData.schedule.map((item, index) => (
                        <div
                            key={index}
                            className="schedule-item"
                            onClick={() => handleScheduleItemClick(item.date)}
                        >
                            <p className="date">{item.date}</p>
                            <p className="day">{item.day}</p>
                        </div>
                    ))}
                </div>
            </div>
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>{selectedDate}</h2>
                        <p>Тип услуги:</p>
                        <p>Описание:</p>
                        <div className="time-buttons">
                            {centerData.availableTimes.map((time, index) => (
                                <button
                                    key={index}
                                    className={`time-button ${selectedTime === time ? 'selected' : ''}`}
                                    onClick={() => handleTimeSelection(time)}
                                >
                                    {time}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            <div className="comment-section">
                <h2 className="comment-title">Отзывы</h2>
                <div className="user-comments">
                    {comments.map(comment => (
                        <div key={comment.id} className="comment">
                            <p className="user">{comment.user}</p>
                            <p className="rating">Рейтинг: {comment.rating}</p>
                            <p className="text">{comment.comment}</p>
                        </div>
                    ))}
                </div>
                <div className="user-input">
                    <h3 className="input-title">Оставить отзыв</h3>
                    <div className="rating-input">
                        <p>Ваша оценка:</p>
                        <div>
                            {[1, 2, 3, 4, 5].map(value => (
                                <span
                                    key={value}
                                    className={`star ${value <= userRating ? 'selected' : ''}`}
                                    onClick={() => handleRatingChange(value)}
                                >
                                    &#9733;
                                </span>
                            ))}
                        </div>
                    </div>
                    <textarea
                        className="comment-input"
                        placeholder="Введите ваш комментарий"
                        value={userComment}
                        onChange={handleCommentChange}
                    ></textarea>
                    <button className="submit-comment" onClick={handleAddComment}>Оставить комментарий</button>
                </div>
            </div>
        </div>
    );
}

export default FitnessPage;
