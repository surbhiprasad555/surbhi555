import React, { useState, useEffect } from 'react';
import './TicTacToe.css';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const checkWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
      [0, 4, 8], [2, 4, 6]             // diagonals
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const winner = checkWinner(board);
  const isDraw = !winner && board.every(square => square !== null);

  const handleClick = (i) => {
    // Only allow click if it's the user's turn (X) and cell is empty
    if (board[i] || winner || !xIsNext) return;
    const newBoard = [...board];
    newBoard[i] = 'X';
    setBoard(newBoard);
    setXIsNext(false);
  };

  // Bot AI logic
  useEffect(() => {
    if (!xIsNext && !winner && !isDraw) {
      const timeout = setTimeout(() => {
        const newBoard = [...board];
        const emptyIndices = newBoard.map((val, idx) => val === null ? idx : null).filter(val => val !== null);
        
        if (emptyIndices.length > 0) {
          let bestMove = -1;
          
          const getWinningMove = (player) => {
            const lines = [
              [0, 1, 2], [3, 4, 5], [6, 7, 8],
              [0, 3, 6], [1, 4, 7], [2, 5, 8],
              [0, 4, 8], [2, 4, 6]
            ];
            for (let [a, b, c] of lines) {
              if (newBoard[a] === player && newBoard[b] === player && newBoard[c] === null) return c;
              if (newBoard[a] === player && newBoard[c] === player && newBoard[b] === null) return b;
              if (newBoard[b] === player && newBoard[c] === player && newBoard[a] === null) return a;
            }
            return -1;
          };

          const winMove = getWinningMove('O');
          const blockMove = getWinningMove('X');

          if (winMove !== -1) {
            bestMove = winMove;
          } else if (blockMove !== -1) {
            bestMove = blockMove;
          } else if (newBoard[4] === null) {
            bestMove = 4; // take center
          } else {
            bestMove = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
          }

          newBoard[bestMove] = 'O';
          setBoard(newBoard);
          setXIsNext(true);
        }
      }, 500); // slight delay so it feels like it's "thinking"
      
      return () => clearTimeout(timeout);
    }
  }, [xIsNext, board, winner, isDraw]);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  // Hand-drawn SVG for X
  const renderX = () => (
    <svg viewBox="0 0 100 100" className="ttt-mark ttt-x">
      <path d="M 20 20 L 80 80" stroke="#F48FB1" strokeWidth="6" strokeLinecap="round" fill="none" className="path-draw" />
      <path d="M 80 20 L 20 80" stroke="#F48FB1" strokeWidth="6" strokeLinecap="round" fill="none" className="path-draw" />
    </svg>
  );

  // Hand-drawn SVG for O
  const renderO = () => (
    <svg viewBox="0 0 100 100" className="ttt-mark ttt-o">
      <circle cx="50" cy="50" r="35" stroke="#90CAF9" strokeWidth="6" strokeLinecap="round" fill="none" className="path-draw" />
    </svg>
  );

  return (
    <div className="ttt-container">
      <div className="ttt-board">
        {board.map((square, i) => (
          <div 
            key={i} 
            className={`ttt-cell cell-${i}`} 
            onClick={() => handleClick(i)}
          >
            {square === 'X' && renderX()}
            {square === 'O' && renderO()}
          </div>
        ))}
        
        {/* SVG overlay to draw the grid lines so they look hand-drawn */}
        <svg className="ttt-grid-lines" viewBox="0 0 300 300">
           {/* Verticals */}
           <path d="M 100 10 L 100 290" stroke="#E6A8D7" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6"/>
           <path d="M 200 10 L 200 290" stroke="#E6A8D7" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6"/>
           {/* Horizontals */}
           <path d="M 10 100 L 290 100" stroke="#E6A8D7" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6"/>
           <path d="M 10 200 L 290 200" stroke="#E6A8D7" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6"/>
        </svg>

        {(winner || isDraw) && (
          <div className="ttt-overlay">
            <div className="ttt-result">
              {winner ? `${winner} Wins!` : "It's a draw!"}
            </div>
            <button className="ttt-reset" onClick={resetGame}>Play Again</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicTacToe;
