// Importaciones
import React, { useState, useEffect } from 'react';
import { questionsDatabase } from './data/questionsDatabase';

const BibleGame = () => {
  // Estados principales
  const [gameState, setGameState] = useState('menu'); // menu, category, playing, results
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState('facil');
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(30);
  const [gameHistory, setGameHistory] = useState(() => {
    const saved = localStorage.getItem('gameHistory');
    return saved ? JSON.parse(saved) : [];
  });
  const [playerStats, setPlayerStats] = useState(() => {
    const saved = localStorage.getItem('playerStats');
    return saved ? JSON.parse(saved) : {
      totalGames: 0,
      totalScore: 0,
      highestScore: 0,
      achievements: [],
      unlockedLevels: ['facil'],
      categoryProgress: {}
    };
  });

  // Efectos
  useEffect(() => {
    localStorage.setItem('playerStats', JSON.stringify(playerStats));
  }, [playerStats]);

  useEffect(() => {
    localStorage.setItem('gameHistory', JSON.stringify(gameHistory));
  }, [gameHistory]);

  useEffect(() => {
    let interval;
    if (gameState === 'playing' && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      endGame();
    }
    return () => clearInterval(interval);
  }, [gameState, timer]);

  // Funciones del juego
  const startGame = (category, level) => {
    const questions = questionsDatabase.categories[category].levels[level];
    setSelectedCategory(category);
    setSelectedLevel(level);
    setCurrentQuestion(questions[0]);
    setScore(0);
    setTimer(30);
    setGameState('playing');
  };

  const checkAnswer = (selectedIndex) => {
    if (currentQuestion.correct === selectedIndex) {
      const points = calculatePoints();
      setScore(prev => prev + points);
      updatePlayerStats(points);
    }
    // Mostrar retroalimentación
    const options = document.querySelectorAll('.option-btn');
    options.forEach((option, index) => {
      option.disabled = true;
      if (index === selectedIndex) {
        option.classList.add(currentQuestion.correct === selectedIndex ? 'correct' : 'incorrect');
      }
    });
    
    // Esperar antes de pasar a la siguiente pregunta
    setTimeout(() => {
      nextQuestion();
    }, 1500);
  };

  const nextQuestion = () => {
  const questions = questionsDatabase.categories[selectedCategory].levels[selectedLevel];
  const currentIndex = questions.findIndex(q => q.id === currentQuestion.id);
  
  // Si hay más preguntas
  if (currentIndex < questions.length - 1) {
    setCurrentQuestion(questions[currentIndex + 1]);
    setTimer(30); // Reinicia el temporizador

    // Actualizar progreso
    setProgress({
      current: currentIndex + 2, // +2 porque el índice empieza en 0 y queremos mostrar la siguiente
      total: questions.length
    });
  } else {
    // Si era la última pregunta
    const gameResult = {
      date: new Date().toISOString(),
      category: selectedCategory,
      level: selectedLevel,
      score,
      questionsAnswered: questions.length
    };

    // Guardar en historial
    setGameHistory(prev => [gameResult, ...prev]);
    localStorage.setItem('gameHistory', JSON.stringify([gameResult, ...gameHistory]));

    // Actualizar estadísticas del jugador
    updatePlayerStats(score, questions.length);

    // Verificar logros
    checkAchievements(score, selectedLevel);

    // Terminar el juego
    setGameState('results');
  }
};

// Función helper para actualizar estadísticas
const updatePlayerStats = (finalScore, totalQuestions) => {
  setPlayerStats(prev => {
    const newStats = {
      ...prev,
      totalGames: prev.totalGames + 1,
      totalScore: prev.totalScore + finalScore,
      highestScore: Math.max(prev.highestScore, finalScore),
      [`${selectedLevel}GamesPlayed`]: (prev[`${selectedLevel}GamesPlayed`] || 0) + 1,
      categoryProgress: {
        ...prev.categoryProgress,
        [selectedCategory]: (prev.categoryProgress[selectedCategory] || 0) + 1
      }
    };

    // Verificar si debe desbloquear siguiente nivel
    if (selectedLevel === 'facil' && finalScore >= 80 && !prev.unlockedLevels.includes('medio')) {
      newStats.unlockedLevels = [...prev.unlockedLevels, 'medio'];
    }
    if (selectedLevel === 'medio' && finalScore >= 80 && !prev.unlockedLevels.includes('dificil')) {
      newStats.unlockedLevels = [...prev.unlockedLevels, 'dificil'];
    }

    localStorage.setItem('playerStats', JSON.stringify(newStats));
    return newStats;
  });
};

// Función helper para verificar logros
const checkAchievements = (finalScore, level) => {
  const newAchievements = [];
  
  // Verificar diferentes logros
  if (playerStats.totalGames === 0) {
    newAchievements.push('primerJuego');
  }
  if (finalScore === 100 && level === 'dificil') {
    newAchievements.push('experto');
  }
  if (playerStats.streak >= 9) { // 9 porque este juego hará 10
    newAchievements.push('persistente');
  }

  // Si hay nuevos logros, actualizarlos
  if (newAchievements.length > 0) {
    setPlayerStats(prev => ({
      ...prev,
      achievements: [...new Set([...prev.achievements, ...newAchievements])]
    }));
  }
};

  // Renderizado de componentes
  const renderMenu = () => (/* ... código del menú ... */);
  const renderCategory = () => (/* ... código de categorías ... */);
  const renderGame = () => (/* ... código del juego ... */);
  const renderResults = () => (/* ... código de resultados ... */);

  // Renderizado principal
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 p-4">
      <div className="max-w-2xl mx-auto">
        {gameState === 'menu' && renderMenu()}
        {gameState === 'category' && renderCategory()}
        {gameState === 'playing' && renderGame()}
        {gameState === 'results' && renderResults()}
      </div>
    </div>
  );
};

export default BibleGame;
