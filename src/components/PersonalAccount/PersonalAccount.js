import React, { useState, useContext, useEffect } from 'react';
import './PersonalAccount.css';
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { UserContext } from '../../utils/UserContext.js';

function PersonalAccount() {
  const [profilePicture, setProfilePicture] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // Состояние для модального окна
  const [userId, setUserId] = useState(null);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
        setUserId(storedUserId);
        console.log(`userId найден: ${storedUserId}`);
        fetchUserProfilePicture(storedUserId);  // Получаем изображение пользователя с сервера
    } else {
        console.error("userId не найден в localStorage");
    }
}, []);

  // Функция для открытия модального окна
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Функция для закрытия модального окна
  const closeModal = () => {
    setIsModalOpen(false);
    setImageUrl(''); // Очищаем поле при закрытии
  };

  // Функция для обновления URL и отображения изображения
  const handleUrlChange = (e) => {
    const url = e.target.value;
    setImageUrl(url);
    setProfilePicture(url);
  };

  // Функция для отправки URL изображения в базу данных
  const saveImageUrlToDatabase = async () => {
    if (!imageUrl || !userId) {
      alert("Пожалуйста, введите URL изображения и убедитесь, что вы авторизованы.");
      return;
    }

    try {
        const encodedImageUrl = encodeURIComponent(imageUrl);
        const response = await fetch(`http://localhost:8081/user/${userId}/image-url?imageUrl=${encodedImageUrl}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          }
        });

      if (response.ok) {
        alert('Фото успешно загружено!');
        closeModal(); // Закрыть модальное окно после успешной загрузки
      } else {
        alert('Произошла ошибка при загрузке фото.');
      }
    } catch (error) {
      console.error('Ошибка при отправке изображения на сервер:', error);
    }
  };

  // Функция для получения изображения пользователя с сервера
  const fetchUserProfilePicture = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8081/user/${userId}/image`);
      if (response.ok) {
        const imageUrl = await response.text(); // Получаем URL изображения
        setProfilePicture(imageUrl);  // Устанавливаем URL изображения в состояние
      } else {
        console.error('Ошибка при получении изображения пользователя.');
      }
    } catch (error) {
      console.error('Ошибка при получении изображения с сервера:', error);
    }
  };

  const onClickLogout = () => {
    localStorage.setItem('userId', null);
    localStorage.setItem('isAuthenticated', 'false');
    setUser(prevUser => ({
      ...prevUser,
      isAuthenticated: false,
      id: null
    }));
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
              <button onClick={openModal} className="upload-button">
                Загрузить фото
              </button>
            </div>
            <button onClick={onClickLogout} className="button-logout" disabled={!userId}>
              Выйти
            </button>
          </div>
          <div className="user-data">
            <h2>Данные пользователя</h2>
            <p><strong>Фамилия:</strong> {user.lastName}</p>
            <p><strong>Имя:</strong> {user.firstName}</p>
            <p><strong>Почта:</strong> {user.email}</p>
            <p><strong>Телефон:</strong> {user.phoneNumber}</p>
            <p><strong>Пол:</strong> {user.gender}</p>
            <p><strong>Возраст:</strong> {user.age} лет</p>
          </div>
        </div>
        <div className="profile-buttons">
          <button className="profile-button">Профиль</button>
          <button onClick={handleFavoritesButtonClick} className="profile-button">Избранное</button>
          <button onClick={handleHistoryButtonClick} className="profile-button">История</button>
        </div>
      </div>

      {/* Модальное окно */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Введите URL фотографии</h3>
            <input
              type="text"
              placeholder="Введите URL фото"
              value={imageUrl}
              onChange={handleUrlChange}
              className="image-url-input"
            />
            <div className="modal-buttons">
              <button onClick={saveImageUrlToDatabase} className="save-button">Сохранить</button>
              <button onClick={closeModal} className="close-button">Отмена</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PersonalAccount;
