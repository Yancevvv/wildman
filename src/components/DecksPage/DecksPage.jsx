import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DecksPage.css';

const DecksPage = () => {
  const navigate = useNavigate();
  const [decks, setDecks] = useState([
    { id: 1, name: 'Deck 1', cards: [] },
    { id: 2, name: 'IELTS Test 1', cards: [
      { front: 'to invent', back: 'изобретать' },
      { front: 'an interlocutor', back: 'собеседник' }
    ]},
    { id: 3, name: 'TOEFL Test 1', cards: [] },
    { id: 4, name: 'Deck 2', cards: [] },
    { id: 5, name: 'IELTS Test 2', cards: [] },
    { id: 6, name: 'TOEFL Test 2', cards: [] }
  ]);

  const [selectedDeck, setSelectedDeck] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');

  const handleDelete = () => {
    if (selectedDeck) {
      setDecks(decks.filter(deck => deck.id !== selectedDeck));
      setSelectedDeck(null);
    }
  };

  const handleCreate = () => {
    navigate('/create-deck');
  };

  const handleChat = () => {
    if (selectedDeck) {
      console.log(`Opening chat for deck ${selectedDeck}`);
      // Здесь будет логика открытия чата
    }
  };

  const handleEdit = () => {
    if (selectedDeck) {
      const deck = decks.find(d => d.id === selectedDeck);
      setEditName(deck.name);
      setIsEditing(true);
    }
  };

  const handleSaveEdit = () => {
    setDecks(decks.map(deck => 
      deck.id === selectedDeck ? { ...deck, name: editName } : deck
    ));
    setIsEditing(false);
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
              onClick={handleChat} 
              className="action-btn chat-btn"
              disabled={!selectedDeck}
            >
              Chat
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