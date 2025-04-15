import React, { useState } from 'react';
import './SignIn.css';

const SignIn = () => {
  const [credentials, setCredentials] = useState({
    nickname: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Sign in data:', credentials);
    // Логика авторизации
  };

  return (
    <div className="signin-container">
      <div className="signin-card">
        <h1 className="signin-title">Sign In</h1>
        
        <form onSubmit={handleSubmit} className="signin-form">
          <div className="input-group">
            <label htmlFor="nickname">Nickname</label>
            <input
              type="text"
              id="nickname"
              name="nickname"
              value={credentials.nickname}
              onChange={(e) => setCredentials({...credentials, nickname: e.target.value})}
              placeholder="Enter your nickname"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              placeholder="Enter your password"
              required
              minLength="6"
            />
          </div>

          <button type="submit" className="signin-button">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;