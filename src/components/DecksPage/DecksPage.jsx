import React, { useState } from 'react';
import './DecksPage.css';

const DecksPage = () => {
  const [decks, setDecks] = useState([
    { id: 1, name: 'Deck 1' },
    { id: 2, name: 'IELTS Test 1' },
    { id: 3, name: 'TOEFL Test 1' },
    { id: 4, name: 'Deck 2' },
    { id: 5, name: 'IELTS Test 2' },
    { id: 6, name: 'TOEFL Test 2' }
  ]);

  const [selectedDeck, setSelectedDeck] = useState(null);

  const handleDelete = () => {
    if (selectedDeck) {
      setDecks(decks.filter(deck => deck.id !== selectedDeck));
      setSelectedDeck(null);
    }
  };

  const handleCreate = () => {
    const newDeck = {
      id: Math.max(...decks.map(d => d.id)) + 1,
      name: `New Deck ${Math.floor(Math.random() * 100)}`
    };
    setDecks([...decks, newDeck]);
  };

  const handleChat = () => {
    if (selectedDeck) {
      console.log(`Opening chat for deck ${selectedDeck}`);
      // Здесь будет логика открытия чата
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
            <h3 className="deck-name">{deck.name}</h3>
          </div>
        ))}
      </div>

      <div className="deck-actions">
        <button 
          onClick={handleDelete} 
          className="action-btn delete-btn"
          disabled={!selectedDeck}
        >
          Delete
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
      </div>
    </div>
  );
};

export default DecksPage;