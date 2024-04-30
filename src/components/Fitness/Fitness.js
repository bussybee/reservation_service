import React from 'react';
import './Fitness.css';
import { useNavigate } from 'react-router-dom';
function Fitness() {
    const fitnessCenters = [
        {
            id: 1,
            name: 'Fitness Center 1',
            address: 'Address 1',
            rating: 4.5,
            image: 'https://via.placeholder.com/400x300'
        },
        {
            id: 2,
            name: 'Fitness Center 2',
            address: 'Address 2',
            rating: 4.8,
            image: 'https://via.placeholder.com/400x300'
        },
    ];

    const navigate = useNavigate();

    const handleCenterButtonClick = () => {
        navigate("/fitnessPage");
    };

    return (
        <div className="fitness-centers-page">
            <h1 className="page-title">Фитнес центры Воронежа</h1>

            <div className="fitness-centers-container">
                {fitnessCenters.map(center => (
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
