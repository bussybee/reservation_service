import React, { useState } from 'react';
import './Navigation.css';
import { Link } from 'react-router-dom';

function Navigation() {
    const [activeButton, setActiveButton] = useState('');

    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
    };

    return (
        <header className="header">
            <div className="logo">Логотип</div>
            <nav className="navigation">
                <ul>
                    <li>
                        <Link
                            to="/"
                            className={`nav-button ${activeButton === 'button 1' ? 'active' : ''}`}
                            onClick={() => handleButtonClick('button 1')}
                        >
                            Главная
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/centers"
                            className={`nav-button ${activeButton === 'button 2' ? 'active' : ''}`}
                            onClick={() => handleButtonClick('button 2')}
                        >
                            Центры
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/feedback"
                            className={`nav-button ${activeButton === 'button 3' ? 'active' : ''}`}
                            onClick={() => handleButtonClick('button 3')}
                        >
                            Обратная связь
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/personalaccount"
                            className={`nav-button ${activeButton === 'button 4' ? 'active' : ''}`}
                            onClick={() => handleButtonClick('button 4')}
                        >
                            Личный кабинет
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Navigation;
