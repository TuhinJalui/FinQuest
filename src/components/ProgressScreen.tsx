import { motion } from 'motion/react';
import { CheckCircle, Lock, Flame, Award, Coins } from 'lucide-react';
import { BottomNav } from './BottomNav';
import { modules } from '../data/modules';
import type { Screen, UserData } from '../App';
import { getCurrentLevelProgress } from '../utils/gameUtils';

interface ProgressScreenProps {
  onNavigate: (screen: Screen) => void;
  userData: UserData;
}

export function ProgressScreen({ onNavigate, userData }: ProgressScreenProps) {
  const totalLessons = modules.reduce((sum, module) => sum + module.lessons.length, 0);
  const completedLessons = modules
    .filter(m => userData.completedModules.includes(m.id))
    .reduce((sum, module) => sum + module.lessons.length, 0);
  
  const overallProgress = Math.round((completedLessons / totalLessons) * 100);
  const levelProgress = getCurrentLevelProgress(userData.xp, userData.level);

  return (
    <div className="h-full bg-gradient-to-br from-teal-50 to-blue-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#008080] to-[#66CCFF] rounded-b-[40px] p-8 pb-12 shadow-lg">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-white mb-6 text-center">Your Progress</h3>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
              <Award className="w-6 h-6 text-[#FFD700] mx-auto mb-2" />
              <p className="text-white">Level {userData.level}</p>
              <p className="text-white/70 text-xs mt-1">{userData.xp} XP</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
              <Coins className="w-6 h-6 text-[#FFD700] mx-auto mb-2" />
              <p className="text-white">{userData.coins}</p>
              <p className="text-white/70 text-xs mt-1">Coins</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
              <Flame className="w-6 h-6 text-orange-400 mx-auto mb-2" />
              <p className="text-white">{userData.streak}</p>
              <p className="text-white/70 text-xs mt-1">Day Streak</p>
            </div>
          </div>

          {/* Circular Progress */}
          <div className="flex justify-center mb-6">
            <div className="relative w-40 h-40">
              <svg className="w-40 h-40 transform -rotate-90">
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="12"
                  fill="none"
                />
                <motion.circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="#FFD700"
                  strokeWidth="12"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ strokeDashoffset: 440 }}
                  animate={{ 
                    strokeDashoffset: 440 - (440 * overallProgress) / 100,
                    strokeDasharray: 440
                  }}
                  transition={{ duration: 1, delay: 0.3 }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <p className="text-white">{overallProgress}%</p>
                <p className="text-white/80 text-sm">Complete</p>
              </div>
            </div>
          </div>

          {/* Level Info */}
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
            <p className="text-white mb-1">Level {userData.level}</p>
            <p className="text-white/80 text-sm">Financial Explorer 🚀</p>
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 pb-24">
        {/* Streak */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-orange-400 to-red-500 rounded-3xl p-6 shadow-xl mb-6 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 mb-1">Learning Streak</p>
              <p className="text-white">{userData.streak} days in a row! 🔥</p>
            </div>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Flame className="w-12 h-12 text-white" fill="white" />
            </motion.div>
          </div>
        </motion.div>

        {/* Modules Progress */}
        <div>
          <h4 className="text-[#008080] mb-4">Learning Modules</h4>
          <div className="space-y-3">
            {modules.map((module, index) => {
              const completed = userData.completedModules.includes(module.id);
              const isLocked = index > 0 && !userData.completedModules.includes(modules[index - 1].id);
              const moduleProgress = completed ? 100 : 0;

              return (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-5 shadow-lg"
                >
                  <div className="flex items-start gap-4">
                    {completed ? (
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-7 h-7 text-white" />
                      </div>
                    ) : isLocked ? (
                      <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                        <Lock className="w-6 h-6 text-gray-500" />
                      </div>
                    ) : (
                      <div className={`w-12 h-12 bg-gradient-to-br ${module.color} rounded-full flex items-center justify-center flex-shrink-0 text-xl`}>
                        {module.icon}
                      </div>
                    )}
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="text-gray-800 mb-1">{module.title}</p>
                          <p className="text-gray-500 text-xs">{module.skillLevel}</p>
                        </div>
                        {completed && (
                          <span className="text-green-500 text-sm whitespace-nowrap">✓ Completed</span>
                        )}
                        {isLocked && (
                          <span className="text-gray-400 text-sm whitespace-nowrap">🔒 Locked</span>
                        )}
                      </div>
                      <p className="text-gray-500 text-sm mb-2">
                        {module.lessons.length} lessons · {module.questions.length} questions
                      </p>
                      
                      {/* Progress Bar */}
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${moduleProgress}%` }}
                          transition={{ duration: 0.8, delay: index * 0.1 }}
                          className={`h-full rounded-full ${
                            completed 
                              ? 'bg-green-500' 
                              : isLocked 
                              ? 'bg-gray-300'
                              : 'bg-[#008080]'
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-3 gap-3">
          <div className="bg-white rounded-2xl p-4 shadow-lg text-center">
            <p className="text-[#008080] mb-1">{completedLessons}</p>
            <p className="text-gray-600 text-xs">Lessons Done</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-lg text-center">
            <p className="text-[#008080] mb-1">{userData.coins}</p>
            <p className="text-gray-600 text-xs">Coins Earned</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-lg text-center">
            <p className="text-[#008080] mb-1">{userData.streak}</p>
            <p className="text-gray-600 text-xs">Day Streak</p>
          </div>
        </div>

        {/* Achievement Summary */}
        <div className="mt-6 bg-gradient-to-br from-[#008080] to-[#66CCFF] rounded-3xl p-6 text-white shadow-xl">
          <h5 className="mb-4">Learning Summary</h5>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-white/80">Modules Completed</span>
              <span className="text-white">{userData.completedModules.length}/{modules.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/80">Total Questions Answered</span>
              <span className="text-white">
                {userData.completedModules.reduce((sum, modId) => {
                  const mod = modules.find(m => m.id === modId);
                  return sum + (mod?.questions.length || 0);
                }, 0)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/80">Current Level</span>
              <span className="text-white">Level {userData.level}</span>
            </div>
          </div>
        </div>
      </div>

      <BottomNav currentScreen="progress" onNavigate={onNavigate} />
    </div>
  );
}