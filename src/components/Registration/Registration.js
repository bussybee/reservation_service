import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from "axios";
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../utils/UserContext.js';
import './Registration.css';

function RegistrationPage() {
    const { setUser } = useContext(UserContext);
    const [formData, setFormData] = useState({
        lastName: '',
        firstName: '',
        age: '',
        gender: '',
        phoneNumber: '',
        email: '',
        password: '',
        showPassword: false,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    function generateGender(gender){
        if(gender === "MALE"){
            return "Мужской"
        } else {
            return "Женский";
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            formData.lastName &&
            formData.firstName &&
            formData.age &&
            formData.gender &&
            formData.phoneNumber &&
            formData.email &&
            formData.password
        ) {
            try {
                // Выполняем запрос на сервер для создания пользователя 
                const res = await axios({
                    url: "http://localhost:8081/user/create",
                    method: "POST",
                    data: {
                        lastName: formData.lastName,
                        firstName: formData.firstName,
                        age: formData.age,
                        gender: formData.gender,
                        phoneNumber: formData.phoneNumber,
                        email: formData.email,
                        password: formData.password
                    },
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                // Проверка статуса ответа 
                if (res.status === 201) {
                    console.log("Response: ", res);

                    // Проверяем, что в ответе есть userId
                    if (res.data.userId) {
                        const user = {
                            id: res.data.userId,  // Присваиваем userId
                            firstName: res.data.firstName,
                            lastName: res.data.lastName,
                            email: res.data.email,
                            phoneNumber: res.data.phoneNumber.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, "+7-$1-$2-$3-$4"),
                            gender: generateGender(res.data.gender),
                            age: res.data.age,
                            isAuthenticated: true,
                            role: res.data.role
                        };

                        // Сохраняем пользователя в контекст 
                        setUser(user);

                        // Сохраняем идентификатор пользователя и статус аутентификации в localStorage 
                        localStorage.setItem('userId', user.id);
                        localStorage.setItem('isAuthenticated', 'true');

                        // Навигация с передачей данных в состояние 
                        navigate("/personalaccount", {
                            state: {
                                firstName: user.firstName,
                                lastName: user.lastName,
                                email: user.email,
                                phoneNumber: user.phoneNumber,
                                gender: user.gender,
                                age: user.age
                            }
                        });
                    } else {
                        console.error("Ошибка: userId отсутствует в ответе сервера.");
                        console.log("Полный ответ сервера: ", res);
                    }
                } else {
                    console.log("Ошибка аутентификации.");
                }
            } catch (err) {
                console.log(err);
            }
        }

        // Сбрасываем форму 
        console.log(formData);
        setFormData({
            lastName: '',
            firstName: '',
            age: '',
            gender: '',
            phoneNumber: '',
            email: '',
            password: '',
            showPassword: false,
        });
    };

    const togglePasswordVisibility = () => {
        setFormData((prevData) => ({
            ...prevData,
            showPassword: !prevData.showPassword,
        }));
    };

    const navigate = useNavigate();

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
                        <option value="MALE">Мужской</option>
                        <option value="FEMALE">Женский</option>
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

                <button type="submit" className="submit-button">
                    Зарегистрироваться
                </button>
                <p className="or-login">
                    или <a href="/login" className="nav-button-reg">войти</a>
                </p>
            </form>
        </div>
    );
}

export default RegistrationPage;
