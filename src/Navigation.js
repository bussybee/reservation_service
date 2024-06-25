import React, { useState, useEffect, useContext } from 'react';
import './Navigation.css';
import { Link } from 'react-router-dom';
import logoImage from './imrbYjjHAjk.ico'; // Путь к изображению логотипа
import { UserContext } from './utils/UserContext';

function Navigation() {
    const { user, setUser } = useContext(UserContext);
    const [activeButton, setActiveButton] = useState('');

    useEffect(() => {
        const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
        if (isAuthenticated !== user.isAuthenticated) {
            setUser(prevUser => ({
                ...prevUser,
                isAuthenticated
            }));
        }
    }, [setUser, user.isAuthenticated]);

    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
    };

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        setUser(prevUser => ({
            ...prevUser,
            isAuthenticated: false,
            id: null
        }));
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
                    {user.isAuthenticated ? (
                        <>
                            <li>
                                <Link to="/personalaccount" className="nav-button">
                                    Личный кабинет
                                </Link>
                            </li>
                            <li>
                                <button onClick={handleLogout} className="nav-button">Выйти</button>
                            </li>
                        </>
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
