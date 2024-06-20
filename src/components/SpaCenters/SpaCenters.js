import React from 'react';
import './SpaCenters.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";

function SpaCenters() {


    const [data, setData] = useState([])

      useEffect(() => {
        axios
          .get("https://bbaj3hbmo0dg8o6gkctp.containers.yandexcloud.net/spaCenters")
          .then((res) => {
            console.log(res);
            setData(res.data)
          })
      });
        const navigate = useNavigate();

    return (
        <div className="spa-centers-page">
            <h1 className="page-title">Спа центры Воронежа</h1>

            <div className="spa-centers-container">
                {data.map(center => (
                    <div key={center.id} className="spa-center-card">
                        <div className="center-image-container">
                            <img src={center.image} alt={center.name} className="center-image" />
                        </div>
                        <div className="center-info">
                            <h2 className="center-name">{center.name}</h2>
                            <p className="center-address">{center.address}</p>
                            <p className="center-rating">Рейтинг: {center.rating}</p>
                        </div>
                        <div className="center-button">
                            <button className="transparent-button-spa">Подробнее</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SpaCenters;
