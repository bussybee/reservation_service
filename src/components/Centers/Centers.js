import React, { useState, useEffect } from 'react';
import './Centers.css'; // Подключаем файл стилей для страницы Centers

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

    return (
        <div className="centers-page">
            {/* Автономная карусель */}
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

            {/* Заголовок */}
            <h1 className="category-header">Выберите Категорию</h1>

            {/* Разделение страницы */}
            <div className="content-wrapper">
                {/* Картинка слева */}
                <div className="image-container">
                    <img src="path_to_your_image" alt="Center" className='center-image' />
                </div>

                {/* Текст и кнопка справа */}
                <div className="text-and-button">
                    <button className="transparent-button">Какая-то инфа о фитнесе, 
                    при нажатии на кнопку переходит на список центров</button>
                </div>
            </div>

            <div className="second-content-wrapper">
                {/* Текст слева */}
                <div className="text-and-button">
                    <button className="transparent-button">Какая-то инфа о спа, 
                    при нажатии на кнопку переходит на список центровр</button>
                </div>

                {/* Картинка справа */}
                <div className="image-container">
                    <img src="path_to_your_image" alt="Center" className='center-image' />
                </div>
            </div>

            <div className="third-content-wrapper">
                {/* Картинка справа */}
                <div className="image-container">
                    <img src="path_to_your_image" alt="Center" className='center-image' />
                </div>

                {/* Текст слева */}
                <div className="text-and-button">
                    <button className="transparent-button">Какая-то инфа о салонах красоты, 
                    при нажатии на кнопку переходит на список центров</button>
                </div>
            </div>
        </div>
    );
}

export default CentersPage;
