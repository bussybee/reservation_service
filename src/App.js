import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './Navigation';
import HomePage from './components/HomePage/HomePage';
import Centers from './components/Centers/Centers';
import Feedback from './components/Feedback/Feedback';
import PersonalAccount from './components/PersonalAccount/PersonalAccount';
import RegistrationPage from './components/Registration/Registration';
import LoginPage from './components/Login/Login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true'
  );

  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated);
  }, [isAuthenticated]);

  return (
    <Router>
      <div className="App">
        <Navigation isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/centers" element={<Centers />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/personalaccount" element={<PersonalAccount setIsAuthenticated={setIsAuthenticated}/>} />
          <Route path="/registrationPage" element={<RegistrationPage setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated}/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
