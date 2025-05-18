import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Rating.css';

const Rating = () => {
  const navigate = useNavigate();
  const [rating, setRating] = useState(4); // Текущий рейтинг (по умолчанию 4)
  const [answers, setAnswers] = useState({
    spokeEnglish: false,
    oneWordSentences: false,
    usedWordsInContext: false
  });

  // Обработчик изменения рейтинга
  const handleRatingChange = (value) => {
    setRating(value);
  };

  // Обработчик изменения ответов на вопросы
  const handleAnswerChange = (question) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [question]: !prevAnswers[question]
    }));
  };

  // Обработчик отправки формы
  const handleSubmit = () => {
    console.log('Submitted Answers:', answers);
    console.log('Rating:', rating);
    alert('Thank you for your feedback!');
    navigate('/chat'); // Возвращаемся на страницу чата после отправки
  };

  return (
    <div className="rating-container">
      <h1 className="rating-title">How was your chat?</h1>
      
      <div className="rating-stars">
        <span>{rating} / 5 stars</span>
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            className={`star-button ${rating >= value ? 'active' : ''}`}
            onClick={() => handleRatingChange(value)}
          >
            ★
          </button>
        ))}
      </div>

      <div className="rating-questions">
        <p>Answer the question (necessarily):</p>
        <label>
          <input
            type="checkbox"
            checked={answers.spokeEnglish}
            onChange={() => handleAnswerChange('spokeEnglish')}
          />
          Did your interlocutor speak to you in English?
        </label>
        <label>
          <input
            type="checkbox"
            checked={answers.oneWordSentences}
            onChange={() => handleAnswerChange('oneWordSentences')}
          />
          Didn’t your interlocutor speak in one-word sentences?
        </label>
        <label>
          <input
            type="checkbox"
            checked={answers.usedWordsInContext}
            onChange={() => handleAnswerChange('usedWordsInContext')}
          />
          Did your interlocutor use the words in context?
        </label>
      </div>

      <div className="submit-button-container">
        <button className="submit-button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Rating;