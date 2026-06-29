import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, CheckCircle, XCircle, Trophy } from 'lucide-react';
import { Button } from './ui/button';
import { modules } from '../data/modules';
import type { Screen, UserData } from '../App';
import { calculateQuizRewards, calculateModuleRewards, calculateLevel } from '../utils/gameUtils';

interface QuizScreenProps {
  onNavigate: (screen: Screen) => void;
  updateUserData: (data: Partial<UserData>) => void;
  userData: UserData;
}

export function QuizScreen({ onNavigate, updateUserData, userData }: QuizScreenProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  // Get the selected module or default to first module
  const moduleId = userData.selectedModule || 'module1';
  const module = modules.find(m => m.id === moduleId) || modules[0];
  const questions = module.questions;

  const handleAnswerSelect = (index: number) => {
    if (!showFeedback) {
      setSelectedAnswer(index);
      setShowFeedback(true);
      if (index === questions[currentQuestion].correct) {
        setScore(score + 1);
      }
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      // Calculate rewards based on performance
      const quizRewards = calculateQuizRewards(score, questions.length);
      
      // Check if module is newly completed
      const isModuleComplete = !userData.completedModules.includes(moduleId);
      const moduleRewards = isModuleComplete ? calculateModuleRewards() : { xp: 0, coins: 0 };
      
      // Total rewards
      const totalXP = quizRewards.xp + moduleRewards.xp;
      const totalCoins = quizRewards.coins + moduleRewards.coins;
      const newXP = userData.xp + totalXP;
      const newLevel = calculateLevel(newXP);
      
      // Update user data
      const updates: Partial<UserData> = {
        xp: newXP,
        level: newLevel,
        coins: userData.coins + totalCoins,
        quizzesTaken: userData.quizzesTaken + 1
      };
      
      // Add to completed modules if newly completed
      if (isModuleComplete) {
        updates.completedModules = [...userData.completedModules, moduleId];
      }
      
      updateUserData(updates);
      setQuizComplete(true);
    }
  };

  // Get difficulty color
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (quizComplete) {
    const percentage = Math.round((score / questions.length) * 100);
    const coinsEarned = score * 10;
    
    return (
      <div className="h-full bg-gradient-to-br from-[#008080] to-[#66CCFF] flex flex-col items-center justify-center p-8 relative overflow-hidden">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.6 }}
          className="text-center z-10"
        >
          <Trophy className="w-24 h-24 text-[#FFD700] mx-auto mb-6" fill="#FFD700" />
          <h2 className="text-white mb-4">Quiz Complete! 🎉</h2>
          <div className="bg-white rounded-3xl p-8 mb-8 shadow-2xl max-w-sm">
            <p className="text-gray-600 mb-4">Your Score</p>
            <p className="text-[#008080] mb-2">{score} / {questions.length}</p>
            <p className="text-gray-500 mb-6">({percentage}% Correct)</p>
            
            <div className="bg-yellow-50 rounded-2xl p-6 border-2 border-[#FFD700] mb-4">
              <p className="text-gray-600 mb-2">Coins Earned</p>
              <p className="text-[#FFD700]">+{coinsEarned} 🪙</p>
            </div>

            <div className="grid grid-cols-3 gap-2 text-sm">
              <div className="bg-green-50 rounded-lg p-2">
                <p className="text-green-700">{questions.filter(q => q.difficulty === 'easy').length}</p>
                <p className="text-gray-600 text-xs">Easy</p>
              </div>
              <div className="bg-yellow-50 rounded-lg p-2">
                <p className="text-yellow-700">{questions.filter(q => q.difficulty === 'medium').length}</p>
                <p className="text-gray-600 text-xs">Medium</p>
              </div>
              <div className="bg-red-50 rounded-lg p-2">
                <p className="text-red-700">{questions.filter(q => q.difficulty === 'hard').length}</p>
                <p className="text-gray-600 text-xs">Hard</p>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button
              onClick={() => {
                setCurrentQuestion(0);
                setSelectedAnswer(null);
                setShowFeedback(false);
                setScore(0);
                setQuizComplete(false);
              }}
              variant="outline"
              className="bg-white/20 backdrop-blur-sm border-white text-white hover:bg-white/30 px-8 py-6 rounded-xl"
            >
              Retry Quiz
            </Button>
            <Button
              onClick={() => onNavigate('home')}
              className="bg-[#FFD700] text-[#008080] hover:bg-[#FFD700]/90 px-8 py-6 rounded-xl"
            >
              Back to Home
            </Button>
          </div>
        </motion.div>

        {/* Confetti effect */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: -20, x: Math.random() * 400 - 200, opacity: 1 }}
            animate={{ y: 900, opacity: 0 }}
            transition={{ duration: 2 + Math.random() * 2, delay: Math.random() * 0.5 }}
            className="absolute text-2xl pointer-events-none"
            style={{ left: '50%' }}
          >
            {['🎉', '🎊', '⭐', '🏆', '💰'][Math.floor(Math.random() * 5)]}
          </motion.div>
        ))}
      </div>
    );
  }

  const question = questions[currentQuestion];
  const isCorrect = selectedAnswer === question.correct;

  return (
    <div className="h-full bg-gradient-to-br from-teal-50 to-blue-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#008080] to-[#66CCFF] rounded-b-[40px] p-6 shadow-lg">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => onNavigate('home')}
            className="text-white"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h3 className="text-white text-sm">{module.title}</h3>
            <p className="text-white/70 text-xs">Quiz Challenge</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
            <span className="text-white">Q{currentQuestion + 1}/{questions.length}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            className="bg-[#FFD700] h-full rounded-full"
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 overflow-y-auto p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white rounded-3xl p-8 shadow-xl mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-xs ${getDifficultyColor(question.difficulty)}`}>
                  {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
                </span>
                <span className="text-gray-500 text-sm">Score: {score}/{currentQuestion + (showFeedback ? 1 : 0)}</span>
              </div>
              
              <h4 className="text-[#008080] mb-6">{question.question}</h4>

              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showFeedback}
                    className={`w-full text-left p-5 rounded-2xl border-2 transition-all ${
                      showFeedback
                        ? index === question.correct
                          ? 'bg-green-50 border-green-500'
                          : index === selectedAnswer
                          ? 'bg-red-50 border-red-500'
                          : 'border-gray-200 opacity-50'
                        : selectedAnswer === index
                        ? 'border-[#008080] bg-teal-50'
                        : 'border-gray-200 hover:border-[#008080]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-gray-800">{option}</span>
                      {showFeedback && index === question.correct && (
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      )}
                      {showFeedback && index === selectedAnswer && index !== question.correct && (
                        <XCircle className="w-6 h-6 text-red-500" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {showFeedback && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`rounded-3xl p-6 ${
                  isCorrect ? 'bg-green-50 border-2 border-green-500' : 'bg-red-50 border-2 border-red-500'
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  {isCorrect ? (
                    <>
                      <span className="text-3xl">😊</span>
                      <div>
                        <p className="text-green-700">Correct! Well done!</p>
                        <p className="text-green-600 text-sm">+10 coins</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <span className="text-3xl">🤔</span>
                      <div>
                        <p className="text-red-700">Not quite! Keep learning!</p>
                        <p className="text-red-600 text-sm">Review the lesson</p>
                      </div>
                    </>
                  )}
                </div>
                {question.explanation && (
                  <div className="bg-white rounded-xl p-4 mt-3">
                    <p className="text-sm text-gray-600">
                      <span className="text-[#008080]">Explanation: </span>
                      {question.explanation}
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Next Button */}
      {showFeedback && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6"
        >
          <Button
            onClick={handleNext}
            className="w-full bg-[#008080] hover:bg-[#008080]/90 text-white py-6 rounded-xl"
          >
            {currentQuestion === questions.length - 1 ? 'See Results' : 'Next Question'}
          </Button>
        </motion.div>
      )}
    </div>
  );
}