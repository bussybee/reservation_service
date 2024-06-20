import React, { useState } from 'react';

function BookingRequests() {
  const [requests, setRequests] = useState([]);

  // Функции для принятия или отклонения брони
  const acceptBooking = (bookingId) => {
    // Логика принятия брони
  };

  const rejectBooking = (bookingId) => {
    // Логика отклонения брони
  };

  return (
    <div className="booking-requests">
      <h3>Заявки на бронирование</h3>
      <ul>
        {requests.map((request) => (
          <li key={request.id}>
            <p><strong>Дата бронирования:</strong> {request.bookingDate}</p>
            <p><strong>Центр:</strong> {request.center}</p>
            <p><strong>Услуга:</strong> {request.service}</p>
            <p><strong>Клиент:</strong> {request.firstName} {request.lastName}</p>
            <p><strong>Email:</strong> {request.email}</p>
            <p><strong>Телефон:</strong> {request.phone}</p>
            <button onClick={() => acceptBooking(request.id)}>Принять</button>
            <button onClick={() => rejectBooking(request.id)}>Отклонить</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookingRequests;
