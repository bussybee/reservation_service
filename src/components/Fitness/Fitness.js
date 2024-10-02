import React, { useEffect, useState } from 'react';
import './Fitness.css';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function Fitness() {

  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://89.169.150.251:8081/fitness")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.error("Ошибка при загрузке данных:", err));
  }, []); // Пустой массив зависимостей для предотвращения бесконечного цикла

  const handleCenterButtonClick = (id) => {
    console.log("pressed ", id);
    navigate(`/fitnessPage/${id}`); // Переход на страницу конкретного фитнес-центра
  };

  return (
    <div className="fitness-centers-page">
      <h1 className="page-title">Фитнес центры Воронежа</h1>
      <div className="fitness-centers-container">
        {data.map(center => (
          <div key={center.id} className="fitness-center-card">
            <div className="center-image-container">
              <img src={center.image} alt={center.name} className="center-image" />
            </div>
            <div className="center-info">
              <h2 className="center-name">{center.name}</h2>
              <p className="center-address">{center.address}</p>
              <p className="center-rating">Рейтинг: {center.rating}</p>
            </div>
            <div className="center-button">
              <button className="transparent-button-fit" onClick={() => handleCenterButtonClick(center.id)}>
                Подробнее
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Fitness;
