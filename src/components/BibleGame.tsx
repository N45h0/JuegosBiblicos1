import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Timer, Book, Map, Brain, Trophy, Star, Home, Lock } from 'lucide-react';
import { questionsDatabase } from '../data/questionsDatabase';

interface PlayerStats {
  totalGames: number;
  totalScore: number;
  highestScore: number;
  achievements: string[];
  unlockedLevels: string[];
  categoryProgress: {
    [key: string]: number;
  };
  streak: number;
  lastPlayed: string | null;
  perfectGames: {
    [key: string]: number;
  };
}

const BibleGame = () => {
  // Estados principales
  const [gameState, setGameState] = useState('menu');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState('facil');
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(30);
  const [progress, setProgress] = useState({ current: 1, total: 0 });
  const [questions, setQuestions] = useState<any[]>([]);
  const [answeredQuestion, setAnsweredQuestion] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  // Estado del jugador
  const [playerStats, setPlayerStats] = useState<PlayerStats>(() => {
    const saved = localStorage.getItem('playerStats');
    return saved ? JSON.parse(saved) : {
      totalGames: 0,
      totalScore: 0,
      highestScore: 0,
      achievements: [],
      unlockedLevels: ['facil'],
      categoryProgress: {},
      streak: 0,
      lastPlayed: null,
      perfectGames: {
        facil: 0,
        medio: 0,
        dificil: 0
      }
    };
  });

  // Efectos
  useEffect(() => {
    localStorage.setItem('playerStats', JSON.stringify(playerStats));
  }, [playerStats]);

  useEffect(() => {
    if (selectedCategory && selectedLevel) {
      const categoryQuestions = questionsDatabase.categories[selectedCategory].levels[selectedLevel];
      setQuestions([...categoryQuestions]); // Crear nuevo array para evitar problemas de referencia
      setProgress(prev => ({ ...prev, total: categoryQuestions.length }));
    }
  }, [selectedCategory, selectedLevel]);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameState === 'playing' && timer > 0 && !answeredQuestion) {
      interval = setInterval(() => setTimer(prev => prev - 1), 1000);
    } else if (timer === 0 && !answeredQuestion) {
      handleTimeout();
    }
    return () => clearInterval(interval);
  }, [gameState, timer, answeredQuestion]);

  // Funciones del juego
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
    setAnsweredQuestion(false);
    setSelectedOption(null);
    setShowExplanation(false);
  };

  const handleTimeout = () => {
    setAnsweredQuestion(true);
    setShowExplanation(true);
    setTimeout(() => {
      nextQuestion();
    }, 2000);
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
    if (answeredQuestion) return;
    
    setSelectedOption(selectedIndex);
    setAnsweredQuestion(true);
    setShowExplanation(true);

    const isCorrect = currentQuestion.correct === selectedIndex;
    if (isCorrect) {
      const points = calculatePoints();
      setScore(prev => prev + points);
    }

    setTimeout(() => {
      nextQuestion();
    }, 2000);
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
      setAnsweredQuestion(false);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      endGame();
    }
  };

  const endGame = () => {
    const totalPossiblePoints = questions.length * 20; // Máximo posible por pregunta
    const scorePercentage = (score / totalPossiblePoints) * 100;

    setPlayerStats(prev => {
      const today = new Date().toDateString();
      const wasPlayedToday = prev.lastPlayed === today;
      
      const newStats = {
        ...prev,
        totalGames: prev.totalGames + 1,
        totalScore: prev.totalScore + score,
        highestScore: Math.max(prev.highestScore, score),
        streak: wasPlayedToday ? prev.streak : prev.streak + 1,
        lastPlayed: today,
        categoryProgress: {
          ...prev.categoryProgress,
          [selectedCategory!]: (prev.categoryProgress[selectedCategory!] || 0) + 1
        }
      };

      // Actualizar juegos perfectos
      if (scorePercentage === 100) {
        newStats.perfectGames = {
          ...prev.perfectGames,
          [selectedLevel]: (prev.perfectGames[selectedLevel] || 0) + 1
        };
      }

      // Desbloquear niveles basado en el rendimiento
      if (scorePercentage >= 70) {
        if (selectedLevel === 'facil' && !prev.unlockedLevels.includes('medio')) {
          newStats.unlockedLevels = [...prev.unlockedLevels, 'medio'];
          setTimeout(() => alert('¡Felicidades! Has desbloqueado el nivel medio!'), 500);
        } else if (selectedLevel === 'medio' && !prev.unlockedLevels.includes('dificil')) {
          newStats.unlockedLevels = [...prev.unlockedLevels, 'dificil'];
          setTimeout(() => alert('¡Felicidades! Has desbloqueado el nivel difícil!'), 500);
        }
      }

      return newStats;
    });

    checkAchievements();
    setGameState('results');
  };

  const checkAchievements = () => {
    const newAchievements = [...playerStats.achievements];

    // Primer juego
    if (playerStats.totalGames === 0) {
      newAchievements.push('primerJuego');
    }

    // Experto (juego perfecto en nivel difícil)
    if (score === questions.length * 20 && selectedLevel === 'dificil') {
      newAchievements.push('experto');
    }

    // Persistente (10 días seguidos)
    if (playerStats.streak >= 9) {
      newAchievements.push('persistente');
    }

    if (newAchievements.length > playerStats.achievements.length) {
      setPlayerStats(prev => ({
        ...prev,
        achievements: [...new Set(newAchievements)]
      }));
    }
  };

  const getOptionClassName = (index: number) => {
    const baseClasses = 'w-full p-3 text-left rounded-lg transition-colors';
    
    if (!answeredQuestion) {
      return `${baseClasses} bg-white border-2 border-blue-100 hover:border-blue-500`;
    }

    if (currentQuestion.correct === index) {
      return `${baseClasses} bg-green-500 text-white`;
    }

    if (selectedOption === index) {
      return `${baseClasses} bg-red-500 text-white`;
    }

    return `${baseClasses} bg-white border-2 border-blue-100 opacity-50`;
  };

  // Componentes de renderizado
  const renderMenu = () => (
    <div className="flex flex-col p-6 w-full max-w-md mx-auto space-y-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        Juegos Bíblicos
      </h1>
      
      {Object.entries(questionsDatabase.categories).map(([key, category]) => (
        <button
          key={key}
          onClick={() => {
            setSelectedCategory(key);
            setGameState('category');
          }}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-xl p-8 flex flex-col items-center justify-center transition-all"
        >
          <div className="p-4 mb-2">
            {category.icon === 'book' ? 
              <span className="text-4xl">📖</span> : 
              <span className="text-4xl">🗺️</span>
            }
          </div>
          <span className="text-2xl font-medium text-white">{category.name}</span>
        </button>
      ))}

      <h2 className="text-3xl font-bold text-gray-800 mb-4">
        Estadísticas
      </h2>
    </div>
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
    <div className="w-full max-w-md mx-auto p-6">
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-4 flex justify-between items-center">
          <span className="text-lg">
            Pregunta {progress.current}/{progress.total}
          </span>
          <span className="text-lg">
            Puntuación: {score}
          </span>
        </div>

        {currentQuestion && (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-8">
              {currentQuestion.question}
            </h2>
            
            <div className="space-y-4">
              {currentQuestion.options.map((option: string, index: number) => (
                <button
                  key={`${currentQuestion.id}-${index}`}
                  onClick={() => checkAnswer(index)}
                  disabled={answeredQuestion}
                  className={`
                    w-full p-4 rounded-xl text-lg transition-all
                    ${!answeredQuestion
                      ? 'bg-gray-100 hover:bg-gray-200'
                      : currentQuestion.correct === index
                        ? 'bg-green-500 text-white'
                        : selectedOption === index
                          ? 'bg-red-500 text-white'
                          : 'bg-gray-100'
                    }
                  `}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
  const renderResults = () => (
    <Card className="p-6 text-center">
      <h2 className="text-2xl font-bold mb-4">¡Juego Terminado!</h2>
      <div className="mb-6">
        <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
        <div className="space-y-2">
          <p className="text-xl font-bold">Puntuación Final: {score}</p>
          <p className="text-gray-600">
            Categoría: {selectedCategory && questionsDatabase.categories[selectedCategory].name}
          </p>
          <p className="text-gray-600 capitalize">
            Nivel: {selectedLevel}
          </p>
        </div>
      </div>

      {/* Nueva sección de estadísticas detalladas */}
      <div className="mb-6 bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">Resumen del juego</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>Preguntas totales:</div>
          <div>{questions.length}</div>
          <div>Respuestas correctas:</div>
          <div>{Math.floor(score / 20)}</div>
          <div>Precisión:</div>
          <div>{((Math.floor(score / 20) / questions.length) * 100).toFixed(1)}%</div>
        </div>
      </div>

      <div className="grid gap-3">
        <button
          onClick={() => startGame(selectedCategory!, selectedLevel)}
          className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Jugar de nuevo
        </button>
        
        <button
          onClick={() => setGameState('category')}
          className="w-full p-3 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors"
        >
          Cambiar nivel
        </button>
        
        <button
          onClick={() => setGameState('menu')}
          className="w-full p-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
        >
          Volver al Menú Principal
        </button>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto">
        {gameState === 'menu' && renderMenu()}
        {gameState === 'category' && renderCategory()}
        {gameState === 'playing' && renderGame()}
        {gameState === 'results' && renderResults()}
      </div>
    </div>
  );
};

export default BibleGame;
