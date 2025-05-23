import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './EditDeck.css';

const EditDeck = () => {
  const { deckId } = useParams();
  const navigate = useNavigate();
  const [deckName, setDeckName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isFetching, setIsFetching] = useState(true);

  // Получаем текущее название колоды при загрузке
  useEffect(() => {
    const fetchDeckName = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`/api/decks/${deckId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setDeckName(response.data.name);
      } catch (err) {
        console.error('Error fetching deck:', err);
        setError('Failed to load deck. Please try again.');
      } finally {
        setIsFetching(false);
      }
    };

    fetchDeckName();
  }, [deckId]);

  const handleSave = async () => {
    if (!deckName.trim()) {
      setError('Please enter deck name');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      await axios.put(`/api/decks/${deckId}`, deckName, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      navigate('/decks'); // Возвращаемся на страницу колод после успешного сохранения
    } catch (err) {
      console.error('Error updating deck:', err);
      setError('Failed to update deck. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/decks');
  };

  if (isFetching) {
    return <div className="edit-deck-loading">Loading...</div>;
  }

  return (
    <div className="edit-deck-container">
      <h1 className="edit-deck-title">Edit Deck</h1>
      
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
          className="save-button"
          onClick={handleSave}
          disabled={!deckName.trim() || isLoading}
        >
          {isLoading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
};

export default EditDeck;