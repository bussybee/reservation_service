import React from 'react';
import './SpaCenters.css';

function SpaCenters() {
    const spaCenters = [
        {
            id: 1,
            name: 'Spa Center 1',
            address: 'Address 1',
            rating: 4.5,
            image: 'https://via.placeholder.com/400x300'
        },
        {
            id: 2,
            name: 'Spa Center 2',
            address: 'Address 2',
            rating: 4.8,
            image: 'https://via.placeholder.com/400x300'
        },
    ];

    return (
        <div className="spa-centers-page">
            <h1 className="page-title">Спа центры Воронежа</h1>

            <div className="spa-centers-container">
                {spaCenters.map(center => (
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
