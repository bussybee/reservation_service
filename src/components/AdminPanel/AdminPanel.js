import React, { useState, useEffect } from 'react';
import styles from './AdminPanel.module.css';
import BookingRequests from './BookingRequests';
import ClientInfo from './ClientInfo';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('bookingRequests');
  const [profilePicture, setProfilePicture] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // Состояние для модального окна
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
      console.log(`userId найден: ${storedUserId}`);
      fetchUserProfilePicture(storedUserId);  // Получаем изображение администратора с сервера
    } else {
      console.error("userId не найден в localStorage");
    }
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // Переход на страницу создания нового центра
  const handleEditCentersClick = () => {
    navigate('/createCenter');
  };

  // Функция для открытия модального окна
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Функция для закрытия модального окна
  const closeModal = () => {
    setIsModalOpen(false);
    setImageUrl(''); // Очищаем поле при закрытии
  };

  // Обновление URL изображения
  const handleUrlChange = (e) => {
    const url = e.target.value;
    setImageUrl(url);
    setProfilePicture(url); // Предварительный просмотр
  };

  // Сохранение URL изображения в базу данных
  const saveImageUrlToDatabase = async () => {
    if (!imageUrl || !userId) {
      alert("Пожалуйста, введите URL изображения и убедитесь, что вы авторизованы.");
      return;
    }

    try {
      const encodedImageUrl = encodeURIComponent(imageUrl);
      const response = await fetch(`http://89.169.150.251:8081/user/${userId}/image-url?imageUrl=${encodedImageUrl}`, {
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

  // Получение изображения администратора с сервера
  const fetchUserProfilePicture = async (userId) => {
    try {
      const response = await fetch(`http://89.169.150.251:8081/user/${userId}/image`);
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
    navigate("/registrationPage");
  };

  return (
    <div className={styles.adminPanelContainer}>
      <div className={styles.adminPanel}>
        <div className={styles.profileInfo}>
          <div className={styles.profileBlock}>
            <div className={styles.profilePicture}>
              {profilePicture ? (
                <img src={profilePicture} alt="Profile" />
              ) : (
                <div className={styles.placeholder}>Загрузить фото</div>
              )}
              <button onClick={openModal} className={styles.uploadButton}>
                Загрузить фото
              </button>
            </div>
            <button onClick={onClickLogout} className={styles.buttonLogout}>
              Выйти
            </button>
          </div>
          <div className={styles.userData}>
            <h2>Данные пользователя</h2>
            <p><strong>Фамилия:</strong> Денисов</p>
            <p><strong>Имя:</strong> Константин</p>
            <p><strong>Почта:</strong> roma81187@gmail.com</p>
            <p><strong>Телефон:</strong> +7-980-783-85-57</p>
            <p><strong>Пол:</strong> Мужской</p>
            <p><strong>Возраст:</strong> 20 лет</p>
          </div>
        </div>
        <div className={styles.adminContent}>
          <div className={styles.adminMenu}>
            <ul>
              <li className={activeTab === 'bookingRequests' ? styles.active : ''} onClick={() => handleTabClick('bookingRequests')}>
                Заявки на бронирование
              </li>
              <li className={activeTab === 'clientInfo' ? styles.active : ''} onClick={() => handleTabClick('clientInfo')}>
                Информация о клиентах
              </li>
              <li className={activeTab === 'editCenters' ? styles.active : ''} onClick={handleEditCentersClick}>
                Редактировать центры
              </li>
            </ul>
          </div>
          <div className={styles.adminTabContent}>
            {activeTab === 'bookingRequests' && <BookingRequests />}
            {activeTab === 'clientInfo' && <ClientInfo />}
            {/* EditCenters не рендерим, так как будем перенаправлять на CreateCenter */}
          </div>
        </div>
      </div>

      {/* Модальное окно для загрузки фото */}
      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Введите URL фотографии</h3>
            <input
              type="text"
              placeholder="Введите URL фото"
              value={imageUrl}
              onChange={handleUrlChange}
              className={styles.imageUrlInput}
            />
            <div className={styles.modalButtons}>
              <button onClick={saveImageUrlToDatabase} className={styles.saveButton}>Сохранить</button>
              <button onClick={closeModal} className={styles.closeButton}>Отмена</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
