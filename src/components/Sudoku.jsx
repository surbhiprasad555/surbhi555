import React, { useState, useEffect } from 'react';
import './Sudoku.css';

const INITIAL_BOARD = [
  [5, 3, null, null, 7, null, null, null, null],
  [6, null, null, 1, 9, 5, null, null, null],
  [null, 9, 8, null, null, null, null, 6, null],
  [8, null, null, null, 6, null, null, null, 3],
  [4, null, null, 8, null, 3, null, null, 1],
  [7, null, null, null, 2, null, null, null, 6],
  [null, 6, null, null, null, null, 2, 8, null],
  [null, null, null, 4, 1, 9, null, null, 5],
  [null, null, null, null, 8, null, null, 7, 9]
];

const SOLUTION = [
  [5, 3, 4, 6, 7, 8, 9, 1, 2],
  [6, 7, 2, 1, 9, 5, 3, 4, 8],
  [1, 9, 8, 3, 4, 2, 5, 6, 7],
  [8, 5, 9, 7, 6, 1, 4, 2, 3],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 6, 1, 5, 3, 7, 2, 8, 4],
  [2, 8, 7, 4, 1, 9, 6, 3, 5],
  [3, 4, 5, 2, 8, 6, 1, 7, 9]
];

export default function Sudoku() {
  const [board, setBoard] = useState(JSON.parse(JSON.stringify(INITIAL_BOARD)));
  const [selectedCell, setSelectedCell] = useState(null);
  const [isWon, setIsWon] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'win', 'error'

  const handleCellClick = (r, c) => {
    if (INITIAL_BOARD[r][c] !== null) return; // Can't select initial cells
    setSelectedCell({ r, c });
  };

  const handleNumberClick = (num) => {
    if (!selectedCell || isWon || isRevealed) return;
    const { r, c } = selectedCell;
    const newBoard = [...board];
    newBoard[r][c] = num;
    setBoard(newBoard);
    setSubmitStatus(null); // clear status on new input
  };

  const handleSubmit = () => {
    let win = true;
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (board[r][c] !== SOLUTION[r][c]) {
          win = false;
          break;
        }
      }
    }
    if (win) {
      setIsWon(true);
      setSubmitStatus('win');
    } else {
      setSubmitStatus('error');
    }
  };

  const handleReset = () => {
    setBoard(JSON.parse(JSON.stringify(INITIAL_BOARD)));
    setSelectedCell(null);
    setIsWon(false);
    setIsRevealed(false);
    setSubmitStatus(null);
  };

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key >= '1' && e.key <= '9') {
        handleNumberClick(parseInt(e.key));
      } else if (e.key === 'Backspace' || e.key === 'Delete') {
        if (selectedCell) {
          const { r, c } = selectedCell;
          const newBoard = [...board];
          newBoard[r][c] = null;
          setBoard(newBoard);
          setSubmitStatus(null);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCell, board]);

  return (
    <div className="sudoku-wrapper">
      <div className="sudoku-container">
        <div className="sudoku-left-col">
          <div className="sudoku-board-area">
            <div className="sudoku-grid">
            {board.map((row, r) => (
              row.map((cell, c) => {
                const isInitial = INITIAL_BOARD[r][c] !== null;
                
                let displayValue = cell;
                let cellClass = `sudoku-cell r-${r} c-${c} `;
                
                if (isInitial) {
                  cellClass += 'initial ';
                } else if (isRevealed) {
                  displayValue = SOLUTION[r][c];
                  if (cell === SOLUTION[r][c]) {
                    cellClass += 'revealed-correct ';
                  } else if (cell !== null) {
                    cellClass += 'revealed-incorrect ';
                  } else {
                    cellClass += 'revealed-missed ';
                  }
                } else {
                  if (cell !== null) cellClass += 'user-filled ';
                }
                
                const isSelected = !isRevealed && selectedCell?.r === r && selectedCell?.c === c;
                const isRelated = !isRevealed && selectedCell && (selectedCell.r === r || selectedCell.c === c);
                
                if (isSelected) cellClass += 'selected ';
                if (isRelated && !isSelected) cellClass += 'related ';
                
                return (
                  <div
                    key={`${r}-${c}`}
                    className={cellClass.trim()}
                    onClick={() => handleCellClick(r, c)}
                  >
                    {displayValue}
                  </div>
                );
              })
            ))}
            
            {/* 3x3 Grid Borders overlay */}
            <div className="sudoku-grid-lines">
              <div className="line-v v1"></div>
              <div className="line-v v2"></div>
              <div className="line-h h1"></div>
              <div className="line-h h2"></div>
            </div>
          </div>
          </div> {/* close sudoku-board-area */}
          

        </div> {/* close sudoku-left-col */}

        <div className="sudoku-info">
          <h3 className="sudoku-title">SUDOKU</h3>
          
          <div className="sudoku-numpad">
            {[1,2,3,4,5,6,7,8,9].map(num => (
              <button key={num} className="numpad-btn" onClick={() => handleNumberClick(num)}>
                {num}
              </button>
            ))}
            <button className="numpad-btn erase" onClick={() => handleNumberClick(null)}>
              ⌫
            </button>
          </div>

          <div className="sudoku-actions-right">
            <button className="sudoku-btn submit-btn" onClick={handleSubmit}>Submit Ans</button>
            <button className="sudoku-btn reveal-btn" onClick={() => setIsRevealed(!isRevealed)}>
              {isRevealed ? "Hide Ans" : "Show Ans"}
            </button>
            <button className="sudoku-btn reset-btn" onClick={handleReset}>Reset Game</button>
          </div>

          {submitStatus === 'win' && (
            <div className="sudoku-win-message">
              Peace achieved! 🌿
            </div>
          )}
          {submitStatus === 'error' && (
            <div className="sudoku-error-message">
              Not quite right yet. Keep trying! 🌸
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
