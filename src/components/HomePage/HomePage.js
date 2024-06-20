import React, { useState } from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom';
import logoImage from '/Users/konstantindenisov/my-app/src/imrbYjjHAjk.ico';

function HomePage() {

    const slides = [
        'https://www.on-stage.de/fileadmin/user_upload/slider_kondi_gross.png',
        'https://a-static.besthdwallpaper.com/muscular-man-lifting-weights-at-gym-wallpaper-1920x600-92013_57.jpg',
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
                        <img src="https://sun1-20.userapi.com/s/v1/ig2/CxizVRAo7_rZGGpTNRmQsVVWAfWx9KMW8NIOLb6pU1wbHFjnNynjVFfMIIafs6u5DBpH17xhjao3L1A9Xm-HXpBC.jpg?size=200x200&quality=95&crop=36,37,441,441&ava=1" alt="Fitness" className="rounded-image" />
                        <p>Фитнес центры</p>
                    </div>
                    <div className="image-container">
                        <img src="https://sun1-83.userapi.com/s/v1/if2/GDZDgI-4UtLCuDEoFAS2k6yGi5VSNKr9qUvH0Khc49gu7nDL0coH7xrUc0QPLci52q6bl9G_qgTlq1k3pT4zmlF6.jpg?size=200x200&quality=96&crop=3,0,997,1000&ava=1" alt="Spa Salons" className="rounded-image" />
                        <p>Спа салоны</p>
                    </div>
                    <div className="image-container">
                        <img src="https://sun1-22.userapi.com/s/v1/ig2/4sEbxB5SUN1nYmh5lXjTGmExqQJyn8d0A4gKfc3RGY6MEpTkBWXAUbUjnva97f-fSCF9MtasYI-7f74FeTbhOGfU.jpg?size=200x200&quality=96&crop=31,0,841,841&ava=1" alt="Beauty Salons" className="rounded-image" />
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
                    <img src={logoImage} alt="Логотип" width="100" height="100" />
                </div>
            </div>
        </div>
    );
}

export default HomePage;