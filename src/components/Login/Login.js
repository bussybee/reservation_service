import React, { useState, useContext } from 'react';
import './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from '../../utils/UserContext.js'; // Импортируем UserContext

function LoginPage() {
    const { setUser } = useContext(UserContext); // Получаем setUser из контекста
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        emailOrPhone: '',
        password: '',
        showPassword: false
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const togglePasswordVisibility = () => {
        setFormData(prevData => ({
            ...prevData,
            showPassword: !prevData.showPassword
        }));
    };

    const generateGender = (gender) => {
        return gender === "MALE" ? "Мужской" : "Женский";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormData({
            emailOrPhone: '',
            password: '',
            showPassword: false
        });

        try {
            const res = await axios.post("http://89.169.150.251:8081/user/authenticate", {
                emailOrPhone: formData.emailOrPhone,
                password: formData.password
            });
            console.log(res);
            console.log(res.data.phoneNumber);

            if (res.status === 202) {
                const user = {
                    id: res.data.userId,
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    email: res.data.email,
                    phoneNumber: res.data.phoneNumber.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, "+7-$1-$2-$3-$4"),
                    gender: generateGender(res.data.gender),
                    age: res.data.age,
                    isAuthenticated: true,
                    role: res.data.role,
                    image: res.data.image   
                };

                setUser(user); // Устанавливаем состояние пользователя
                localStorage.setItem('userId', user.id);
                localStorage.setItem('isAuthenticated', 'true');

                if (user.email === "roma81187@gmail.com") {
                    navigate("/adminPanel")
                } else {
                    navigate("/personalaccount");
                }
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="login-page">
            <h1 className="title">Вход</h1>
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="emailOrPhone">Номер телефона или Email:</label>
                    <input
                        type="text"
                        id="emailOrPhone"
                        name="emailOrPhone"
                        value={formData.emailOrPhone}
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
                <button type="submit" className="submit-button">Войти</button>
            </form>
        </div>
    );
}

export default LoginPage;
