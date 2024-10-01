import React, { useState } from 'react';
import styles from './CreateCenter.module.css';
import axios from 'axios';

const CreateCenter = () => {
  const [newCenter, setNewCenter] = useState({
    name: '',
    address: '',
    photoUrl: '', // Изменяем название переменной на photoUrl
    category: '',
  });

  const categories = ['Спа центры', 'Фитнес центры', 'Салоны красоты'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCenter((prevCenter) => ({
      ...prevCenter,
      [name]: value,
    }));
  };


  const handleAddCenter = async (e) => {
    e.preventDefault();
    if (newCenter.name && newCenter.address && newCenter.category && newCenter.photoUrl) {
        try {
            const response = await axios.post("http://localhost:8081/institution", {
                name: newCenter.name,
                address: newCenter.address,
                category: newCenter.category,
                photo: newCenter.photoUrl, // URL изображения
            }, {
                headers: {
                    "Content-Type": "application/json",
                }
            });

            if (response.status === 201) {
                alert('Центр успешно создан!');

                // Сбрасываем форму
                setNewCenter({
                    name: '',
                    address: '',
                    photoUrl: '',
                    category: '',
                });
            } else {
                alert('Ошибка при создании центра.');
            }
        } catch (error) {
            console.error('Ошибка при создании центра:', error);
            alert('Произошла ошибка при создании центра.');
        }
    } else {
        alert('Пожалуйста, заполните все поля.');
    }
};


  return (
    <div className={styles.createCenterContainer}>
      <div className={styles.formWrapper}>
        <h2>Создать новый центр</h2>
        <form onSubmit={handleAddCenter} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Название центра</label>
            <input
              type="text"
              name="name"
              value={newCenter.name}
              onChange={handleInputChange}
              className={styles.input}
              required
              placeholder="Введите название центра"
            />
          </div>
          <div className={styles.formGroup}>
            <label>Адрес</label>
            <input
              type="text"
              name="address"
              value={newCenter.address}
              onChange={handleInputChange}
              className={styles.input}
              required
              placeholder="Введите адрес центра"
            />
          </div>
          <div className={styles.formGroup}>
            <label>Категория</label>
            <select
              name="category"
              value={newCenter.category}
              onChange={handleInputChange}
              className={styles.select}
              required
            >
              <option value="">Выберите категорию</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>Ссылка на фото</label>
            <input
              type="text"
              name="photoUrl"
              value={newCenter.photoUrl}
              onChange={handleInputChange}
              className={styles.input}
              required
              placeholder="Введите URL фото центра"
            />
            {newCenter.photoUrl && (
              <img src={newCenter.photoUrl} alt="Фото центра" className={styles.previewImage} />
            )}
          </div>
          <button type="submit" className={styles.submitButton}>
            Создать центр
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCenter;
