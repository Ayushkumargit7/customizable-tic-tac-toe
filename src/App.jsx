import { useState } from 'react';
import Game from './components/Game';
import GameSettings from './components/GameSettings';
import './App.css';

function App() {
  const [gameSettings, setGameSettings] = useState({
    gridSize: 3,
    winStreak: 3,
    gameStarted: false,
  });

  const handleStartGame = (settings) => {
    setGameSettings({
      ...settings,
      gameStarted: true,
    });
  };

  const handleResetGame = () => {
    setGameSettings({
      ...gameSettings,
      gameStarted: false,
    });
  };

  return (
    <div className="app">
      <h1>Customizable Tic-Tac-Toe</h1>
      {!gameSettings.gameStarted ? (
        <GameSettings onStartGame={handleStartGame} />
      ) : (
        <Game 
          gridSize={gameSettings.gridSize}
          winStreak={gameSettings.winStreak}
          onResetGame={handleResetGame}
        />
      )}
    </div>
  );
}

export default App;