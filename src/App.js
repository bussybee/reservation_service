import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navigation from './Navigation';
import { UserProvider } from './utils/UserContext';
import HomePage from './components/HomePage/HomePage';
import Centers from './components/Centers/Centers';
import Feedback from './components/Feedback/Feedback';
import PersonalAccount from './components/PersonalAccount/PersonalAccount';
import RegistrationPage from './components/Registration/Registration';
import LoginPage from './components/Login/Login';
import Fitness from './components/Fitness/Fitness';
import SpaCenters from './components/SpaCenters/SpaCenters';
import BeautySalons from './components/BeautySalons/BeautySalons';
import FitnessPage from './components/FitnessPage/FitnessPage';
import SetApp from './components/Booking/SetApp';
import FavoritesPage from './components/FavoritesPage/FavoritesPage';
import HistoryPage from './components/HistoryPage/HistoryPage';
import AdminPanel from './components/AdminPanel/AdminPanel';
import BookingRequests from './components/AdminPanel/BookingRequests';
import ClientInfo from './components/AdminPanel/ClientInfo';
import EditCenters from './components/AdminPanel/EditCenters';
import {UserProvider} from './utils/UserContext';
import CreateCenter from './components/AdminPanel/CreateCenter';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(
        localStorage.getItem('isAuthenticated') === 'true'
    );
    useEffect(() => {
        localStorage.setItem('isAuthenticated', isAuthenticated);
    }, [isAuthenticated]);
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true'
  );


  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated);
  }, [isAuthenticated]);

    return (
        <UserProvider>
            <Router>
                <div className="App">
                    <Navigation isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>
                    <Routes>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/centers" element={<Centers/>}/>
                        <Route path="/feedback" element={<Feedback/>}/>
                        <Route path="/fitness" element={<Fitness/>}/>
                        <Route path="/personalaccount"
                               element={<PersonalAccount setIsAuthenticated={setIsAuthenticated}/>}/>
                        <Route path="/registrationPage"
                               element={<RegistrationPage setIsAuthenticated={setIsAuthenticated}/>}/>
                        <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated}/>}/>
                        <Route path="/spaCenters" element={<SpaCenters/>}/>
                        <Route path="/beautySalons" element={<BeautySalons/>}/>
                        <Route path="/fitnessPage" element={<FitnessPage/>}/>
                        <Route path="/booking" element={<SetApp/>}/>
                        <Route path="/favoritesPage" element={<FavoritesPage/>}/>
                        <Route path="/historyPage" element={<HistoryPage/>}/>
                        <Route path="/adminPanel" element={<AdminPanel/>}/>
                        <Route path="/bookingRequests" element={<BookingRequests/>}/>
                        <Route path="/clientInfo" element={<ClientInfo/>}/>
                        <Route path="editCenters" element={<EditCenters/>}/>

                    </Routes>
                </div>
            </Router>
        </UserProvider>
    );
  return (
    <UserProvider>
    <Router>
      <div className="App">
        <Navigation isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/centers" element={<Centers />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/fitness" element={<Fitness />} />
          <Route path="/personalaccount" element={<PersonalAccount setIsAuthenticated={setIsAuthenticated}/>} />
          <Route path="/registrationPage" element={<RegistrationPage setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated}/>} />
          <Route path="/spaCenters" element={<SpaCenters />} />
          <Route path="/beautySalons" element={<BeautySalons />} />
          <Route path="/fitnessPage" element={<FitnessPage />} />
          <Route path="/booking" element={<SetApp />} />
          <Route path="/favoritesPage" element={<FavoritesPage/>} />
          <Route path="/historyPage" element={<HistoryPage/>} />
          <Route path="/adminPanel" element={<AdminPanel/>} />
          <Route path="/bookingRequests" element={<BookingRequests/>} />
          <Route path="/clientInfo" element={<ClientInfo/>} />
          <Route path="editCenters" element={<EditCenters/>} />
          <Route path="createCenter" element={<CreateCenter/>} />
          
        </Routes>
      </div>
    </Router>
    </UserProvider>
  );
}

export default App;
