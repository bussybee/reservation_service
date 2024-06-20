import React, { useState } from 'react';
import BookingPage from './BookingPage';

function SetApp() {
    const [selectedService] = useState('Йога');
    const [selectedDate] = useState('2024-05-15');
    const [selectedTime] = useState('10:00 - 11:30');
    const [serviceCost] = useState(500);

    return (
        <div className="Set">
            <BookingPage 
                selectedService={selectedService}
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                serviceCost={serviceCost}
            />
        </div>
    );
}

export default SetApp;
