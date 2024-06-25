import React from 'react';
import './BeautySalons.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";

function BeautySalons() {

    const [data, setData] = useState([])

      useEffect(() => {
        axios
          .get("http://localhost:8081/beautySalons")
          .then((res) => {
            console.log(res);
            setData(res.data)
          })
      });
        const navigate = useNavigate();

    return (
        <div className="beauty-salon-page">
            <h1 className="page-title">Салоны красоты Воронежа</h1>

            <div className="beauty-salon-container">
                {data.map(center => (
                    <div key={center.id} className="beauty-salon-card">
                        <div className="center-image-container">
                            <img src={center.image} alt={center.name} className="center-image" />
                        </div>
                        <div className="center-info">
                            <h2 className="center-name">{center.name}</h2>
                            <p className="center-address">{center.address}</p>
                            <p className="center-rating">Рейтинг: {center.rating}</p>
                        </div>
                        <div className="center-button">
                            <button className="transparent-button-bs">Подробнее</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BeautySalons;
