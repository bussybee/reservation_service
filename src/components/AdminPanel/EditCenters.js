// EditCenters.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EditCenters.css';

function EditCenters() {
    const { id } = useParams(); // Получаем ID центра из URL
    const [centerData, setCenterData] = useState(null);
    const [newService, setNewService] = useState({
        courseName: '',
        startTime: '',
        duration: '',
        cost: ''
    });
    const navigate = useNavigate();


    useEffect(() => {
        const fetchCenterData = async () => {
            try {
                const response = await axios.get(`http://89.169.150.251:8081/institution/${id}`);
                setCenterData({
                    ...response.data,
                    services: response.data.services || [], // гарантируем, что services — это массив
                });
            } catch (error) {
                console.error('Ошибка при получении данных о центре:', error);
            }
        };

        fetchCenterData();
    }, [id]);

    const handleServiceChange = (e) => {
        const { name, value } = e.target;
        setNewService((prevService) => ({
            ...prevService,
            [name]: value,
        }));
    };

    const handleAddService = async (e) => {
      e.preventDefault();
      if (newService.courseName && newService.startTime && newService.duration) {
          try {
              const startTimeFormatted = newService.startTime.replace('T', ' ') + ':00';
              const courseData = {
                  courseName: newService.courseName,
                  institutionId: id,
                  startTime: startTimeFormatted,
                  duration: parseFloat(newService.duration),
                  cost: parseFloat(newService.cost),
              };
  
              const response = await axios.post("http://89.169.150.251:8081/course", courseData);
  
              if (response.status === 201) {
                alert('Услуга успешно добавлена!');
                // Обновите данные центра
                const updatedCenterResponse = await axios.get(`http://89.169.150.251:8081/institution/${id}`);
                setCenterData(updatedCenterResponse.data);
                setNewService({ courseName: '', startTime: '', duration: '', cost: '' });
            } else {
                  alert('Ошибка при создании услуги.');
              }
          } catch (error) {
              console.error('Ошибка при создании услуги:', error);
              alert('Произошла ошибка при создании услуги.');
          }
      } else {
          alert('Пожалуйста, заполните все поля.');
      }
  };
  

    if (!centerData) {
        return <div>Загрузка...</div>;
    }

    return (
        <div className="edit-center-container">
            <h2 className="edit-center-header">Редактирование центра: {centerData.name}</h2>
            <form className="edit-center-form" onSubmit={handleAddService}>
                <label className="edit-center-label">Название услуги</label>
                <input
                    className="edit-center-input"
                    type="text"
                    name="courseName"
                    value={newService.courseName}
                    onChange={handleServiceChange}
                    required
                />
                <label className="edit-center-label">Дата и время начала</label>
                <input
                    className="edit-center-input"
                    type="datetime-local"
                    name="startTime"
                    value={newService.startTime}
                    onChange={handleServiceChange}
                    required
                />
                <label className="edit-center-label">Продолжительность (в часах)</label>
                <input
                    className="edit-center-input"
                    type="number"
                    name="duration"
                    value={newService.duration}
                    onChange={handleServiceChange}
                    required
                />
                <label className="edit-center-label">Стоимость (в рублях)</label>
                <input
                    className="edit-center-input"
                    type="number"
                    name="cost"
                    value={newService.cost}
                    onChange={handleServiceChange}
                    required
                />
                <button className="edit-center-button" type="submit">Добавить услугу</button>
            </form>

            <div className="existing-services-container">
                <h3 className="existing-services-header">Существующие услуги</h3>
                {centerData.services && centerData.services.length > 0 ? (
                    <ul className="existing-services-list">
                        {centerData.services.map((service, index) => (
                            <li className="existing-service-item" key={index}>
                                {service.courseName} - {service.startTime} - {service.duration} ч. - {service.cost} руб.
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Услуг пока нет.</p>
                )}
            </div>
        </div>
    );
}

export default EditCenters;
