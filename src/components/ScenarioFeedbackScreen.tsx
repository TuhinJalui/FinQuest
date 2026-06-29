import { motion } from 'motion/react';
import { CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import { Button } from './ui/button';
import type { Choice } from '../data/scenarios';

interface ScenarioFeedbackScreenProps {
  choice: Choice;
  onContinue: () => void;
}

export function ScenarioFeedbackScreen({ choice, onContinue }: ScenarioFeedbackScreenProps) {
  const getOutcomeConfig = () => {
    switch (choice.outcome) {
      case 'good':
        return {
          icon: CheckCircle,
          emoji: '😊',
          bgColor: 'from-green-400 to-green-600',
          cardBg: 'bg-green-50',
          borderColor: 'border-green-500',
          textColor: 'text-green-700',
          iconColor: 'text-green-500',
          message: 'Great move! 🎉'
        };
      case 'average':
        return {
          icon: AlertCircle,
          emoji: '🤔',
          bgColor: 'from-yellow-400 to-orange-500',
          cardBg: 'bg-yellow-50',
          borderColor: 'border-yellow-500',
          textColor: 'text-yellow-700',
          iconColor: 'text-yellow-500',
          message: 'Not bad! ⚡'
        };
      case 'poor':
        return {
          icon: XCircle,
          emoji: '😬',
          bgColor: 'from-red-400 to-red-600',
          cardBg: 'bg-red-50',
          borderColor: 'border-red-500',
          textColor: 'text-red-700',
          iconColor: 'text-red-500',
          message: 'Oops! 💭'
        };
    }
  };

  const config = getOutcomeConfig();
  const Icon = config.icon;

  return (
    <div className={`min-h-screen bg-gradient-to-br ${config.bgColor} flex flex-col items-center justify-center p-6 sm:p-8 md:p-12 lg:p-16 relative overflow-hidden`}>
      {/* Confetti/particles for good choice */}
      {choice.outcome === 'good' && (
        <>
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: -20, x: Math.random() * 400 - 200, opacity: 1 }}
              animate={{ y: 900, opacity: 0 }}
              transition={{ 
                duration: 2 + Math.random() * 2, 
                delay: Math.random() * 0.5,
                repeat: Infinity,
                repeatDelay: 3
              }}
              className="absolute text-xl sm:text-2xl md:text-3xl pointer-events-none"
              style={{ left: '50%' }}
            >
              {['🎉', '⭐', '💰', '🏆', '✨'][Math.floor(Math.random() * 5)]}
            </motion.div>
          ))}
        </>
      )}

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', duration: 0.6 }}
        className="text-center z-10 w-full max-w-3xl"
      >
        {/* Emoji reaction */}
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 0.5,
            repeat: 3,
            repeatDelay: 0.3
          }}
          className="text-6xl sm:text-7xl md:text-8xl mb-6 sm:mb-8"
        >
          {config.emoji}
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-white mb-6 sm:mb-8 text-2xl sm:text-3xl md:text-4xl"
        >
          {choice.feedback}
        </motion.h2>

        {/* Outcome Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className={`${config.cardBg} border-4 ${config.borderColor} rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl mb-6 sm:mb-8`}
        >
          <div className="flex items-start gap-3 sm:gap-4 mb-6">
            <Icon className={`w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 ${config.iconColor} flex-shrink-0`} />
            <div className="flex-1 text-left">
              <p className={`${config.textColor} mb-3 text-base sm:text-lg md:text-xl`}>
                {config.message}
              </p>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg">
                {choice.explanation}
              </p>
            </div>
          </div>

          {/* Rewards */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="bg-white rounded-2xl p-4 sm:p-5 md:p-6 text-center shadow-md">
              <p className="text-xl sm:text-2xl md:text-3xl mb-1 sm:mb-2">⭐</p>
              <p className={`${config.textColor} text-sm sm:text-base md:text-lg`}>+{choice.xp} XP</p>
            </div>
            <div className="bg-white rounded-2xl p-4 sm:p-5 md:p-6 text-center shadow-md">
              <p className="text-xl sm:text-2xl md:text-3xl mb-1 sm:mb-2">🪙</p>
              <p className={`${config.textColor} text-sm sm:text-base md:text-lg`}>+{choice.coins} Coins</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <Button
            onClick={onContinue}
            className="w-full bg-white text-gray-800 hover:bg-white/90 py-6 sm:py-7 md:py-8 rounded-2xl shadow-lg text-base sm:text-lg md:text-xl"
          >
            Continue 🎯
          </Button>
        </motion.div>

        {choice.outcome !== 'good' && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-white/90 text-sm sm:text-base mt-4"
          >
            💡 Every choice is a learning opportunity!
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}