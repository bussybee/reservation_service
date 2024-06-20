import React from 'react';
import './Fitness.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";

function Fitness() {

const [data, setData] = useState([])

  useEffect(() => {
    axios
      .get("https://bbaj3hbmo0dg8o6gkctp.containers.yandexcloud.net/fitness")
      .then((res) => {
        setData(res.data)
      })
  });
    const navigate = useNavigate();

    const handleCenterButtonClick = (id) => {
        console.log("pressed ");
        navigate("/fitnessPage");
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
                            <button className="transparent-button-fit" onClick={handleCenterButtonClick}>Подробнее</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Fitness;
