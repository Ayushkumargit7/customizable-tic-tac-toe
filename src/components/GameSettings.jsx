import { useState } from 'react';
import PropTypes from 'prop-types';

function GameSettings({ onStartGame }) {
  const [gridSize, setGridSize] = useState(3);
  const [winStreak, setWinStreak] = useState(3);

  const handleSubmit = (e) => {
    e.preventDefault();
    onStartGame({ gridSize, winStreak });
  };

  return (
    <div className="game-settings">
      <h2>Game Settings</h2>
      <form onSubmit={handleSubmit}>
        <div className="setting-group">
          <label htmlFor="gridSize">Grid Size (3-10):</label>
          <input
            type="number"
            id="gridSize"
            min="3"
            max="10"
            value={gridSize}
            onChange={(e) => setGridSize(Number(e.target.value))}
          />
        </div>
        <div className="setting-group">
          <label htmlFor="winStreak">Win Streak (3-{gridSize}):</label>
          <input
            type="number"
            id="winStreak"
            min="3"
            max={gridSize}
            value={winStreak}
            onChange={(e) => setWinStreak(Number(e.target.value))}
          />
        </div>
        <button type="submit">Start Game</button>
      </form>
    </div>
  );
}

GameSettings.propTypes = {
  onStartGame: PropTypes.func.isRequired,
};

export default GameSettings;