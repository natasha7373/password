import React, { useState, useEffect } from 'react';
import './HomeScreen.css'; 
import logoImage from './img/passwordLogo.png';

function HomeScreen({ onStart, gamePaused }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const highScore = localStorage.getItem('highScore') || '0';

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    
    return () => clearInterval(timerId);
  }, []);

  
  const timeString = currentTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

 
  const dateString = currentTime.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="home-screen">
    <div className="press-unlock"> Guess The Password!</div>
    <div className="date">{dateString}</div>
    <div className="time">{timeString}</div>
    <div className= "logo-img"> <img src={logoImage} alt="Logo" /></div>
    <button className="start-game" onClick={onStart}>
        {gamePaused ? 'Resume Game' : 'Start Game'}
      </button>
    </div>
  );
}

export default HomeScreen;
