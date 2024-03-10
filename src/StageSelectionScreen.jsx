import React from 'react';
import './StageSelectionScreen.css'; 

const StageSelectionScreen = ({ onSelectStage, unlockedStages }) => (
  <div className="stage-selection">
    <p>Select a Category</p>
    <div className="stages-grid">
      {['Stage 1: Sensorial Trivia', 'Stage 2: Written Word', 'Stage 3: Gen Z Slang', 'Stage 4: True Beauty', 'Stage 5: Strictly Business', 'Stage 6: Verified Foodie'].map((category, index) => (
        <button
          key={index}
          className={`stage-button ${!unlockedStages[index] ? 'locked' : ''}`}
          onClick={() => unlockedStages[index] && onSelectStage(index)}
          disabled={!unlockedStages[index]}
        >
          {category}
        </button>
      ))}
    </div>
  </div>
);

export default StageSelectionScreen;
