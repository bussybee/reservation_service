import React, { useState, useEffect } from 'react';
import './Centers.css';
import { useNavigate } from 'react-router-dom';

function CentersPage() {
    const slides = [
        'https://www.on-stage.de/fileadmin/user_upload/slider_kondi_gross.png',
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
                    <img src="https://3.bp.blogspot.com/-lj5MFa7s6pI/WmipG21jT2I/AAAAAAAAAbw/F0xKr63Iovk3MVeufz9me5ZW2-JildvnwCLcBGAs/s640/build-ripped-triceps-with-this-routine-desktop-MUSCLETECH2.jpg" alt="Center" className='center-image' />
                </div>

                <div className="text-and-button">
                    <button className="transparent-button" onClick={handleFitnessButtonClick}>Фитнес центры Воронежа</button>
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
