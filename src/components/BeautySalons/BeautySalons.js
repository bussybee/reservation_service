import React from 'react';
import './BeautySalons.css';

function BeautySalons() {
    const beautySalons = [
        {
            id: 1,
            name: 'Beauty Salons 1',
            address: 'Address 1',
            rating: 4.5,
            image: 'https://via.placeholder.com/400x300'
        },
        {
            id: 2,
            name: 'Beauty Salons 2',
            address: 'Address 2',
            rating: 4.8,
            image: 'https://via.placeholder.com/400x300'
        },
    ];

    return (
        <div className="beauty-salon-page">
            <h1 className="page-title">Салоны красоты Воронежа</h1>

            <div className="beauty-salon-container">
                {beautySalons.map(center => (
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
