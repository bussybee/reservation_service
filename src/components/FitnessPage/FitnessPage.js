import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FitnessPage.css';

function FitnessPage() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [userRating, setUserRating] = useState(0);
    const [userComment, setUserComment] = useState('');
    const [comments, setComments] = useState([
        { id: 1, user: 'User1', comment: 'Отличный центр, рекомендую!', rating: 4.5 },
        { id: 2, user: 'User2', comment: 'Очень хороший персонал!', rating: 4.8 },
        { id: 3, user: 'User3', comment: 'Удобное расположение и широкий выбор услуг.', rating: 4.2 },
    ]);

    const centerData = {
        name: 'Fitness Center 1',
        address: 'Address 1',
        rating: 4.8,
        description: 'Описание фитнес центра. Здесь можно добавить любую информацию о центре.',
        image: 'https://via.placeholder.com/500x500',
        schedule: [
            { date: '2024-05-01', day: 'Пн' },
            { date: '2024-05-02', day: 'Вт' },
            { date: '2024-05-03', day: 'Ср' },
            { date: '2024-05-04', day: 'Чт' },
            { date: '2024-05-05', day: 'Пт' },
            { date: '2024-05-06', day: 'Сб' },
            { date: '2024-05-07', day: 'Вс' },
            { date: '2024-05-08', day: 'Пн' },
            { date: '2024-05-09', day: 'Вт' },
            { date: '2024-05-10', day: 'Ср' },
            { date: '2024-05-11', day: 'Чт' },
            { date: '2024-05-12', day: 'Пт' },
            // Добавьте больше дат и дней недели при необходимости
        ],
        availableTimes: [
            '10:00-11:30',
            '12:00-13:30',
            '14:00-15:30',
            '16:00-17:30',
        ]
    };

    const navigate = useNavigate();

    const handleAddToFavorites = () => {
        // Добавление центра в избранное
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
                serviceCost: '1000 руб.' // укажите стоимость услуги
            }
        });
    };

    const handleRatingChange = (value) => {
        setUserRating(value);
    };

    const handleCommentChange = (e) => {
        setUserComment(e.target.value);
    };

    const handleAddComment = () => {
        // Добавить комментарий и оценку в список комментариев
        const newComment = {
            id: comments.length + 1,
            user: 'You',
            comment: userComment,
            rating: userRating,
        };
        setComments([...comments, newComment]);
        // Сбросить состояние
        setUserComment('');
        setUserRating(0);
    };

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
