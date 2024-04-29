import React, { useState } from 'react';
import './Login.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";

function LoginPage({setIsAuthenticated}) {

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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData); 
        setFormData({
            emailOrPhone: '',
            password: '',
            showPassword: false 
        });

        setIsAuthenticated(true);
        navigate("/personalaccount");
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
