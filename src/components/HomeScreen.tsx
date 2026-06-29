import { motion } from 'motion/react';
import { Award, Coins, Flame, Home, TrendingUp, BarChart3, User, Trophy } from 'lucide-react';
import type { Screen, UserData } from '../App';
import { modules } from '../data/modules';
import { calculateLevel, getCurrentLevelProgress, updateStreak, getTodayString } from '../utils/gameUtils';
import { useEffect } from 'react';

interface HomeScreenProps {
  onNavigate: (screen: Screen) => void;
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
}

export function HomeScreen({ onNavigate, userData, updateUserData }: HomeScreenProps) {
  const completedCount = userData.completedModules.length;
  
  // Update streak when user visits home
  useEffect(() => {
    const today = getTodayString();
    if (userData.lastActiveDate !== today) {
      const streakChange = updateStreak(userData.lastActiveDate);
      let newStreak = userData.streak;
      
      if (streakChange === 1) {
        newStreak = userData.streak + 1;
      } else if (streakChange === -1) {
        newStreak = 1;
      } else if (streakChange === 0) {
        newStreak = userData.streak || 1;
      }
      
      // Calculate accurate level from XP
      const newLevel = calculateLevel(userData.xp);
      
      updateUserData({ 
        lastActiveDate: today,
        streak: newStreak,
        level: newLevel
      });
    }
  }, []);

  const handleModuleClick = (moduleId: string) => {
    updateUserData({ selectedModule: moduleId });
    onNavigate('learning');
  };

  // Get level progress
  const levelProgress = getCurrentLevelProgress(userData.xp, userData.level);

  return (
    <div className="h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#008080] to-[#66CCFF] rounded-b-[24px] md:rounded-b-[40px] p-4 sm:p-6 md:p-8 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <div>
              <h3 className="text-white text-xl sm:text-2xl md:text-3xl">Hi, {userData.name}! 👋</h3>
              <p className="text-white/80 text-sm sm:text-base">Ready to level up today?</p>
            </div>
            <button 
              onClick={() => onNavigate('profile')}
              className="bg-white/20 backdrop-blur-sm rounded-full p-2 sm:p-3"
            >
              <User className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl md:rounded-3xl p-3 sm:p-4 md:p-5 text-center">
              <Award className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-[#FFD700] mx-auto mb-1 sm:mb-2" />
              <p className="text-white text-xs sm:text-sm md:text-base">Level {userData.level}</p>
              <div className="mt-2 bg-white/30 rounded-full h-1.5 overflow-hidden">
                <div 
                  className="bg-[#FFD700] h-full transition-all duration-500"
                  style={{ width: `${levelProgress.progress}%` }}
                />
              </div>
              <p className="text-white/70 text-[10px] sm:text-xs mt-1">
                {levelProgress.currentLevelXP}/{levelProgress.xpForNextLevel} XP
              </p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl md:rounded-3xl p-3 sm:p-4 md:p-5 text-center">
              <Coins className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-[#FFD700] mx-auto mb-1 sm:mb-2" />
              <p className="text-white text-xs sm:text-sm md:text-base">{userData.coins} Coins</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl md:rounded-3xl p-3 sm:p-4 md:p-5 text-center">
              <Flame className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-orange-400 mx-auto mb-1 sm:mb-2" />
              <p className="text-white text-xs sm:text-sm md:text-base">{userData.streak} Day Streak</p>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Modules */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 pb-24 md:pb-28">
        <div className="max-w-7xl mx-auto">
          {/* Virtual Trading Feature Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <button
              onClick={() => onNavigate('coinSimulator')}
              className="w-full bg-gradient-to-r from-[#2E7D32] to-[#4CAF50] rounded-2xl md:rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all text-left relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12" />
              
              <div className="relative flex items-center gap-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-4xl flex-shrink-0">
                  🪙
                </div>
                <div className="flex-1">
                  <h4 className="text-white text-lg sm:text-xl mb-1">Virtual Coin Trading 🔥</h4>
                  <p className="text-white/80 text-sm sm:text-base mb-2">
                    Start with ₹10,000 • Trade Stocks, Crypto & Gold
                  </p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs">
                      Live Prices
                    </span>
                    <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs">
                      Earn Badges
                    </span>
                    <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs">
                      AI Tips
                    </span>
                  </div>
                </div>
                <div className="hidden sm:flex items-center justify-center w-12 h-12 bg-white/20 rounded-full group-hover:scale-110 transition-transform">
                  <span className="text-white text-xl">→</span>
                </div>
              </div>
            </button>
          </motion.div>

          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h4 className="text-[#008080] text-lg sm:text-xl md:text-2xl">Learning Modules</h4>
            <span className="text-gray-500 text-sm sm:text-base">{completedCount} completed</span>
          </div>
          
          {/* Responsive grid: 1 col mobile, 2 cols tablet, 3 cols desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {modules.map((module, index) => {
              const isCompleted = userData.completedModules.includes(module.id);
              const isLocked = index > 0 && !userData.completedModules.includes(modules[index - 1].id);
              
              return (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <button
                    onClick={() => !isLocked && handleModuleClick(module.id)}
                    disabled={isLocked}
                    className={`w-full bg-white rounded-2xl md:rounded-3xl p-5 sm:p-6 shadow-lg hover:shadow-xl transition-all text-left relative ${
                      isLocked ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02]'
                    }`}
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className={`bg-gradient-to-br ${module.color} rounded-xl sm:rounded-2xl p-3 sm:p-4 text-2xl sm:text-3xl flex-shrink-0 shadow-md`}>
                        {module.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <h5 className="text-gray-800 pr-2 flex-1 text-sm sm:text-base md:text-lg">{module.title}</h5>
                          {isCompleted && (
                            <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-full flex items-center justify-center shadow-md">
                              <span className="text-white text-sm sm:text-base">✓</span>
                            </div>
                          )}
                          {isLocked && (
                            <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-gray-400 rounded-full flex items-center justify-center shadow-md">
                              <span className="text-white text-xs sm:text-sm">🔒</span>
                            </div>
                          )}
                        </div>
                        <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2">{module.description}</p>
                        <div className="flex items-center gap-2 sm:gap-3 text-xs flex-wrap">
                          <span className="bg-gradient-to-r from-blue-50 to-purple-50 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-blue-200">
                            {module.skillLevel}
                          </span>
                          <span className="flex items-center gap-1 text-gray-500">
                            <span className="text-blue-500">📚</span>
                            {module.lessons.length} Lessons
                          </span>
                          <span className="flex items-center gap-1 text-gray-500">
                            <span className="text-orange-500">❓</span>
                            {module.questions.length} Qs
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Navigation - Sticky at bottom */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 sm:px-6 py-3 sm:py-4 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-around">
            <button className="flex flex-col items-center gap-1 text-[#008080]">
              <Home className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="text-xs">Home</span>
            </button>
            <button 
              onClick={() => onNavigate('simulation')}
              className="flex flex-col items-center gap-1 text-gray-400 hover:text-[#008080] transition-colors"
            >
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="text-xs">Simulator</span>
            </button>
            <button 
              onClick={() => onNavigate('progress')}
              className="flex flex-col items-center gap-1 text-gray-400 hover:text-[#008080] transition-colors"
            >
              <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="text-xs">Progress</span>
            </button>
            <button 
              onClick={() => onNavigate('profile')}
              className="flex flex-col items-center gap-1 text-gray-400 hover:text-[#008080] transition-colors"
            >
              <User className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="text-xs">Profile</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}