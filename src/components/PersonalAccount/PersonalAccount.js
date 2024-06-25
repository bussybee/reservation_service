import React, { useState, useContext } from 'react';
import './PersonalAccount.css';
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { UserContext } from '../../utils/UserContext.js';


function PersonalAccount() {
    const [profilePicture, setProfilePicture] = useState();
    const { setUser } = useContext(UserContext);
    console.log("77777777777");
    console.log(setUser);
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
        localStorage.setItem('userId', null);
        localStorage.setItem('isAuthenticated', 'false');
        navigate("/registrationPage");
    };

    const handleFavoritesButtonClick = () => {
        navigate("/favoritesPage");
    };

    const handleHistoryButtonClick = () => {
        navigate("/historyPage");
    };

    return (
        <div className="personal-account-container">
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
                        <p><strong>Фамилия:</strong> {setUser.lastName}</p>
                        <p><strong>Имя:</strong> {setUser.firstName}</p>
                        <p><strong>Почта:</strong> {setUser.email}</p>
                        <p><strong>Телефон:</strong> {setUser.phoneNumber}</p>
                        <p><strong>Пол:</strong> {setUser.gender}</p>
                        <p><strong>Возраст:</strong> {setUser.age} лет</p>
                    </div>
                </div>
                <div className="profile-buttons">
                    <button className="profile-button">Профиль</button>
                    <button onClick={handleFavoritesButtonClick} className="profile-button">Избранное</button>
                    <button onClick={handleHistoryButtonClick} className="profile-button">История</button>
                </div>
            </div>
        </div>
    );
}

export default PersonalAccount;