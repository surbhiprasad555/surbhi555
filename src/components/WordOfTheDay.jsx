import React, { useState, useEffect } from 'react';
import './WordOfTheDay.css';

const words = [
  { word: 'SERENDIPITY', meaning: 'The occurrence and development of events by chance in a happy or beneficial way.' },
  { word: 'MELLIFLUOUS', meaning: 'A sound that is sweet and smooth, pleasing to hear.' },
  { word: 'ETHEREAL', meaning: 'Extremely delicate and light in a way that seems too perfect for this world.' },
  { word: 'PETRICHOR', meaning: 'A pleasant smell that frequently accompanies the first rain after a warm, dry period.' },
  { word: 'LUMINOUS', meaning: 'Full of or shedding light; bright or shining, especially in the dark.' },
  { word: 'EPIPHANY', meaning: 'A moment of sudden revelation or insight.' },
];

export default function WordOfTheDay() {
  const [currentWordObj, setCurrentWordObj] = useState(null);
  const [jumbledLetters, setJumbledLetters] = useState([]); // Array of { id, letter }
  const [guess, setGuess] = useState([]); // Array of { id, letter } or null
  const [isSolved, setIsSolved] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    loadNewWord();
  }, []);

  const loadNewWord = () => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setCurrentWordObj(randomWord);
    
    const letters = randomWord.word.split('');
    let jumbled = [...letters].sort(() => Math.random() - 0.5);
    
    const jumbledObjs = jumbled.map((letter, i) => ({ id: i, letter }));
    setJumbledLetters(jumbledObjs);
    setGuess(Array(letters.length).fill(null));
    setIsSolved(false);
    setShowAnswer(false);
    setIsError(false);
  };

  const handleSelectLetter = (letterObj, index) => {
    if (isSolved || showAnswer) return;
    
    const firstEmptyIndex = guess.findIndex(g => g === null);
    if (firstEmptyIndex === -1) return;

    const newGuess = [...guess];
    newGuess[firstEmptyIndex] = letterObj;
    setGuess(newGuess);

    const newJumbled = [...jumbledLetters];
    newJumbled[index] = null;
    setJumbledLetters(newJumbled);
    setIsError(false);
  };

  const handleDeselectLetter = (letterObj, index) => {
    if (isSolved || showAnswer || !letterObj) return;

    const newGuess = [...guess];
    newGuess[index] = null;
    setGuess(newGuess);

    const newJumbled = [...jumbledLetters];
    newJumbled[letterObj.id] = letterObj; 
    setJumbledLetters(newJumbled);
    setIsError(false);
  };

  const handleCheckAnswer = () => {
    if (guess.some(g => g === null)) {
      setIsError(true);
      setTimeout(() => setIsError(false), 1000);
      return;
    }
    const guessedWord = guess.map(g => g.letter).join('');
    if (guessedWord === currentWordObj.word) {
      setIsSolved(true);
      setShowAnswer(true);
      setIsError(false);
    } else {
      setIsError(true);
      setTimeout(() => setIsError(false), 1000);
    }
  };

  const handleShowWord = () => {
    setShowAnswer(true);
    setIsSolved(false);
  };

  if (!currentWordObj) return null;

  return (
    <div className="wotd-wrapper">
      <div className="wotd-container">
        <div className="wotd-header">
          <div className="wotd-title-area">
            <h3 className="wotd-title">WORD OF THE DAY</h3>
            <p className="wotd-desc">Unscramble the whimsical word!</p>
          </div>
        </div>

        <div className="wotd-game-area">
          <div className={`wotd-guess-slots ${isError ? 'error-shake' : ''}`}>
            {showAnswer ? (
              currentWordObj.word.split('').map((letter, i) => (
                <div key={i} className="wotd-tile correct">
                  {letter}
                </div>
              ))
            ) : (
              guess.map((g, i) => (
                <div 
                  key={i} 
                  className={`wotd-tile slot ${g ? 'filled' : ''}`}
                  onClick={() => handleDeselectLetter(g, i)}
                >
                  {g ? g.letter : ''}
                </div>
              ))
            )}
          </div>

          {!showAnswer && (
            <div className="wotd-jumbled-letters">
              {jumbledLetters.map((l, i) => (
                <div 
                  key={i} 
                  className={`wotd-tile source ${!l ? 'empty' : ''}`}
                  onClick={() => l && handleSelectLetter(l, i)}
                >
                  {l ? l.letter : ''}
                </div>
              ))}
            </div>
          )}

          {showAnswer && (
            <div className="wotd-meaning-box">
              {isSolved && <div className="wotd-win-msg">You got it! ✨</div>}
              <div className="wotd-meaning-text">
                <strong>{currentWordObj.word}:</strong> {currentWordObj.meaning}
              </div>
            </div>
          )}
        </div>

        <div className="wotd-controls">
          {!showAnswer && (
            <button className="wotd-btn check" onClick={handleCheckAnswer}>
              Check Ans
            </button>
          )}
          <button className="wotd-btn reset" onClick={loadNewWord}>
            {showAnswer ? 'Next Word' : 'Skip Word'}
          </button>
          {!showAnswer && (
            <button className="wotd-btn giveup" onClick={handleShowWord}>
              Show Answer
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
