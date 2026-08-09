import React, { useState, useEffect } from 'react';
import './WhackAMole.css';

export default function WhackAMole() {
  const [holes, setHoles] = useState(Array(9).fill(false));
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showBoop, setShowBoop] = useState(null); // stores index of hole to show boop

  useEffect(() => {
    let timer;
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsPlaying(false);
    }
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);

  useEffect(() => {
    let moleTimer;
    if (isPlaying) {
      moleTimer = setInterval(() => {
        const randomHole = Math.floor(Math.random() * 9);
        setHoles(prev => {
          const newHoles = Array(9).fill(false);
          newHoles[randomHole] = true;
          return newHoles;
        });
      }, 800); // Pops up every 800ms
    } else {
      setHoles(Array(9).fill(false));
    }
    return () => clearInterval(moleTimer);
  }, [isPlaying]);

  const startGame = () => {
    setTimeLeft(30);
    setIsPlaying(true);
    setHoles(Array(9).fill(false));
    setShowBoop(null);
  };

  const resetScore = () => {
    setScore(0);
    setTimeLeft(30);
    setIsPlaying(false);
    setHoles(Array(9).fill(false));
    setShowBoop(null);
  };

  const whack = (index) => {
    if (!isPlaying) return;
    if (holes[index]) {
      setScore(prev => prev + 1);
      
      // Hide mole immediately
      setHoles(prev => {
        const newHoles = [...prev];
        newHoles[index] = false;
        return newHoles;
      });

      // Show boop effect
      setShowBoop(index);
      setTimeout(() => setShowBoop(null), 400);
    }
  };

  return (
    <div className="wam-wrapper">
      <div className="wam-container">
        <div className="wam-header">
          <div className="wam-title-area">
            <h3 className="wam-title">CATCH THE MISCHIEF</h3>
            <p className="wam-desc">Boop the cats before they hide!</p>
          </div>
          <div className="wam-stats">
            <div className="wam-stat-box">
              <span className="stat-label">Score</span>
              <span className="stat-value">{score}</span>
            </div>
            <div className="wam-stat-box">
              <span className="stat-label">Time</span>
              <span className="stat-value">{timeLeft}s</span>
            </div>
          </div>
        </div>

        <div className="wam-grid">
          {holes.map((isMole, index) => (
            <div key={index} className="wam-hole-container" onClick={() => whack(index)}>
              <div className="wam-hole"></div>
              <div className={`wam-character ${isMole ? 'up' : ''}`}>🐱</div>
              {showBoop === index && <div className="wam-boop">✨ Boop! ✨</div>}
            </div>
          ))}
        </div>

        <div className="wam-controls">
          {!isPlaying ? (
            <button className="wam-btn start" onClick={startGame}>
              {timeLeft === 0 ? 'Play Again' : 'Start Game'}
            </button>
          ) : (
            <button className="wam-btn stop" onClick={() => setIsPlaying(false)}>
              Stop
            </button>
          )}
          <button className="wam-btn reset" onClick={resetScore}>
            Reset Score
          </button>
        </div>
      </div>
    </div>
  );
}
