import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Timer, Book, Map, Brain, Trophy, Home, Lock } from 'lucide-react';
import { questionsDatabase } from '../data/questionsDatabase';

const BibleGame = () => {
  // Principal states
  const [gameState, setGameState] = useState('menu');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState('facil');
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(30);
  const [progress, setProgress] = useState({ current: 1, total: 0 });
  const [questions, setQuestions] = useState<any[]>([]);

  // Player stats management with localStorage
  const [playerStats, setPlayerStats] = useState(() => {
    const saved = localStorage.getItem('playerStats');
    return saved ? JSON.parse(saved) : {
      totalGames: 0,
      totalScore: 0,
      highestScore: 0,
      achievements: [],
      unlockedLevels: ['facil'],
      categoryProgress: {},
      streak: 0,
      lastPlayed: null
    };
  });

  // Effects
  useEffect(() => {
    localStorage.setItem('playerStats', JSON.stringify(playerStats));
  }, [playerStats]);

  useEffect(() => {
    if (selectedCategory && selectedLevel) {
      const categoryQuestions = questionsDatabase.categories[selectedCategory].levels[selectedLevel];
      setQuestions([...categoryQuestions]); // Create a new array to avoid reference issues
      setProgress(prev => ({ ...prev, total: categoryQuestions.length }));
    }
  }, [selectedCategory, selectedLevel]);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameState === 'playing' && timer > 0) {
      interval = setInterval(() => setTimer(prev => prev - 1), 1000);
    } else if (timer === 0 && gameState === 'playing') {
      endGame();
    }
    return () => clearInterval(interval);
  }, [gameState, timer]);

  // Game functions
  const startGame = (category: string, level: string) => {
    const categoryQuestions = questionsDatabase.categories[category].levels[level];
    if (!categoryQuestions || categoryQuestions.length === 0) return;

    setSelectedCategory(category);
    setSelectedLevel(level);
    setQuestions([...categoryQuestions]);
    setCurrentQuestion(categoryQuestions[0]);
    setScore(0);
    setTimer(30);
    setProgress({ current: 1, total: categoryQuestions.length });
    setGameState('playing');
    setSelectedAnswer(null);
  };

  const calculatePoints = () => {
    const basePoints = 10;
    const timeBonus = Math.floor(timer / 5);
    const difficultyMultiplier = 
      selectedLevel === 'facil' ? 1 :
      selectedLevel === 'medio' ? 1.5 : 2;
    
    return Math.floor((basePoints + timeBonus) * difficultyMultiplier);
  };

  const checkAnswer = (selectedIndex: number) => {
    if (selectedAnswer !== null) return; // Prevent multiple selections
    setSelectedAnswer(selectedIndex);

    // Verificar si la respuesta es correcta
    const isCorrect = currentQuestion.correct === selectedIndex;
    if (isCorrect) {
      const points = calculatePoints();
      setScore(prev => prev + points);
    }

    // Mostrar la respuesta correcta/incorrecta por 1.5 segundos
    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach((button, index) => {
      if (index === selectedIndex) {
        button.classList.add(isCorrect ? 'correct' : 'incorrect');
      }
      if (index === currentQuestion.correct && !isCorrect) {
        button.classList.add('correct');
      }
    });

    setTimeout(() => {
      // Limpiar clases antes de pasar a la siguiente pregunta
      buttons.forEach(button => {
        button.classList.remove('correct', 'incorrect');
      });
      nextQuestion();
    }, 1500);
  };

  const nextQuestion = () => {
    if (!questions.length) return;
    
    const currentIndex = questions.findIndex(q => q.id === currentQuestion.id);
    if (currentIndex < questions.length - 1) {
      setCurrentQuestion(questions[currentIndex + 1]);
      setTimer(30);
      setProgress(prev => ({
        ...prev,
        current: prev.current + 1
      }));
      setSelectedAnswer(null);
    } else {
      endGame();
    }
  };

  const endGame = () => {
    const finalGameResult = {
      category: selectedCategory,
      level: selectedLevel,
      score: score,
      date: new Date().toISOString()
    };

    // Calcular porcentaje de respuestas correctas
    const totalPossibleScore = questions.length * 20; // 20 puntos máximos por pregunta
    const scorePercentage = (score / totalPossibleScore) * 100;

    setPlayerStats(prev => {
      const today = new Date().toDateString();
      const wasPlayedToday = prev.lastPlayed === today;
      
      // Determinar si se desbloquean nuevos niveles
      let newUnlockedLevels = [...prev.unlockedLevels];
      
      if (selectedLevel === 'facil' && scorePercentage >= 70 && !prev.unlockedLevels.includes('medio')) {
        newUnlockedLevels.push('medio');
        alert('¡Has desbloqueado el nivel medio!');
      }
      
      if (selectedLevel === 'medio' && scorePercentage >= 70 && !prev.unlockedLevels.includes('dificil')) {
        newUnlockedLevels.push('dificil');
        alert('¡Has desbloqueado el nivel difícil!');
      }
      
      return {
        ...prev,
        totalGames: prev.totalGames + 1,
        totalScore: prev.totalScore + score,
        highestScore: Math.max(prev.highestScore, score),
        streak: wasPlayedToday ? prev.streak : prev.streak + 1,
        lastPlayed: today,
        unlockedLevels: newUnlockedLevels,
        categoryProgress: {
          ...prev.categoryProgress,
          [selectedCategory!]: (prev.categoryProgress[selectedCategory!] || 0) + 1
        }
      };
    });

    checkAchievements();
    setGameState('results');
  };

  const checkAchievements = () => {
    const newAchievements = [...playerStats.achievements];

    // Check first game achievement
    if (playerStats.totalGames === 0) {
      newAchievements.push('primerJuego');
    }

    // Check perfect score achievement
    if (score === questions.length * 20 && selectedLevel === 'dificil') {
      newAchievements.push('experto');
    }

    // Check streak achievement
    if (playerStats.streak >= 9) {
      newAchievements.push('persistente');
    }

    // Update achievements if new ones were earned
    if (newAchievements.length > playerStats.achievements.length) {
      setPlayerStats(prev => ({
        ...prev,
        achievements: [...new Set(newAchievements)]
      }));
    }
  };

  // Render functions
  const renderMenu = () => (
    <Card className="p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Juegos Bíblicos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              {category.icon === 'brain' && <Brain className="w-8 h-8 mb-2 text-blue-600" />}
              <span className="font-semibold">{category.name}</span>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-6 bg-white p-4 rounded-lg shadow">
        <h2 className="font-bold mb-2">Estadísticas del Jugador</h2>
        <p>Puntuación Total: {playerStats.totalScore}</p>
        <p>Mejor Puntuación: {playerStats.highestScore}</p>
        <p>Juegos Jugados: {playerStats.totalGames}</p>
        {playerStats.streak > 1 && <p>Racha actual: {playerStats.streak} días</p>}
      </div>
    </Card>
  );

  const renderCategory = () => (
    <Card className="p-6">
      <h2 className="text-xl font-bold mb-4">
        {selectedCategory && questionsDatabase.categories[selectedCategory].name}
      </h2>
      
      <div className="grid gap-4">
        {['facil', 'medio', 'dificil'].map(level => {
          const isUnlocked = playerStats.unlockedLevels.includes(level);
          return (
            <button
              key={level}
              onClick={() => isUnlocked && startGame(selectedCategory!, level)}
              disabled={!isUnlocked}
              className={`
                p-4 rounded-lg flex justify-between items-center
                ${isUnlocked 
                  ? 'bg-blue-50 hover:bg-blue-100' 
                  : 'bg-gray-100 cursor-not-allowed'
                }
              `}
            >
              <span className="capitalize font-semibold">{level}</span>
              {!isUnlocked && <Lock className="w-4 h-4 text-gray-400" />}
            </button>
          );
        })}
      </div>

      <button
        onClick={() => setGameState('menu')}
        className="mt-6 flex items-center justify-center w-full p-3 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
      >
        <Home className="w-4 h-4 mr-2" />
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
            {currentQuestion.options.map((option: string, index: number) => (
              <button
                key={`${currentQuestion.id}-${index}`}
                onClick={() => checkAnswer(index)}
                disabled={selectedAnswer !== null}
                className={`
                  option-btn w-full p-3 text-left rounded-lg
                  ${selectedAnswer === null 
                    ? 'bg-white border-2 border-blue-100 hover:border-blue-500' 
                    : selectedAnswer === index
                      ? currentQuestion.correct === index
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                      : currentQuestion.correct === index && selectedAnswer !== null
                        ? 'bg-green-500 text-white'
                        : 'bg-white border-2 border-blue-100'
                  }
                  transition-colors
                `}
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
        <p className="text-gray-600">
          Categoría: {selectedCategory && questionsDatabase.categories[selectedCategory].name}
        </p>
        <p className="text-gray-600 capitalize">
          Nivel: {selectedLevel}
        </p>
      </div>

      <button
        onClick={() => setGameState('menu')}
        className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
