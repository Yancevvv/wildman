import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>Добро пожаловать в приложение для изучения английского!</h1>
      
      <div className="action-buttons">
        <div className="auth-buttons">
          <button 
            className="auth-button signin-btn"
            onClick={() => navigate('/signin')}
          >
            Войти
          </button>
          <button 
            className="auth-button signup-btn"
            onClick={() => navigate('/auth')}
          >
            Зарегистрироваться
          </button>
        </div>

        <button 
          className="auth-button decks-btn"
          onClick={() => navigate('/decks')}
        >
          Мои колоды
        </button>
      </div>
    </div>
  );
}

export default Home;