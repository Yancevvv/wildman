import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import SignIn from './components/SignIn/SignIn';
import './App.css';
import DecksPage from './components/DecksPage/DecksPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />       {/* Регистрация */}
        <Route path="/signin" element={<SignIn />} />   {/* Авторизация */}
        <Route path="/decks" element={<DecksPage />} />
      </Routes>
    </Router>
  );
}

export default App;