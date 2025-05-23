import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import SignIn from './components/SignIn/SignIn';
import './App.css';
import DecksPage from './components/DecksPage/DecksPage';
import CreateDeck from './components/CreateDeck/CreateDeck';
import FlipCards from './components/FlipCards/FlipCards';
import ChatPage from './components/ChatPage/ChatPage';
import Rating from './components/Rating/Rating';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />       {/* Регистрация */}
        <Route path="/signin" element={<SignIn />} />   {/* Авторизация */}
        <Route path="/decks" element={<DecksPage />} />
        <Route path="/create-deck" element={<CreateDeck />} />
        <Route path="/flip-cards/:deckId" element={<FlipCards />} />
        <Route path="/Home" element={<HomePage />} /> 
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/rating" element={<Rating />} />
      </Routes>
    </Router>
  );
}

export default App;