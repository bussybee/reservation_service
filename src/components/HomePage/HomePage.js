import React, { useState } from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom';

function HomePage() {

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

    const [activeButton, setActiveButton] = useState('');

    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
    };


    return (
        <div className="page-container">
            <div className="App">


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


                <div className="image-grid">
                    <div className="image-container">
                        <img src="https://via.placeholder.com/200x200" alt="Fitness" className="rounded-image" />
                        <p>Фитнес центры</p>
                    </div>
                    <div className="image-container">
                        <img src="https://via.placeholder.com/200x200" alt="Spa Salons" className="rounded-image" />
                        <p>Спа салоны</p>
                    </div>
                    <div className="image-container">
                        <img src="https://via.placeholder.com/200x200" alt="Beauty Salons" className="rounded-image" />
                        <p>Салоны красоты</p>
                    </div>
                </div>
                
                <div className="contact-and-logo">
                    <div className="contact-info">
                        <p>Остались вопросы?<br /></p>
                        <Link
                            to="/feedback"
                            className={`nav-button-call ${activeButton === 'button 3' ? 'active' : ''}`}
                            onClick={() => handleButtonClick('button 3')}
                        >
                            Свяжитесь с нами!
                        </Link>
                    </div>
                    <img src="path_to_your_logo_image" alt="Логотип" className="logo-image" />
                </div>
            </div>
        </div>
    );
}

export default HomePage;