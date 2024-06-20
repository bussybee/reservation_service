import React, { useState } from 'react';

function ClientInfo() {
  const [clients, setClients] = useState([]);

  const deleteClient = (clientId) => {
    // Логика удаления клиента
  };

  return (
    <div className="client-info">
      <h3>Информация о клиентах</h3>
      <ul>
        {clients.map((client) => (
          <li key={client.id}>
            <p><strong>Фамилия:</strong> {client.lastName}</p>
            <p><strong>Имя:</strong> {client.firstName}</p>
            <p><strong>Email:</strong> {client.email}</p>
            <p><strong>Телефон:</strong> {client.phone}</p>
            <button onClick={() => deleteClient(client.id)}>Удалить клиента</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ClientInfo;
