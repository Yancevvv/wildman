import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Импортируем useNavigate
import './ChatPage.css';

const ChatPage = () => {
  const navigate = useNavigate(); // Для навигации
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([
    { 
      user: 'Helen Chen', 
      time: '2w', 
      text: 'I had a kaleidoscope of thoughts while walking through the museum.' 
    },
    { 
      user: 'Tim He', 
      time: '1w', 
      text: "That's a great way to describe it. The museum is a talisman for creative inspiration." 
    }
  ]);

  const wordsToUse = [
    'kaleidoscope',
    'talisman',
    'obfuscate',
    'flabbergast',
    'epiphany'
  ];

  const handleSend = () => {
    if (message.trim()) {
      setConversation([
        ...conversation,
        { 
          user: 'You', 
          time: 'now', 
          text: message 
        }
      ]);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="chat-container">
      <div className="words-sidebar">
        <h2 className="sidebar-title">Words to use</h2>
        <ul className="words-list">
          {wordsToUse.map((word, index) => (
            <li key={index} className="word-item">
              {word}
            </li>
          ))}
        </ul>
      </div>

      <div className="conversation-area">
        <h2 className="conversation-title">Conversation Practice</h2>
        
        <div className="messages-container">
          {conversation.map((msg, index) => (
            <div key={index} className="message-bubble">
              <div className="message-header">
                <span className="message-user">{msg.user}</span>
                <span className="message-time">{msg.time}</span>
              </div>
              <p className="message-text">{msg.text}</p>
            </div>
          ))}
        </div>

        <div className="message-input-container">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your response here"
            className="message-input"
          />
          <button 
            onClick={handleSend}
            className="send-button"
          >
            Send
          </button>
        </div>

        {/* Кнопка перехода на страницу Rating */}
        <div className="rate-chat-container">
          <button 
            className="rate-chat-button" 
            onClick={() => navigate('/rating')}
          >
            Rate this chat
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;