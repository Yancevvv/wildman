import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './FlipCards.css';

const FlipCards = () => {
  const { deckId } = useParams();
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ word: '', translation: '' });
  const [newCard, setNewCard] = useState({ word: '', translation: '' });

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`/api/decks/${deckId}/cards`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setCards(response.data);
      } catch (err) {
        setError('Failed to load cards');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCards();
  }, [deckId]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentCardIndex((prevIndex) => 
      prevIndex < cards.length - 1 ? prevIndex + 1 : 0
    );
  };

  const handlePrevious = () => {
    setIsFlipped(false);
    setCurrentCardIndex((prevIndex) => 
      prevIndex > 0 ? prevIndex - 1 : cards.length - 1
    );
  };

  const handleEdit = () => {
    const currentCard = cards[currentCardIndex];
    setEditData({
      word: currentCard.word,
      translation: currentCard.translation
    });
    setIsEditing(true);
  };

  const handleSaveEdit = async () => {
    try {
      const token = localStorage.getItem('token');
      const cardId = cards[currentCardIndex].id;
      await axios.put(`/api/decks/${deckId}/cards/${cardId}`, editData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      setCards(cards.map((card, index) => 
        index === currentCardIndex ? { ...card, ...editData } : card
      ));
      setIsEditing(false);
    } catch (err) {
      setError('Failed to update card');
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      const cardId = cards[currentCardIndex].id;
      await axios.delete(`/api/decks/${deckId}/cards/${cardId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setCards(cards.filter((_, index) => index !== currentCardIndex));
      if (currentCardIndex >= cards.length - 1) {
        setCurrentCardIndex(Math.max(0, cards.length - 2));
      }
    } catch (err) {
      setError('Failed to delete card');
      console.error(err);
    }
  };

  const handleAddCard = async () => {
    if (!newCard.word || !newCard.translation) {
      setError('Please fill both fields');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`/api/decks/${deckId}/cards`, newCard, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      setCards([...cards, response.data]);
      setNewCard({ word: '', translation: '' });
      setError('');
    } catch (err) {
      setError('Failed to add card');
      console.error(err);
    }
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (error && cards.length === 0) {
    return (
      <div className="error-message">
        <h2>{error}</h2>
        <p>No cards found in this deck</p>
        <button onClick={() => navigate('/decks')}>Back to Decks</button>
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div className="flip-cards-container">
        <h1 className="page-title">No Cards in This Deck</h1>
        <div className="add-card-section">
          <h3>Add New Card</h3>
          <div className="card-inputs">
            <input
              type="text"
              placeholder="Word"
              value={newCard.word}
              onChange={(e) => setNewCard({...newCard, word: e.target.value})}
            />
            <input
              type="text"
              placeholder="Translation"
              value={newCard.translation}
              onChange={(e) => setNewCard({...newCard, translation: e.target.value})}
            />
            <button onClick={handleAddCard}>Add Card</button>
          </div>
          {error && <div className="error-message">{error}</div>}
        </div>
      </div>
    );
  }

  const currentCard = cards[currentCardIndex];

  return (
    <div className="flip-cards-container">
      <h1 className="page-title">Learning Cards</h1>
      
      <div className="progress-container">
        <div className="progress-text">
          Card {currentCardIndex + 1} of {cards.length}
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${((currentCardIndex + 1) / cards.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className={`card-container ${isFlipped ? 'flipped' : ''}`}>
        {isEditing ? (
          <div className="card-front">
            <div className="edit-section">
              <input
                type="text"
                value={editData.word}
                onChange={(e) => setEditData({...editData, word: e.target.value})}
                placeholder="Word"
              />
              <input
                type="text"
                value={editData.translation}
                onChange={(e) => setEditData({...editData, translation: e.target.value})}
                placeholder="Translation"
              />
              <div className="edit-buttons">
                <button onClick={handleSaveEdit}>Save</button>
                <button onClick={() => setIsEditing(false)}>Cancel</button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="card-front">
              <div className="word">{currentCard.word}</div>
              <button className="flip-button" onClick={handleFlip}>
                Show Translation
              </button>
            </div>
            <div className="card-back">
              <div className="word">{currentCard.translation}</div>
              <button className="flip-button" onClick={handleFlip}>
                Show Word
              </button>
            </div>
          </>
        )}
      </div>

      <div className="navigation-buttons">
        <button className="nav-button previous" onClick={handlePrevious}>
          Previous
        </button>
        {!isEditing && (
          <>
            <button className="nav-button" onClick={handleEdit}>
              Edit
            </button>
            <button className="nav-button" onClick={handleDelete}>
              Delete
            </button>
          </>
        )}
        <button className="nav-button next" onClick={handleNext}>
          Next
        </button>
      </div>

      <div className="add-card-section">
        <h3>Add New Card</h3>
        <div className="card-inputs">
          <input
            type="text"
            placeholder="Word"
            value={newCard.word}
            onChange={(e) => setNewCard({...newCard, word: e.target.value})}
          />
          <input
            type="text"
            placeholder="Translation"
            value={newCard.translation}
            onChange={(e) => setNewCard({...newCard, translation: e.target.value})}
          />
          <button onClick={handleAddCard}>Add Card</button>
        </div>
        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
};

export default FlipCards;