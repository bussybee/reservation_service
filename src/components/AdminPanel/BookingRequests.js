import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './AdminPanel.module.css'; // Подключаем стили как модуль

function BookingRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://89.169.150.251:8081/reservations');
        console.log(response.data);
        setRequests(response.data); // Сохраняем заявки в состояние
      } catch (error) {
        console.error('Ошибка при получении заявок на бронирование:', error);
      }
    };

    fetchRequests();
  }, []);

  const acceptBooking = async (id) => {  
    console.log('Booking ID:', id);
    try {
      const response = await axios.patch(`http://89.169.150.251:8081/reservations/${id}/approve`);
      if (response.status === 200) {
        setRequests(requests.map(request =>
          request.id === id ? { ...request, approved: true } : request
        ));
        alert('Бронирование успешно принято.');
      }
    } catch (error) {
      console.error('Ошибка при принятии бронирования:', error);
      alert('Произошла ошибка при принятии бронирования.');
    }
  };

  const rejectBooking = async (bookingId) => {
    const confirmDelete = window.confirm('Вы уверены, что хотите отклонить это бронирование?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://89.169.150.251:8081/reservations/${bookingId}`);
      setRequests(requests.filter(request => request.id !== bookingId));
      alert('Бронирование успешно отклонено.');
    } catch (error) {
      console.error('Ошибка при отклонении бронирования:', error);
      alert('Произошла ошибка при отклонении бронирования.');
    }
  };

  return (
    <div className={styles.bookingRequests}>
      <h3 className={styles.bookingRequestsTitle}>Заявки на бронирование</h3>
      <ul className={styles.bookingRequestsList}>
        {requests.map((request) => (
          <li key={request.id} className={styles.bookingRequestItem}>
            <p><strong>Дата бронирования:</strong> {request.createdAt}</p>
            <p><strong>Центр:</strong> {request.institutionName}</p>
            <p><strong>Услуга:</strong> {request.courseName}</p>
            <p><strong>Клиент:</strong> {request.clientName}</p>
            <p><strong>Email:</strong> {request.email}</p>
            <p><strong>Телефон:</strong> {request.phone}</p>
            <button className={styles.acceptButton} onClick={() => acceptBooking(request.id)}>Принять</button>
            <button className={`${styles.rejectButton} ${styles.reject}`} onClick={() => rejectBooking(request.id)}>Отклонить</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookingRequests;
