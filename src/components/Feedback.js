import React, { useState } from 'react';
import './Feedback.css'; // Подключаем файл стилей для страницы обратной связи

function Feedback() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData); // Здесь можно добавить логику для отправки данных на сервер
        // Очистка формы после отправки
        setFormData({
            name: '',
            email: '',
            message: ''
        });
    };

    return (
        <div className="feedback-page">
            <h1 className="title">Обратная связь</h1>
            <form className="feedback-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Имя:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="message">Сообщение:</label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="5"
                        required
                    ></textarea>
                </div>
                <button type="submit" className="submit-button">Отправить</button>
            </form>
        </div>
    );
}

export default Feedback;