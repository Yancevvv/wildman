import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './FlipCards.css';

import habitualImage from '../../assets/images/habitual.jpg';
import inventImage from '../../assets/images/invent.jpg';

const FlipCards = () => {
  const { deckId } = useParams();
  const navigate = useNavigate();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [deck, setDeck] = useState(null);
  const [loading, setLoading] = useState(true);

  // Загрузка данных колоды (в реальном приложении - API запрос)
  useEffect(() => {
    // Здесь должен быть запрос к API или получение из хранилища
    const mockDecks = [
      {
        id: 1,
        name: 'Deck 1',
        cards: [
          {
            word: "Habitual",
            type: "Adjective",
            definition: "Done as a habit, and not because you are thinking.",
            example: "He has the habitual of eating toast for breakfast.",
            image: habitualImage
          }
        ]
      },
      {
        id: 2,
        name: 'IELTS Test 1',
        cards: [
          {
            word: "Invent",
            type: "Verb",
            definition: "To create or design something that has not existed before.",
            example: "He invented a new way to solve the problem.",
            image: inventImage
          }
        ]
      }
    ];

    const foundDeck = mockDecks.find(d => d.id === Number(deckId));
    setDeck(foundDeck);
    setLoading(false);
    
    if (!foundDeck) {
      navigate('/decks'); // Перенаправляем если колода не найдена
    }
  }, [deckId, navigate]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!deck || deck.cards.length === 0) {
    return (
      <div className="error-message">
        <h2>No cards available in this deck</h2>
        <button onClick={() => navigate('/decks')}>Back to Decks</button>
      </div>
    );
  }

  const currentCard = deck.cards[currentCardIndex];
  const totalWords = deck.cards.length; // Общее количество карточек в колоде
  const wordsLearned = currentCardIndex + 1; // Количество изученных карточек

  const handleNext = () => {
    setIsFlipped(false); // Сбрасываем переворот карточки
    setCurrentCardIndex((prevIndex) =>
      prevIndex === deck.cards.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevious = () => {
    setIsFlipped(false); // Сбрасываем переворот карточки
    setCurrentCardIndex((prevIndex) =>
      prevIndex === 0 ? deck.cards.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="flip-cards-container">
      <h1 className="page-title">Learn New Words</h1>
      
      <div className="progress-container">
        <div className="progress-text">
          Words Learned {wordsLearned}/{totalWords}
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${(wordsLearned / totalWords) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className={`card-container ${isFlipped ? 'flipped' : ''}`}>
        <div className="card-front">
          <img 
            src={currentCard.image} 
            alt={currentCard.word} 
            className="card-image"
          />
          <div className="card-info">
            <div className="word-type">
              <span className="new-word-tag">New word</span>
              <span className="word">{currentCard.word}</span>
              <span className="type">{currentCard.type}</span>
            </div>
            <button 
              className="flip-button"
              onClick={() => setIsFlipped(!isFlipped)}
            >
              Flip
            </button>
          </div>
        </div>

        <div className="card-back">
          <div className="definition-section">
            <h3>Definition</h3>
            <p>{currentCard.definition}</p>
          </div>
          <div className="example-section">
            <h3>Example</h3>
            <p>{currentCard.example}</p>
          </div>
        </div>
      </div>

      <div className="navigation-buttons">
        <button className="nav-button previous" onClick={handlePrevious}>
          Previous
        </button>
        <button className="nav-button next" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default FlipCards;