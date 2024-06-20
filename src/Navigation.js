import React, { useState, useEffect } from 'react';
import './Navigation.css';
import { Link } from 'react-router-dom';
import logoImage from '/Users/konstantindenisov/my-app/src/imrbYjjHAjk.ico'; // Путь к изображению логотипа

function Navigation({ isAuthenticated, setIsAuthenticated }) {
    const [activeButton, setActiveButton] = useState('');
    useEffect(() => {
        setIsAuthenticated(localStorage.getItem('isAuthenticated') === 'true');
    }, [setIsAuthenticated]);

    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
    };

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        setIsAuthenticated(false);
    };

    return (
        <header className="header">
            <div className="logo">
                <img src={logoImage} alt="Логотип" width="50" height="50" /> {/* Добавляем изображение логотипа */}
            </div>
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
                    {isAuthenticated ? (
                        <li>
                            <Link to="/personalaccount" className="nav-button">
                                Личный кабинет
                            </Link>
                        </li>
                    ) : (
                        <li>
                            <Link to="/registrationPage" className="nav-button">
                                Вход/Регистрация
                            </Link>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
}

export default Navigation;
