import React, { useState } from 'react';
import styles from './CreateCenter.module.css';
import axios from 'axios';

const CreateCenter = () => {
  const [newCenter, setNewCenter] = useState({
    name: '',
    address: '',
    image: '', // Поле для URL фото
    type: '',
  });

  const categories = ['SPA_SALON', 'FITNESS', 'BEAUTY_SALON'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCenter((prevCenter) => ({
      ...prevCenter,
      [name]: value,
    }));
  };

  const handleAddCenter = async (e) => {
    e.preventDefault();
    if (newCenter.name && newCenter.address && newCenter.type && newCenter.image) {
        try {
            const response = await axios.post("http://89.169.150.251:8081/institution", {
                name: newCenter.name,
                address: newCenter.address,
                category: newCenter.type,
                photo: newCenter.image, // URL изображения
            }, {
                headers: {
                    "Content-Type": "application/json",
                }
            });

        if (response.status === 201) {
          alert('Центр успешно создан!');
          setNewCenter({
            name: '',
            address: '',
            image: '',
            type: '',
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
              name="type"
              value={newCenter.type}
              onChange={handleInputChange}
              className={styles.select}
              required
            >
              <option value="">Выберите категорию</option>
              {categories.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>Ссылка на фото</label>
            <input
              type="text"
              name="image"
              value={newCenter.image}
              onChange={handleInputChange}
              className={styles.input}
              required
              placeholder="Введите URL фото центра"
            />
            {newCenter.image && (
              <img src={newCenter.image} alt="Фото центра" className={styles.previewImage} />
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