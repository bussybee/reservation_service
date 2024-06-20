import React, { useState } from 'react';
import styles from './AdminPanel.module.css';
import BookingRequests from './BookingRequests';
import ClientInfo from './ClientInfo';
import EditCenters from './EditCenters';
import { useNavigate } from 'react-router-dom';

const AdminPanel = ({ setIsAuthenticated }) => {
  const [activeTab, setActiveTab] = useState('bookingRequests');
  const navigate = useNavigate();
  const [profilePicture, setProfilePicture] = useState(null);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

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
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                id="fileInput"
              />
              <label htmlFor="fileInput" className={styles.uploadButton}>Выбрать файл</label>
            </div>
            <button onClick={onClickLogout} className={styles.buttonLogout}>
              Выйти
            </button>
          </div>
          <div className={styles.userData}>
            <h2>Данные пользователя</h2>
            <p>
              <strong>Фамилия:</strong> Денисов
            </p>
            <p>
              <strong>Имя:</strong> Константин
            </p>
            <p>
              <strong>Почта:</strong> roma81186@gmail.com
            </p>
            <p>
              <strong>Телефон:</strong> +7-980-783-85-57
            </p>
            <p>
              <strong>Пол:</strong> Мужской
            </p>
            <p>
              <strong>Возраст:</strong> 20 лет
            </p>
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
              <li className={activeTab === 'editCenters' ? styles.active : ''} onClick={() => handleTabClick('editCenters')}>
                Редактировать центры
              </li>
            </ul>
          </div>
          <div className={styles.adminTabContent}>
            {activeTab === 'bookingRequests' && <BookingRequests />}
            {activeTab === 'clientInfo' && <ClientInfo />}
            {activeTab === 'editCenters' && <EditCenters />}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminPanel;
