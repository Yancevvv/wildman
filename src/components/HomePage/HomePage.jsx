import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css'; // Стили можно создать отдельно

const HomePage = () => {
  const navigate = useNavigate();
  
  // Получаем username из localStorage (где мы его сохранили после входа)
  const username = localStorage.getItem('username') || 'Пользователь';

  const handleShowDecks = () => {
    navigate('/decks');
  };

  const handleShowChat = () => {
    navigate('/chat');
  };

  const handleLogout = async () => {
    try {
      // Отправляем запрос на выход
      await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include'
      });
      
      // Очищаем данные пользователя
      localStorage.removeItem('username');
      localStorage.removeItem('authToken');
      
      // Перенаправляем на страницу входа
      navigate('/');
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    }
  };

  return (
    <div className="home-container">
      <h1 className="welcome-message">Здравствуйте, {username}!</h1>
      
      <div className="buttons-container">
        <button 
          onClick={handleShowDecks}
          className="home-btn decks-btn"
        >
          Показать колоду
        </button>
        
        <button 
          onClick={handleShowChat}
          className="home-btn chat-btn"
        >
          Показать чат
        </button>
        
        <button 
          onClick={handleLogout}
          className="home-btn logout-btn"
        >
          Выйти
        </button>
      </div>
    </div>
  );
};

export default HomePage;