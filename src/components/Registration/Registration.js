import React, { useState, useContext  } from 'react';
import './Registration.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { UserContext } from '../../utils/UserContext.js';

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
            localStorage.setItem('isAuthenticated', true);
//      navigate("/personalaccount");
            //   ym(97134881,'reachGoal','personalaccount')
            await axios({
                url: "http://localhost:3001/user/create",
                method: "POST",
                data: {
                    lastName: formData.lastName,
                    firstName: formData.firstName,
                    age: formData.age,  
                    gender: formData.gender,
                    phoneNumber: formData.phoneNumber ,
                    email: formData.email,
                    password: formData.password
                },
            }).then(res => {
                if(res.status === 201){
                    console.log("!!!!!!" + res);
                    const user = {
                        id: res.data.id,
                        firstName: res.data.firstName,
                        lastName: res.data.lastName,
                        email: res.data.email,
                        phoneNumber: res.data.phoneNumber.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, "+7-$1-$2-$3-$4"),
                        gender: generateGender(res.data.gender),
                        age: res.data.age,
                        isAuthenticated: true,
                        role: res.data.role
                    };
                    setUser(user); // Устанавливаем состояние пользователя
                    localStorage.setItem('userId', user.id);
                    localStorage.setItem('isAuthenticated', 'true');
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

        }

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

