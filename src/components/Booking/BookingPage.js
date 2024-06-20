import React, { useState } from 'react';
import './BookingPage.css';

function BookingPage({ selectedService, selectedDate, selectedTime, serviceCost }) {
  const [showModal, setShowModal] = useState(false);

  const handleBooking = () => {
    setShowModal(true);
    setTimeout(() => setShowModal(false), 3000); // Закрытие окна через 3 секунды
  };

  return (
    <div className="booking-page">
      <h1 className="booking-title">Оформление бронирования</h1>
      <div className="service-type">
        <p><strong>Тип услуги:</strong> {selectedService}</p>
      </div>
      <div className="booking-details">
        <p><strong>Дата:</strong> {selectedDate}</p>
        <p><strong>Время:</strong> {selectedTime}</p>
        <p><strong>Стоимость:</strong> {serviceCost}</p>
      </div>
      <button className="booking-button" onClick={handleBooking}>
        Забронировать
      </button>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Бронирование успешно!</h2>
            <p>Ваше бронирование было успешно оформлено.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookingPage;
