import React, { useState } from 'react';
import HomeScreen from './HomeScreen';
import Hangman from './Hangman';
import StageSelectionScreen from './StageSelectionScreen';
import './App.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [currentStage, setCurrentStage] = useState(0);
  // Initialize all stages as locked except the first one
  const [unlockedStages, setUnlockedStages] = useState([true, false, false, false, false]);

  const startGame = () => setCurrentScreen('game');

  const selectStage = (stageIndex) => {
    setCurrentStage(stageIndex);
    setCurrentScreen('game');
  };

  const goToStageSelection = () => setCurrentScreen('stageSelection');

  // Function to unlock the next stage
  const unlockNextStage = (stageIndex) => {
    setUnlockedStages(prevStages => 
      prevStages.map((unlocked, index) => index <= stageIndex + 1 ? true : unlocked)
    );
  };

  
  const handleStageComplete = () => {
    unlockNextStage(currentStage);
    goToStageSelection();
  };

  return (
    <div className="iphone-container">
      {currentScreen === 'home' && <HomeScreen onStart={() => setCurrentScreen('stageSelection')} />}
      {currentScreen === 'stageSelection' && (
        <StageSelectionScreen 
          onSelectStage={selectStage} 
          unlockedStages={unlockedStages} 
        />
      )}
      {currentScreen === 'game' && (
        <Hangman
          stage={currentStage}
          onStageSelect={goToStageSelection}
          onStageComplete={handleStageComplete} 
        />
      )}
    </div>
  );
}

export default App;
