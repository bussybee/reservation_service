import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './Navigation.js';
import HomePage from './components/HomePage.js';
import Centers from './components/Centers';
import Feedback from './components/Feedback';
import PersonalAccount from './components/PersonalAccount';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/centers" element={<Centers />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path='/personalaccount' element={<PersonalAccount />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
