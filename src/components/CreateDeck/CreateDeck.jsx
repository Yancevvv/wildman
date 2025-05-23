import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CreateDeck.css';

const CreateDeck = () => {
  const navigate = useNavigate();
  const [deckName, setDeckName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCreateDeck = async () => {
    if (!deckName.trim()) {
      setError('Please enter deck name');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('/api/decks', 
        { name: deckName }, // Отправляем только имя колоды
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Deck created successfully:', response.data);
      navigate('/decks'); // Перенаправляем на страницу колод
    } catch (err) {
      console.error('Error creating deck:', err);
      setError('Failed to create deck. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/decks');
  };

  return (
    <div className="create-deck-container">
      <h1 className="create-deck-title">Create new deck</h1>
      
      {error && <div className="error-message">{error}</div>}

      <div className="deck-name-section">
        <label htmlFor="deck-name">Deck name:</label>
        <input
          type="text"
          id="deck-name"
          value={deckName}
          onChange={(e) => setDeckName(e.target.value)}
          className="deck-name-input"
          placeholder="Enter deck name"
        />
      </div>

      <div className="action-buttons">
        <button 
          className="cancel-button"
          onClick={handleCancel}
          disabled={isLoading}
        >
          Cancel
        </button>
        <button 
          className="create-button"
          onClick={handleCreateDeck}
          disabled={!deckName.trim() || isLoading}
        >
          {isLoading ? 'Creating...' : 'Create Deck'}
        </button>
      </div>
    </div>
  );
};

export default CreateDeck;