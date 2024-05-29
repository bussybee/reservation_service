import React, { useState } from 'react';
import './PersonalAccount.css';
import { useNavigate } from "react-router-dom";
import {useLocation} from 'react-router-dom';

function PersonalAccount({ setIsAuthenticated }) {
    const [profilePicture, setProfilePicture] = useState();
    const navigate = useNavigate();
    const { state } = useLocation();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePicture(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const onClickLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem("isAuthenticated");
        navigate("/registrationPage");
    };


    return (
        <div className="personal-account">
            <div className="profile-info">
               <div className="profile-block">
               <div className="profile-picture">
                    {profilePicture ? (
                        <img src={profilePicture} alt="Profile" />
                    ) : (
                        <div className="placeholder">Загрузить фото</div>
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                        id="fileInput"
                    />
                    <label htmlFor="fileInput" className="upload-button">Выбрать файл</label>
                </div>
                <button onClick={onClickLogout} className="button-logout">
                    Выйти
                </button>
               </div>
                <div className="user-data">
                    <h2>Данные пользователя</h2>
                    <p><strong>Фамилия:</strong> {state.lastName}</p>
                    <p><strong>Имя:</strong> {state.firstName}</p>
                    <p><strong>Почта:</strong> {state.email}</p>
                    <p><strong>Телефон:</strong> {state.phoneNumber}</p>
                    <p><strong>Пол:</strong> {state.gender}</p>
                    <p><strong>Возраст:</strong> {state.age} лет</p>
                </div>
            </div>
            <div className="profile-buttons">
                <button className="profile-button">Профиль</button>
                <button className="profile-button">Избранное</button>
                <button className="profile-button">История</button>
            </div>
        </div>
    );
}

export default PersonalAccount;