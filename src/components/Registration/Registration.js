import React, { useState } from 'react';
import './Registration.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function RegistrationPage() {
    const [formData, setFormData] = useState({
        lastName: '',
        firstName: '',
        age: '',
        gender: '',
        phoneNumber: '',
        email: '',
        password: ''
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
            lastName: '',
            firstName: '',
            age: '',
            gender: '',
            phoneNumber: '',
            email: '',
            password: ''
        });
    };

    const togglePasswordVisibility = () => {
        setFormData(prevData => ({
            ...prevData,
            showPassword: !prevData.showPassword
        }));
    };

    return (
        <div className="registration-page">
            <h1 className="title">Регистрация</h1>
            <form className="registration-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="lastName">Фамилия:</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="firstName">Имя:</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="age">Возраст:</label>
                    <input
                        type="number"
                        id="age"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="gender">Пол:</label>
                    <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Выберите пол</option>
                        <option value="male">Мужской</option>
                        <option value="female">Женский</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="phoneNumber">Номер телефона:</label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
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
                    <label htmlFor="password">Пароль:</label>
                    <div className="password-input">
                        <input
                            type={formData.showPassword ? 'text' : 'password'}
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <FontAwesomeIcon
                            icon={formData.showPassword ? faEyeSlash : faEye}
                            className="password-toggle"
                            onClick={togglePasswordVisibility}
                        />
                    </div>
                </div>

                <button type="submit" className="submit-button">Зарегистрироваться</button>
                <p className="or-login">или <a href="/login" className="nav-button">войти</a></p>
            </form>
        </div>
    );
}

export default RegistrationPage;
