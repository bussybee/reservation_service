import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        id: null,
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        gender: '',
        age: null,
        isAuthenticated: false,
    });

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

        if (storedUserId) {
            setUser(prevUser => ({
                ...prevUser,
                id: storedUserId,
                isAuthenticated
            }));
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
