import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ChatPage.css';

const ChatPage = () => {
  useNavigate();
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([]);
  const [chatId, setChatId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [mistakes, setMistakes] = useState('');

  const navigate = useNavigate();

  // Создание нового чата
  const createChat = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:8080/api/chats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Не удалось создать чат');
      }

      const data = await response.json();
      setChatId(data.id);
      setConversation([]);
    } catch (error) {
      setError('Ошибка при создании чата: ' + error.message);
      console.error('Ошибка при создании чата:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Удаление чата
  const deleteChat = () => {
    setChatId(null);
    setConversation([]);
    setMistakes('');
  };

  // Отправка сообщения
  const handleSend = async () => {
    if (!message.trim() || !chatId) return;

    setIsLoading(true);
    setError('');

    try {
      // Добавляем сообщение пользователя в чат
      const userMessage = { 
        messageType: 'USER',
        text: message 
      };

      setConversation(prev => [...prev, userMessage]);

      // Отправляем сообщение на сервер
      const response = await fetch(`http://localhost:8080/api/chats/${chatId}/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: message }),
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Не удалось отправить сообщение');
      }

      const data = await response.json();

      // Добавляем ответ ассистента в чат
      const assistantMessage = {
        messageType: 'ASSISTANT',
        text: data.text
      };

      setConversation(prev => [...prev, assistantMessage]);

      // Обновляем ошибки, если они есть
      setMistakes(data.mistakes || '');

      // Очищаем поле ввода
      setMessage('');
    } catch (error) {
      setError('Ошибка при отправке сообщения: ' + error.message);
      console.error('Ошибка при отправке сообщения:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSend();
    }
  };

   const goToHome = () => {
    navigate('/Home');
  }

  return (
    <div className="chat-container">
      <div className="conversation-area">
        <button 
        className="home-button"
        onClick={goToHome}
        title="Go to Home"
      >
        Home
      </button>
        <h2 className="conversation-title">Чат с ассистентом</h2>

        {error && <div className="error-message">{error}</div>}

        {!chatId ? (
          <div className="create-chat-container">
            <button 
              className="create-chat-button" 
              onClick={createChat}
              disabled={isLoading}
            >
              {isLoading ? 'Создание...' : 'Создать чат'}
            </button>
          </div>
        ) : (
          <>
            {mistakes && (
              <div className="mistakes-container">
                <h3>Ошибки в вашем сообщении:</h3>
                <p>{mistakes}</p>
              </div>
            )}

            <div className="messages-container">
              {conversation.map((msg, index) => (
                <div 
                  key={index} 
                  className={`message-bubble ${msg.messageType === 'USER' ? 'user-message' : 'assistant-message'}`}
                >
                  <p className="message-text">{msg.text}</p>
                </div>
              ))}
              {isLoading && <div className="loading-indicator">Загрузка...</div>}
            </div>

            <div className="message-input-container">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Введите ваше сообщение"
                className="message-input"
                disabled={isLoading}
              />
              <button 
                onClick={handleSend}
                className="send-button"
                disabled={isLoading || !message.trim()}
              >
                Отправить
              </button>
            </div>

            <div className="delete-chat-container">
              <button 
                className="delete-chat-button" 
                onClick={deleteChat}
                disabled={isLoading}
              >
                Удалить чат
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
