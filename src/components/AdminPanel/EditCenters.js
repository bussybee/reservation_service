import React, { useState } from 'react';
import styles from './AdminPanel.module.css';

function EditCenters() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [centers, setCenters] = useState([]);
  const [newCenter, setNewCenter] = useState({
    name: '',
    address: '',
    photo: null,
    category: '',
    reviews: [],
  });

  const categories = ['Спа центры', 'Фитнес центры', 'Салоны красоты'];

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    // Логика загрузки центров выбранной категории (например, запрос к API)
  };

  const editCenter = (centerId) => {
    // Логика редактирования центра
    console.log('Редактирование центра:', centerId);
  };

  const deleteReview = (centerId, reviewId) => {
    // Логика удаления отзыва
    console.log(`Удаление отзыва ${reviewId} в центре ${centerId}`);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCenter((prevCenter) => ({
      ...prevCenter,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewCenter((prevCenter) => ({
          ...prevCenter,
          photo: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddCenter = (e) => {
    e.preventDefault();
    if (newCenter.name && newCenter.address && newCenter.category) {
      setCenters((prevCenters) => [...prevCenters, newCenter]);
      setNewCenter({
        name: '',
        address: '',
        photo: null,
        category: '',
        reviews: [],
      });
      alert('Центр успешно создан!');
    } else {
      alert('Пожалуйста, заполните все поля.');
    }
  };

  return (
    <div className={styles.editCenters}>
      <h3>Редактировать центры</h3>
      
      {/* Выбор категории */}
      <div className={styles.categories}>
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => handleCategoryChange(category)}
            className={selectedCategory === category ? styles.active : ''}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Список центров */}
      <div className={styles.centersList}>
        {centers
          .filter((center) => center.category === selectedCategory)
          .map((center) => (
            <div key={center.name}>
              <h4>{center.name}</h4>
              <p><strong>Адрес:</strong> {center.address}</p>
              {center.photo && <img src={center.photo} alt="Фото центра" />}
              <button onClick={() => editCenter(center.name)}>Редактировать центр</button>
              <ul>
                {center.reviews.map((review, index) => (
                  <li key={index}>
                    <p><strong>Отзыв:</strong> {review.comment}</p>
                    <button onClick={() => deleteReview(center.name, review.id)}>Удалить отзыв</button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
      </div>

      {/* Форма для создания нового центра */}
      <div className={styles.createCenter}>
        <h4>Создать новый центр</h4>
        <form onSubmit={handleAddCenter} className={styles.form}>
          <div>
            <label>Название центра</label>
            <input
              type="text"
              name="name"
              value={newCenter.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Адрес</label>
            <input
              type="text"
              name="address"
              value={newCenter.address}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Категория</label>
            <select
              name="category"
              value={newCenter.category}
              onChange={handleInputChange}
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
          <div>
            <label>Фото</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            {newCenter.photo && <img src={newCenter.photo} alt="Фото центра" style={{ width: '100px' }} />}
          </div>
          <button type="submit" className={styles.submitButton}>Создать центр</button>
        </form>
      </div>
    </div>
  );
}

export default EditCenters;
