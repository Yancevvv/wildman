import React, { useState } from 'react';
import './CreateDeck.css';

const CreateDeck = () => {
  const [deckName, setDeckName] = useState('IELTS Test1');
  const [cards, setCards] = useState([
    { id: 1, front: 'to invent', back: 'изобретать' },
    { id: 2, front: 'an interlocutor', back: 'собеседник' }
  ]);
  const [newCard, setNewCard] = useState({ front: '', back: '' });

  const handleAddCard = () => {
    if (newCard.front && newCard.back) {
      setCards([...cards, { 
        id: Date.now(), 
        front: newCard.front, 
        back: newCard.back 
      }]);
      setNewCard({ front: '', back: '' });
    }
  };

  const handleCreateDeck = () => {
    const deckData = {
      name: deckName,
      cards: cards
    };
    console.log('Creating deck:', deckData);
    // Здесь будет логика создания колоды
  };

  return (
    <div className="create-deck-container">
      <h1 className="create-deck-title">Create new deck</h1>
      
      <div className="deck-name-section">
        <label htmlFor="deck-name">Deck name:</label>
        <input
          type="text"
          id="deck-name"
          value={deckName}
          onChange={(e) => setDeckName(e.target.value)}
          className="deck-name-input"
        />
      </div>

      <div className="cards-list">
        <h3>Cards in deck:</h3>
        {cards.map(card => (
          <div key={card.id} className="card-item">
            <div className="card-side">{card.front}</div>
            <div className="card-side">{card.back}</div>
          </div>
        ))}
      </div>

      <div className="add-card-section">
        <h3>Add new card:</h3>
        <div className="card-inputs">
          <input
            type="text"
            placeholder="English"
            value={newCard.front}
            onChange={(e) => setNewCard({...newCard, front: e.target.value})}
          />
          <input
            type="text"
            placeholder="Russian"
            value={newCard.back}
            onChange={(e) => setNewCard({...newCard, back: e.target.value})}
          />
          <button 
            onClick={handleAddCard}
            className="add-card-button"
            disabled={!newCard.front || !newCard.back}
          >
            +
          </button>
        </div>
      </div>

      <div className="action-buttons">
        <button className="cancel-button">Cancel</button>
        <button 
          className="create-button"
          onClick={handleCreateDeck}
          disabled={cards.length === 0}
        >
          Create Deck
        </button>
      </div>
    </div>
  );
};

export default CreateDeck;