import React, { useState, useEffect, useCallback } from 'react';
import './MemoryMatch.css';

// Using actual cat stickers from the public/stickers folder
const cardImages = [
  '/stickers/1cat.svg',
  '/stickers/2cat.svg',
  '/stickers/3cat.svg',
  '/stickers/4cat.svg',
  '/stickers/5cat-removebg-preview.svg',
  '/stickers/6cat-removebg-preview.svg'
];

export default function MemoryMatch() {
  const [cards, setCards] = useState([]);
  const [flippedIndexes, setFlippedIndexes] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gaveUp, setGaveUp] = useState(false);

  const shuffleCards = useCallback(() => {
    const shuffled = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((src, index) => ({ id: index, src }));
    
    setCards(shuffled);
    setFlippedIndexes([]);
    setMatchedPairs([]);
    setMoves(0);
    setGaveUp(false);
  }, []);

  useEffect(() => {
    shuffleCards();
  }, [shuffleCards]);

  const handleCardClick = (index) => {
    if (gaveUp) return;
    if (flippedIndexes.length === 2) return;
    if (flippedIndexes.includes(index) || matchedPairs.includes(cards[index].src)) return;

    const newFlipped = [...flippedIndexes, index];
    setFlippedIndexes(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const firstSrc = cards[newFlipped[0]].src;
      const secondSrc = cards[newFlipped[1]].src;

      if (firstSrc === secondSrc) {
        setMatchedPairs(prev => [...prev, firstSrc]);
        setFlippedIndexes([]);
      } else {
        setTimeout(() => {
          setFlippedIndexes([]);
        }, 1000);
      }
    }
  };

  const handleGiveUp = () => {
    setGaveUp(true);
    const allSrcs = [...new Set(cards.map(c => c.src))];
    setMatchedPairs(allSrcs);
    setFlippedIndexes([]);
  };

  const isComplete = matchedPairs.length === cardImages.length && !gaveUp;

  return (
    <div className="mm-wrapper">
      <div className="mm-container">
        <div className="mm-header">
          <div className="mm-title-area">
            <h3 className="mm-title">FIND MY TWIN</h3>
            <p className="mm-desc">Match the cute kitties!</p>
          </div>
          <div className="mm-stats">
            <div className="mm-stat-box">
              <span className="mm-stat-label">Moves</span>
              <span className="mm-stat-value">{moves}</span>
            </div>
          </div>
        </div>

        {isComplete && (
          <div className="mm-completion">
            You found them all! ✨
          </div>
        )}

        <div className="mm-grid">
          {cards.map((card, index) => {
            const isFlipped = flippedIndexes.includes(index) || matchedPairs.includes(card.src);
            return (
              <div 
                key={card.id} 
                className={`mm-card ${isFlipped ? 'flipped' : ''}`}
                onClick={() => handleCardClick(index)}
              >
                <div className="mm-card-inner">
                  <div className="mm-card-front">
                    {/* Back of the card (shown when NOT flipped) */}
                    <div className="mm-card-pattern">?</div>
                  </div>
                  <div className="mm-card-back">
                    {/* Front of the card (shown when flipped) */}
                    <img src={card.src} alt="cat card" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mm-controls">
          <button className="mm-btn mm-reset" onClick={shuffleCards}>
            Once Again 🔄
          </button>
          {!isComplete && !gaveUp && (
            <button className="mm-btn mm-giveup" onClick={handleGiveUp}>
              I Gave Up 🏳️
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
