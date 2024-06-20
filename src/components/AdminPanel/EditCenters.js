import React, { useState } from 'react';
import styles from './AdminPanel.module.css';

function EditCenters() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [centers, setCenters] = useState([]);

  const categories = ['Спа центры', 'Фитнес центры', 'Салоны красоты'];

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    // Загрузка центров выбранной категории
  };

  const editCenter = (centerId) => {
    // Логика редактирования центра
  };

  const deleteReview = (centerId, reviewId) => {
    // Логика удаления отзыва
  };

  return (
    <div className={styles.editCenters}>
      <h3>Редактировать центры</h3>
      <div className={styles.categories}>
        {categories.map((category, index) => (
          <button key={index} onClick={() => handleCategoryChange(category)}>
            {category}
          </button>
        ))}
      </div>
      <div className={styles.centersList}>
        {centers.map((center) => (
          <div key={center.id}>
            <h4>{center.name}</h4>
            <p><strong>Адрес:</strong> {center.address}</p>
            <img src={center.photo} alt="Фото центра" />
            {/* Дополнительные поля для редактирования */}
            <button onClick={() => editCenter(center.id)}>Редактировать центр</button>
            <ul>
              {center.reviews.map((review) => (
                <li key={review.id}>
                  <p><strong>Отзыв:</strong> {review.comment}</p>
                  <button onClick={() => deleteReview(center.id, review.id)}>Удалить отзыв</button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className={styles.createCenter}>
        <h4>Создать новый центр</h4>
        {/* Форма для создания нового центра */}
      </div>
    </div>
  );
}

export default EditCenters;