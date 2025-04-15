import React, { useState } from 'react';
import './Auth.css'; // Файл со стилями

const Auth = () => {
  const [formData, setFormData] = useState({
    nickname: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь будет обработка отправки формы (API, валидация и т.д.)
    console.log('Данные формы:', formData);
  };

  return (
    <div className="auth-container">
      <h1 className="auth-title">Создать аккаунт</h1>
      
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label htmlFor="nickname">Имя пользователя</label>
          <input
            type="text"
            id="nickname"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
            required
            placeholder="Введите ваш никнейм"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Введите ваш email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength="6"
            placeholder="Не менее 6 символов"
          />
        </div>

        <button type="submit" className="auth-button">
          Создать аккаунт
        </button>
      </form>
    </div>
  );
};

export default Auth;