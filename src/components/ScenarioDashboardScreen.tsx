import { motion } from 'motion/react';
import { ChevronLeft, TrendingUp, Target, Award, PlayCircle } from 'lucide-react';
import { Button } from './ui/button';
import type { UserData } from '../App';

interface ScenarioDashboardScreenProps {
  userData: UserData;
  scenariosCompleted: number;
  totalScenarios: number;
  onNextScenario: () => void;
  onBack: () => void;
  financialHealthScore: number;
}

export function ScenarioDashboardScreen({ 
  userData, 
  scenariosCompleted,
  totalScenarios,
  onNextScenario, 
  onBack,
  financialHealthScore
}: ScenarioDashboardScreenProps) {
  const completionPercentage = (scenariosCompleted / totalScenarios) * 100;
  const canContinue = scenariosCompleted < totalScenarios;

  return (
    <div className="h-full bg-gradient-to-br from-teal-50 to-blue-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#008080] to-[#66CCFF] rounded-b-[40px] p-6 shadow-lg">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={onBack} className="text-white">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h3 className="text-white">Scenario Progress</h3>
            <p className="text-white/80 text-sm">Your financial journey</p>
          </div>
        </div>

        {/* Progress */}
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white text-sm">Scenarios Completed</span>
            <span className="text-white/90 text-sm">{scenariosCompleted}/{totalScenarios}</span>
          </div>
          <div className="w-full bg-white/30 rounded-full h-3 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${completionPercentage}%` }}
              transition={{ duration: 1, delay: 0.3 }}
              className="bg-[#FFD700] h-full rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Financial Health Score */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-green-400 to-teal-500 rounded-3xl p-8 shadow-xl mb-6 text-white"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-white/80 mb-2">Financial Health Score</p>
              <motion.h2
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.3 }}
                className="text-white"
              >
                {financialHealthScore}/100
              </motion.h2>
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, ease: "linear" }}
            >
              <Target className="w-16 h-16 text-white" />
            </motion.div>
          </div>
          
          <div className="w-full bg-white/30 rounded-full h-4 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${financialHealthScore}%` }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="bg-white h-full rounded-full shadow-lg"
            />
          </div>

          <p className="text-white/90 text-sm mt-4 text-center">
            {financialHealthScore >= 80 && "🌟 Excellent! You're making great decisions!"}
            {financialHealthScore >= 60 && financialHealthScore < 80 && "👍 Good job! Keep learning and improving!"}
            {financialHealthScore >= 40 && financialHealthScore < 60 && "📈 You're on the right track! Keep going!"}
            {financialHealthScore < 40 && "💪 Every choice is a learning opportunity!"}
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl p-6 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-purple-100 rounded-xl p-3">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-gray-700">Total XP</span>
            </div>
            <p className="text-[#008080]">{userData.level * 10}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-3xl p-6 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-yellow-100 rounded-xl p-3">
                <span className="text-2xl">🪙</span>
              </div>
              <span className="text-gray-700">Coins</span>
            </div>
            <p className="text-[#FFD700]">{userData.coins}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-3xl p-6 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-blue-100 rounded-xl p-3">
                <Award className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-gray-700">Level</span>
            </div>
            <p className="text-[#008080]">{userData.level}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-3xl p-6 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-orange-100 rounded-xl p-3">
                <span className="text-2xl">🔥</span>
              </div>
              <span className="text-gray-700">Streak</span>
            </div>
            <p className="text-orange-500">{userData.streak} days</p>
          </motion.div>
        </div>

        {/* Achievement Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-3xl p-6 shadow-lg mb-6"
        >
          <h4 className="text-[#008080] mb-4">Your Achievement Summary</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Scenarios Completed</span>
              <span className="text-[#008080]">{scenariosCompleted}/{totalScenarios}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Modules Completed</span>
              <span className="text-[#008080]">{userData.completedModules.length}/5</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Learning Streak</span>
              <span className="text-orange-500">{userData.streak} days 🔥</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-600">Financial Health</span>
              <span className="text-green-600">{financialHealthScore}/100 💚</span>
            </div>
          </div>
        </motion.div>

        {/* Next Scenario Button */}
        {canContinue ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Button
              onClick={onNextScenario}
              className="w-full bg-gradient-to-r from-[#008080] to-[#66CCFF] text-white py-7 rounded-2xl shadow-lg hover:shadow-xl mb-3"
            >
              <PlayCircle className="w-6 h-6 mr-2" />
              Next Story Challenge
            </Button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-3xl p-6 text-center shadow-xl"
          >
            <p className="text-2xl mb-2">🎉</p>
            <h5 className="text-white mb-2">All Scenarios Complete!</h5>
            <p className="text-white/90 text-sm">
              You've completed all financial scenarios. Great job! Keep learning with our modules.
            </p>
          </motion.div>
        )}

        <p className="text-center text-gray-500 text-sm mt-4">
          Every decision shapes your financial future! 💡
        </p>
      </div>
    </div>
  );
}
