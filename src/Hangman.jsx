import React, { useState, useEffect } from 'react';
import wordsData from './wordsData';
import './Hangman.css';

const Hangman = ({ stage, onStageSelect, onStageComplete }) => {
  const MAX_TRIES = 6;
  const [level, setLevel] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [guessedLetters, setGuessedLetters] = useState(new Set());
  const [showRetryModal, setShowRetryModal] = useState(false);
  const [retryCountdown, setRetryCountdown] = useState(10);

  const triggerHapticFeedback = (pattern) => {
    if ('vibrate' in navigator) {
      navigator.vibrate(pattern);
    }
  };
  

  useEffect(() => {
    if (showRetryModal) {
      const timerId = setInterval(() => {
        setRetryCountdown((currentCountdown) => currentCountdown > 0 ? currentCountdown - 1 : 0);
      }, 1000);
      return () => clearTimeout(timerId);
    }
  }, [showRetryModal, retryCountdown]);

  useEffect(() => {
    if (retryCountdown === 0) {
      setShowRetryModal(false); // Automatically hide modal when countdown reaches 0
      setMistakes(0); // Reset mistakes for a retry
      setGuessedLetters(new Set()); // Reset guessed letters
    }
  }, [retryCountdown]);

  useEffect(() => {
    // Resets when the level or stage changes
    setGuessedLetters(new Set());
    setMistakes(0);
    setShowRetryModal(false); // Ensure retry modal is not shown on level change
    setRetryCountdown(10); // Reset retry countdown
  }, [level, stage]);

  // The handleGuess game logic was inspired from https://hackernoon.com/tutorial-building-a-hangman-game-with-react-hooks-c22c354a?hmsr=joyk.com&utm_source=joyk.com&utm_medium=referral and further developed to fit my game requirements//

  const handleGuess = (letter) => {
    if (guessedLetters.has(letter) || mistakes >= MAX_TRIES || showRetryModal) {
      return;
    }

    const newGuessedLetters = new Set(guessedLetters).add(letter);
    setGuessedLetters(newGuessedLetters);
    const currentWordDetails = wordsData[stage].words[level];
    const currentWord = currentWordDetails.word.toUpperCase();

    if (currentWord.includes(letter)) {
      // Correct guess logic
      const isWordGuessed = currentWord.split('').every(l => newGuessedLetters.has(l));
      if (isWordGuessed) {
        // Check if this was the last word in the current stage
        if (level + 1 < wordsData[stage].words.length) {
          // Not the last word, go to next level
          setLevel(prevLevel => prevLevel + 1);
        } else {
          // Last word, stage completed
          onStageComplete(); // Notify completion
        }
      }
    } else {
      // Incorrect guess logic
      setMistakes(mistakes + 1);
      if (mistakes + 1 >= MAX_TRIES) {
        setShowRetryModal(true);
      }
    }
  };
  

  const currentWordDetails = wordsData[stage].words[level];
  const currentWord = currentWordDetails.word.toUpperCase();

  const renderWordAndDefinition = () => (
    <>
      <div className="definition">{currentWordDetails.definition}</div>
      <div className="word-to-guess">
        {currentWord.split('').map((letter, index) => (
          <span key={index} className="letter">
            {guessedLetters.has(letter) ? letter : '_'}
          </span>
        ))}
      </div>
    </>
  );

  const renderKeyboard = () => {
    const qwertyRows = [
      "QWERTYUIOP".split(""),
      "ASDFGHJKL".split(""),
      "ZXCVBNM".split("")
    ];

    return qwertyRows.map((row, rowIndex) => (
      <div key={rowIndex} className="keyboard-row">
        {row.map(letter => (
          <button 
            key={letter}
            className="key-button"
            disabled={guessedLetters.has(letter) || showRetryModal}
            onClick={() => handleGuess(letter)}>
            {letter}
          </button>
        ))}
      </div>
    ));
  };

  return (
    <div className="hangman-container">
      <button onClick={onStageSelect} className="back-button">&lt; Back</button>
      <div className="game-info">
      <div className="level-info">Level {stage + 1}-{level + 1}</div>
        <div className="tries-left">Tries Left: {MAX_TRIES - mistakes}</div>
        </div>
      {renderWordAndDefinition()}
      <div className="keyboard">
        {renderKeyboard()}
      </div>
      {showRetryModal && (
         <div className="retry-modal">
         <p>You failed to guess the password. </p>
        <p>Please wait {retryCountdown} seconds to retry.</p>
       </div>
      )}
    </div>
  );
};

export default Hangman;
