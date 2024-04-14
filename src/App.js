import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './Navigation.js';
import HomePage from './components/HomePage/HomePage.js';
import Centers from './components/Centers/Centers.js';
import Feedback from './components/Feedback/Feedback.js';
import PersonalAccount from './components/PersonalAccount/PersonalAccount.js';
import RegistrationPage from './components/Registration/Registration.js';
import LoginPage from './components/Login/Login.js';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/centers" element={<Centers />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/personalaccount" element={<PersonalAccount />} />
          <Route path="registrationPage" element={<RegistrationPage />} />
          <Route path="login" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
