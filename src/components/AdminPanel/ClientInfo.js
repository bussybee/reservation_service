// ClientInfo.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './AdminPanel.module.css';

function ClientInfo() {
  const [clients, setClients] = useState([]);

  // Получаем список всех клиентов при загрузке компонента
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get('http://localhost:8081/user'); 
        console.log(response.data); // Запрос всех пользователей
        setClients(response.data); // Сохраняем пользователей в состояние
      } catch (error) {
        console.error('Ошибка при получении списка клиентов:', error);
      }
    };

    fetchClients();
  }, []);

  // Удаление клиента по ID
  const deleteClient = async (id) => {
    const confirmDelete = window.confirm('Вы уверены, что хотите удалить этого клиента?');
    if (!confirmDelete) return;

    console.log('Deleting client with ID:', id); // Логируем ID клиента
    try {
        await axios.delete(`http://localhost:8081/user/${id}`); // DELETE запрос
        setClients(clients.filter(client => client.userId !== id));  // Обновляем состояние
        alert('Клиент успешно удален.');
    } catch (error) {
        console.error('Ошибка при удалении клиента:', error);
        alert('Произошла ошибка при удалении клиента.');
    }
  };

  return (
    <div className={styles.clientInfo}>
      <h3>Информация о клиентах</h3>
      <ul>
        {clients.map((client) => (
          <li key={client.userId} className={styles.clientItem}>
            <p><strong>Фамилия:</strong> {client.lastName}</p>
            <p><strong>Имя:</strong> {client.firstName}</p>
            <p><strong>Email:</strong> {client.email}</p>
            <p><strong>Телефон:</strong> {client.phoneNumber}</p>
            <button className={styles.deleteButton} onClick={() => deleteClient(client.userId)}>Удалить клиента</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ClientInfo;
