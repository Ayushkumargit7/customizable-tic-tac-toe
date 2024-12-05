import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Board from './Board';

function Game({ gridSize, winStreak, onResetGame }) {
  const [board, setBoard] = useState(Array(gridSize * gridSize).fill(''));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const checkWinner = useCallback((squares, position) => {
    const directions = [
      [1, 0],   // horizontal
      [0, 1],   // vertical
      [1, 1],   // diagonal
      [1, -1],  // anti-diagonal
    ];

    const player = squares[position];
    const row = Math.floor(position / gridSize);
    const col = position % gridSize;

    return directions.some(([dx, dy]) => {
      let count = 1;
      
      // Check forward direction
      for (let i = 1; i < winStreak; i++) {
        const newRow = row + (i * dy);
        const newCol = col + (i * dx);
        if (
          newRow < 0 || newRow >= gridSize ||
          newCol < 0 || newCol >= gridSize ||
          squares[newRow * gridSize + newCol] !== player
        ) break;
        count++;
      }

      // Check backward direction
      for (let i = 1; i < winStreak; i++) {
        const newRow = row - (i * dy);
        const newCol = col - (i * dx);
        if (
          newRow < 0 || newRow >= gridSize ||
          newCol < 0 || newCol >= gridSize ||
          squares[newRow * gridSize + newCol] !== player
        ) break;
        count++;
      }

      return count >= winStreak;
    });
  }, [gridSize, winStreak]);

  const handleClick = (i) => {
    if (winner || board[i]) return;

    const newBoard = board.slice();
    newBoard[i] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);

    if (checkWinner(newBoard, i)) {
      setWinner(xIsNext ? 'X' : 'O');
    } else if (!newBoard.includes('')) {
      setWinner('draw');
    } else {
      setXIsNext(!xIsNext);
    }
  };

  return (
    <div className="game">
      <div className="game-status">
        {winner
          ? winner === 'draw'
            ? "It's a draw!"
            : `Winner: ${winner}`
          : `Next player: ${xIsNext ? 'X' : 'O'}`}
      </div>
      <Board
        squares={board}
        gridSize={gridSize}
        onClick={handleClick}
      />
      <button className="reset-button" onClick={onResetGame}>
        Reset Game
      </button>
    </div>
  );
}

Game.propTypes = {
  gridSize: PropTypes.number.isRequired,
  winStreak: PropTypes.number.isRequired,
  onResetGame: PropTypes.func.isRequired,
};

export default Game;