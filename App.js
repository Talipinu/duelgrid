import React, { useState } from 'react';
import LobbyScreen from './src/screens/LobbyScreen';
import GameScreen from './src/screens/GameScreen';

export default function App() {
  const [gameData, setGameData] = useState(null);

  const handleGameStart = (data) => {
    setGameData(data);
  };

  if (gameData) {
    return (
      <GameScreen
        gameRoomId={gameData.gameRoomId}
        playerName={gameData.playerName}
        initialGameState={gameData.gameState}
      />
    );
  }

  return <LobbyScreen onGameStart={handleGameStart} />;
}
