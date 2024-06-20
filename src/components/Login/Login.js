import React, { useState } from 'react';
import './Login.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

    function generateGender(gender){
        if(gender === "MALE"){
            return "Мужской"
        } else {
            return "Женский";
        }
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    setFormData({
                emailOrPhone: '',
                password: '',
                showPassword: false
            });
    await axios({
      url: "https://bbaj3hbmo0dg8o6gkctp.containers.yandexcloud.net/user/authenticate",
      method: "POST",
      data: {
        emailOrPhone: formData.emailOrPhone,
        password: formData.password
      },
    }).then(res => {
    if(res.status === 202){
    console.log(res);
          setIsAuthenticated(true);
          navigate("/personalaccount", { state:
                                            {   firstName: res.data.firstName,
                                                lastName: res.data.lastName,
                                                email: res.data.email,
                                                phoneNumber: res.data.phoneNumber.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, "+7-$1-$2-$3-$4"),
                                                gender: generateGender(res.data.gender),
                                                age: res.data.age
                                            }
                                       });
    } else {
        // todo: print error message authentication failed
    }

    })
      .catch((err) => console.log(err));
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
