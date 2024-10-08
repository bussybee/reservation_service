import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EditCenterList.css';

const EditCenterList = () => {
  const [centers, setCenters] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCenters = async () => {
      try {
        const response = await axios.get('http://89.169.150.251:8081/institution');
        setCenters(response.data);
      } catch (error) {
        console.error('Ошибка при получении данных о центрах:', error);
      }
    };
    fetchCenters();
  }, []);

  const handleEditClick = (id) => {
    navigate(`/adminPanel/editCenters/${id}`);
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/institution/${id}`);
      setCenters(centers.filter(center => center.id !== id));
    } catch (error) {
      console.error('Ошибка при удалении центра:', error);
    }
  };

  return (
    <div className="edit-center-list">
      <h2>Список центров для редактирования</h2>
      <ul>
        {centers.map(center => (
            <li key={center.id}>
              <p>{center.name} - {center.address}</p>
              <button onClick={() => handleEditClick(center.id)}>Редактировать</button>
              <button onClick={() => handleDeleteClick(center.id)}>Удалить</button>
            </li>
        ))}
      </ul>
    </div>
  );
};

export default EditCenterList;
