import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>Добро пожаловать!</h1>
      <div className="buttons">
        <button onClick={() => navigate('/signin')}>Войти</button>
        <button onClick={() => navigate('/auth')}>Зарегистрироваться</button>
      </div>
    </div>
  );
};

export default Home;