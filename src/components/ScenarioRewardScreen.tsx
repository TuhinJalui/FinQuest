import { motion } from 'motion/react';
import { Trophy, TrendingUp, Award } from 'lucide-react';
import { Button } from './ui/button';
import type { Choice } from '../data/scenarios';
import { getCurrentLevelProgress } from '../utils/gameUtils';

interface ScenarioRewardScreenProps {
  choice: Choice;
  totalXP: number;
  totalCoins: number;
  currentLevel: number;
  onContinue: () => void;
}

export function ScenarioRewardScreen({ 
  choice, 
  totalXP, 
  totalCoins, 
  currentLevel,
  onContinue 
}: ScenarioRewardScreenProps) {
  const levelProgress = getCurrentLevelProgress(totalXP, currentLevel);
  const xpProgress = levelProgress.progress;
  const leveledUp = levelProgress.leveledUp;

  return (
    <div className="h-full bg-gradient-to-br from-[#008080] to-[#66CCFF] flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-[#FFD700]/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-40 h-40 bg-white/20 rounded-full blur-3xl" />

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', duration: 0.6 }}
        className="text-center z-10 w-full max-w-sm"
      >
        {/* Trophy Icon */}
        <motion.div
          animate={{ 
            rotate: [0, -10, 10, -10, 10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 0.8,
            times: [0, 0.2, 0.4, 0.6, 0.8, 1]
          }}
          className="inline-block mb-6"
        >
          <Trophy className="w-24 h-24 text-[#FFD700]" fill="#FFD700" />
        </motion.div>

        {leveledUp ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-white mb-2">Level Up! 🎉</h2>
            <p className="text-white/90 mb-8">
              You reached Level {currentLevel}!
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-white mb-2">Rewards Earned!</h2>
            <p className="text-white/90 mb-8">
              Great job on this scenario! 🌟
            </p>
          </motion.div>
        )}

        {/* Rewards Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-3xl p-8 shadow-2xl mb-6"
        >
          {/* XP and Coins earned */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.7, type: 'spring' }}
              className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl p-5"
            >
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
              <p className="text-purple-600 mb-1">+{choice.xp} XP</p>
              <p className="text-gray-600 text-xs">Experience</p>
            </motion.div>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, type: 'spring' }}
              className="bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-2xl p-5"
            >
              <div className="flex items-center justify-center mb-2">
                <span className="text-4xl">🪙</span>
              </div>
              <p className="text-yellow-700 mb-1">+{choice.coins}</p>
              <p className="text-gray-600 text-xs">Coins</p>
            </motion.div>
          </div>

          {/* Level Progress */}
          <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl p-5 mb-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-[#008080]" />
                <span className="text-gray-700">Level {currentLevel}</span>
              </div>
              <span className="text-gray-600 text-sm">{totalXP} XP</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${xpProgress}%` }}
                transition={{ duration: 1, delay: 1 }}
                className="bg-gradient-to-r from-[#008080] to-[#66CCFF] h-full rounded-full"
              />
            </div>
            <p className="text-gray-500 text-xs mt-2 text-center">
              {leveledUp ? 'Level Up! 🎊' : `${Math.ceil(levelProgress.xpForNextLevel - (totalXP % levelProgress.xpForNextLevel))} XP to next level`}
            </p>
          </div>

          {/* Total Stats */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="text-center">
              <p className="text-gray-500 mb-1">Total XP</p>
              <p className="text-[#008080]">{totalXP}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-500 mb-1">Total Coins</p>
              <p className="text-[#FFD700]">{totalCoins}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <Button
            onClick={onContinue}
            className="w-full bg-[#FFD700] text-gray-800 hover:bg-[#FFD700]/90 py-6 rounded-2xl shadow-lg"
          >
            View Progress 📊
          </Button>
        </motion.div>
      </motion.div>

      {/* Floating particles */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: 800 }}
          animate={{ 
            y: -100,
            x: Math.sin(i) * 100,
            opacity: [0, 1, 0]
          }}
          transition={{ 
            duration: 3 + Math.random() * 2,
            delay: Math.random() * 2,
            repeat: Infinity,
            repeatDelay: 1
          }}
          className="absolute text-2xl pointer-events-none"
        >
          {['⭐', '✨', '💫', '🌟'][i % 4]}
        </motion.div>
      ))}
    </div>
  );
}