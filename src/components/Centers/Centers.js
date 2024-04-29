import React, { useState, useEffect } from 'react';
import './Centers.css';
import { useNavigate } from 'react-router-dom';

function CentersPage() {
    const slides = [
        'https://via.placeholder.com/1920x600?text=Slide+1',
        'https://via.placeholder.com/1920x600?text=Slide+2',
        'https://via.placeholder.com/1920x600?text=Slide+3',
    ];

    const nextSlide = () => {
        const nextIndex = currentSlide === slides.length - 1 ? 0 : currentSlide + 1;
        setCurrentSlide(nextIndex);
    };

    const prevSlide = () => {
        const prevIndex = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
        setCurrentSlide(prevIndex);
    };

    const [currentSlide, setCurrentSlide] = useState(0);

    const navigate = useNavigate();

    const handleFitnessButtonClick = () => {
        navigate("/fitness");
    };

    const handleSpaButtonClick = () => {
        navigate("/spaCenters");
    };

    const handleBsButtonClick = () => {
        navigate("/beautySalons");
    };


    return (
        <div className="centers-page">
            <div className="carousel-container">
                <div className="carousel">
                    <div className="slides" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                        {slides.map((slide, index) => (
                            <div key={index} className="slide" style={{ backgroundImage: `url(${slide})` }}></div>
                        ))}
                    </div>
                </div>
                <button className="prev" onClick={prevSlide}>{"<"}</button>
                <button className="next" onClick={nextSlide}>{">"}</button>
            </div>

            <h1 className="category-header">Выберите Категорию</h1>

            <div className="content-wrapper">
                <div className="image-container">
                    <img src="path_to_your_image" alt="Center" className='center-image' />
                </div>

                <div className="text-and-button">
                    <button className="transparent-button" onClick={handleFitnessButtonClick}>Какая-то инфа о фитнесе,
                        при нажатии на кнопку переходит на список центров</button>
                </div>
            </div>

            <div className="content-wrapper">
                <div className="text-and-button">
                    <button className="transparent-button"onClick={handleSpaButtonClick}>Какая-то инфа о спа,
                        при нажатии на кнопку переходит на список центровр</button>
                </div>

                <div className="image-container">
                    <img src="path_to_your_image" alt="Center" className='center-image' />
                </div>
            </div>

            <div className="content-wrapper">
                <div className="image-container">
                    <img src="path_to_your_image" alt="Center" className='center-image' />
                </div>

                <div className="text-and-button">
                    <button className="transparent-button" onClick={handleBsButtonClick}>Какая-то инфа о салонах красоты,
                        при нажатии на кнопку переходит на список центров</button>
                </div>
            </div>
        </div>
    );
}

export default CentersPage;
