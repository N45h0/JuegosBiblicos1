import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Timer, Book, Map, Brain, Trophy, Star, Home, Settings, Lock } from 'lucide-react';
import { questionsDatabase } from '../data/questionsDatabase';

const BibleGame = () => {
  // Estados principales
  const [gameState, setGameState] = useState('menu');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState('facil');
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(30);
  const [progress, setProgress] = useState({ current: 1, total: 0 });
  const [gameHistory, setGameHistory] = useState(() => {
    const saved = localStorage.getItem('gameHistory');
    return saved ? JSON.parse(saved) : [];
  });

  // Gestión del jugador
  const [playerStats, setPlayerStats] = useState(() => {
    const saved = localStorage.getItem('playerStats');
    return saved ? JSON.parse(saved) : {
      totalGames: 0,
      totalScore: 0,
      highestScore: 0,
      achievements: [],
      unlockedLevels: ['facil'],
      categoryProgress: {},
      streak: 0
    };
  });

  // Efectos
  useEffect(() => {
    localStorage.setItem('playerStats', JSON.stringify(playerStats));
  }, [playerStats]);

  useEffect(() => {
    localStorage.setItem('gameHistory', JSON.stringify(gameHistory));
  }, [gameHistory]);

  // Timer effect
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
    setProgress({ current: 1, total: questions.length });
    setGameState('playing');
  };

  const checkAnswer = (selectedIndex) => {
    if (currentQuestion.correct === selectedIndex) {
      const points = calculatePoints();
      setScore(prev => prev + points);
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

  const calculatePoints = () => {
    const basePoints = 10;
    const timeBonus = Math.floor(timer / 5);
    const difficultyMultiplier = 
      selectedLevel === 'facil' ? 1 :
      selectedLevel === 'medio' ? 1.5 : 2;
    
    return Math.floor((basePoints + timeBonus) * difficultyMultiplier);
  };
  const nextQuestion = () => {
    const questions = questionsDatabase.categories[selectedCategory].levels[selectedLevel];
    const currentIndex = questions.findIndex(q => q.id === currentQuestion.id);
    
    if (currentIndex < questions.length - 1) {
      setCurrentQuestion(questions[currentIndex + 1]);
      setTimer(30);
      setProgress(prev => ({
        ...prev,
        current: prev.current + 1
      }));
    } else {
      const gameResult = {
        date: new Date().toISOString(),
        category: selectedCategory,
        level: selectedLevel,
        score,
        questionsAnswered: questions.length
      };

      setGameHistory(prev => [gameResult, ...prev]);
      updateFinalStats(score);
      checkAchievements(score, selectedLevel);
      setGameState('results');
    }
  };

  const updateFinalStats = (finalScore) => {
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
        },
        streak: prev.streak + 1
      };

      if (selectedLevel === 'facil' && finalScore >= 80 && !prev.unlockedLevels.includes('medio')) {
        newStats.unlockedLevels = [...prev.unlockedLevels, 'medio'];
      }
      if (selectedLevel === 'medio' && finalScore >= 80 && !prev.unlockedLevels.includes('dificil')) {
        newStats.unlockedLevels = [...prev.unlockedLevels, 'dificil'];
      }

      return newStats;
    });
  };

  const checkAchievements = (finalScore, level) => {
    const newAchievements = [];
    
    if (playerStats.totalGames === 0) {
      newAchievements.push('primerJuego');
    }
    if (finalScore === 100 && level === 'dificil') {
      newAchievements.push('experto');
    }
    if (playerStats.streak >= 9) {
      newAchievements.push('persistente');
    }

    if (newAchievements.length > 0) {
      setPlayerStats(prev => ({
        ...prev,
        achievements: [...new Set([...prev.achievements, ...newAchievements])]
      }));
    }
  };

  const endGame = () => {
    const questions = questionsDatabase.categories[selectedCategory].levels[selectedLevel];
    const gameResult = {
      date: new Date().toISOString(),
      category: selectedCategory,
      level: selectedLevel,
      score,
      questionsAnswered: questions.length
    };

    setGameHistory(prev => [gameResult, ...prev]);
    updateFinalStats(score);
    setGameState('results');
  };

  // Renderizado de componentes
  const renderMenu = () => (
    <Card className="p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Juegos Bíblicos</h1>
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(questionsDatabase.categories).map(([key, category]) => (
          <button
            key={key}
            onClick={() => {
              setSelectedCategory(key);
              setGameState('category');
            }}
            className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <div className="flex flex-col items-center">
              {category.icon === 'book' && <Book className="w-8 h-8 mb-2 text-blue-600" />}
              {category.icon === 'map' && <Map className="w-8 h-8 mb-2 text-blue-600" />}
              <span className="font-semibold">{category.name}</span>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-6">
        <h2 className="font-bold mb-2">Estadísticas del Jugador</h2>
        <p>Puntuación Total: {playerStats.totalScore}</p>
        <p>Mejor Puntuación: {playerStats.highestScore}</p>
        <p>Juegos Jugados: {playerStats.totalGames}</p>
      </div>
    </Card>
  );

  const renderCategory = () => (
    <Card className="p-6">
      <h2 className="text-xl font-bold mb-4">
        {questionsDatabase.categories[selectedCategory].name}
      </h2>
      
      <div className="grid gap-4">
        {['facil', 'medio', 'dificil'].map(level => (
          <button
            key={level}
            onClick={() => startGame(selectedCategory, level)}
            disabled={!playerStats.unlockedLevels.includes(level)}
            className={`p-4 rounded-lg ${
              playerStats.unlockedLevels.includes(level)
                ? 'bg-blue-50 hover:bg-blue-100'
                : 'bg-gray-100 cursor-not-allowed'
            }`}
          >
            <div className="flex justify-between items-center">
              <span className="capitalize font-semibold">{level}</span>
              {level !== 'facil' && !playerStats.unlockedLevels.includes(level) && (
                <Lock className="w-4 h-4 text-gray-400" />
              )}
            </div>
          </button>
        ))}
      </div>

      <button
        onClick={() => setGameState('menu')}
        className="mt-4 p-2 text-blue-600 hover:text-blue-800"
      >
        Volver al Menú
      </button>
    </Card>
  );

  const renderGame = () => (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <Timer className="w-5 h-5 mr-2" />
          <span className="font-semibold">{timer}s</span>
        </div>
        <div className="flex items-center">
          <Trophy className="w-5 h-5 mr-2" />
          <span className="font-semibold">{score} pts</span>
        </div>
      </div>

      <div className="mb-2">
        <span className="text-sm text-gray-600">
          Pregunta {progress.current}/{progress.total}
        </span>
      </div>

      {currentQuestion && (
        <>
          <div className="mb-6">
            <h2 className="text-xl font-bold mt-2">
              {currentQuestion.question}
            </h2>
          </div>
          <div className="grid gap-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => checkAnswer(index)}
                className="option-btn w-full p-3 text-left rounded-lg bg-white border-2 border-blue-100 hover:border-blue-500 transition-colors"
              >
                {option}
              </button>
            ))}
          </div>
        </>
      )}
    </Card>
  );

  const renderResults = () => (
    <Card className="p-6 text-center">
      <h2 className="text-2xl font-bold mb-4">¡Juego Terminado!</h2>
      <div className="mb-6">
        <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
        <p className="text-xl font-bold">Puntuación Final: {score}</p>
      </div>

      <button
        onClick={() => setGameState('menu')}
        className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Volver al Menú Principal
      </button>
    </Card>
  );

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
