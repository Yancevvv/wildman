import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './DecksPage.css';

const DecksPage = () => {
  const navigate = useNavigate();
  const [decks, setDecks] = useState([]);
  const [selectedDeck, setSelectedDeck] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');

  useEffect(() => {
    const fetchDecks = async () => {
      try {
        const response = await axios.get('/api/decks', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setDecks(response.data.map(deck => ({
          id: deck.id,
          name: deck.name,
          cards: [] // Assuming cards are empty or could be fetched separately
        })));
      } catch (error) {
        console.error('Error fetching decks:', error);
      }
    };

    fetchDecks();
  }, []);

  const handleDelete = async () => {
    if (selectedDeck) {
      try {
        await axios.delete(`/api/decks/${selectedDeck}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setDecks(decks.filter(deck => deck.id !== selectedDeck));
        setSelectedDeck(null);
      } catch (error) {
        console.error('Error deleting deck:', error);
      }
    }
  };

  const handleCreate = () => {
    navigate('/create-deck');
  };
  

  const handleEdit = () => {
    if (selectedDeck) {
      const deck = decks.find(d => d.id === selectedDeck);
      setEditName(deck.name);
      setIsEditing(true);
    }
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(`/api/decks/${selectedDeck}`, editName, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      setDecks(decks.map(deck => 
        deck.id === selectedDeck ? { ...deck, name: editName } : deck
      ));
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating deck name:', error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };
  
  const handleLearnCard = () => {
    if (selectedDeck) {
      navigate(`/flip-cards/${selectedDeck}`);
    }
  };

  return (
    <div className="decks-page">
      <h1 className="decks-title">Your Decks</h1>
      
      <div className="decks-grid">
        {decks.map((deck) => (
          <div 
            key={deck.id} 
            className={`deck-card ${selectedDeck === deck.id ? 'selected' : ''}`}
            onClick={() => setSelectedDeck(deck.id)}
          >
            {isEditing && selectedDeck === deck.id ? (
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="deck-edit-input"
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <h3 className="deck-name">{deck.name}</h3>
            )}
            <div className="deck-card-count">{deck.cards.length} cards</div>
          </div>
        ))}
      </div>

      <div className="deck-actions">
        {isEditing && selectedDeck ? (
          <>
            <button 
              onClick={handleSaveEdit} 
              className="action-btn save-btn"
            >
              Save
            </button>
            <button 
              onClick={handleCancelEdit} 
              className="action-btn cancel-btn"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button 
              onClick={handleDelete} 
              className="action-btn delete-btn"
              disabled={!selectedDeck}
            >
              Delete
            </button>
            <button 
              onClick={handleEdit} 
              className="action-btn edit-btn"
              disabled={!selectedDeck}
            >
              Edit
            </button>
            <button 
              onClick={handleCreate} 
              className="action-btn create-btn"
            >
              Create
            </button>
            <button 
              onClick={handleLearnCard} 
              className="action-btn learn-btn"
              disabled={!selectedDeck}
            >
              Learn Card
            </button>  
          </>
        )}
      </div>
    </div>
  );
};

export default DecksPage;