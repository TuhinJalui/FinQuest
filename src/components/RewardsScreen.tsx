import { motion } from 'motion/react';
import { Trophy, Award, Medal, Crown, Sparkles } from 'lucide-react';
import { BottomNav } from './BottomNav';
import type { Screen, UserData } from '../App';

interface RewardsScreenProps {
  onNavigate: (screen: Screen) => void;
  userData: UserData;
}

export function RewardsScreen({ onNavigate, userData }: RewardsScreenProps) {
  const badges = [
    {
      id: 1,
      name: 'Budget Boss',
      description: 'Completed Budgeting Basics',
      icon: Award,
      color: 'from-purple-400 to-purple-600',
      earned: true
    },
    {
      id: 2,
      name: 'Quiz Master',
      description: 'Scored 100% on a quiz',
      icon: Trophy,
      color: 'from-yellow-400 to-orange-500',
      earned: true
    },
    {
      id: 3,
      name: 'Investment Guru',
      description: 'Completed Smart Investing',
      icon: TrendingUp,
      color: 'from-green-400 to-green-600',
      earned: false
    },
    {
      id: 4,
      name: 'Streak Champion',
      description: '7-day learning streak',
      icon: Medal,
      color: 'from-blue-400 to-blue-600',
      earned: true
    },
    {
      id: 5,
      name: 'Finance King',
      description: 'Completed all modules',
      icon: Crown,
      color: 'from-yellow-500 to-orange-600',
      earned: false
    }
  ];

  const leaderboard = [
    { rank: 1, name: 'Sarah K.', coins: 1250, avatar: '👑' },
    { rank: 2, name: 'Alex M.', coins: 980, avatar: '🏆' },
    { rank: 3, name: 'Vivan (You)', coins: userData.coins, avatar: '⭐' },
    { rank: 4, name: 'Emma R.', coins: 420, avatar: '💎' },
    { rank: 5, name: 'James L.', coins: 385, avatar: '🎯' }
  ];

  const TrendingUp = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
      <polyline points="17 6 23 6 23 12"></polyline>
    </svg>
  );

  return (
    <div className="h-full bg-gradient-to-br from-teal-50 to-blue-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#008080] to-[#66CCFF] rounded-b-[40px] p-8 pb-12 shadow-lg">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-white mb-6 text-center">Rewards & Achievements</h3>
          
          {/* Total Coins */}
          <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-6 text-center">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block mb-2"
            >
              <Sparkles className="w-12 h-12 text-[#FFD700] mx-auto" fill="#FFD700" />
            </motion.div>
            <p className="text-white/80 mb-2">Total Coins</p>
            <p className="text-white">{userData.coins} 🪙</p>
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 pb-24">
        {/* Badges */}
        <div className="mb-8">
          <h4 className="text-[#008080] mb-4">Your Badges</h4>
          <div className="grid grid-cols-2 gap-4">
            {badges.map((badge, index) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white rounded-2xl p-6 shadow-lg ${
                  !badge.earned && 'opacity-50 grayscale'
                }`}
              >
                <div className={`bg-gradient-to-br ${badge.color} rounded-xl p-4 mb-3 inline-flex`}>
                  <badge.icon className="w-8 h-8 text-white" />
                </div>
                <p className="text-gray-800 text-sm mb-1">{badge.name}</p>
                <p className="text-gray-500 text-xs">{badge.description}</p>
                {badge.earned && (
                  <div className="mt-2">
                    <span className="text-green-500 text-xs">✓ Earned</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Leaderboard */}
        <div>
          <h4 className="text-[#008080] mb-4">Leaderboard 🏆</h4>
          <div className="bg-white rounded-3xl p-6 shadow-xl">
            <div className="space-y-3">
              {leaderboard.map((user, index) => (
                <motion.div
                  key={user.rank}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center gap-4 p-4 rounded-2xl ${
                    user.name.includes('You')
                      ? 'bg-gradient-to-r from-[#FFD700]/20 to-[#FFA500]/20 border-2 border-[#FFD700]'
                      : 'bg-gray-50'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${
                    user.rank === 1
                      ? 'bg-yellow-500'
                      : user.rank === 2
                      ? 'bg-gray-400'
                      : user.rank === 3
                      ? 'bg-orange-600'
                      : 'bg-[#008080]'
                  }`}>
                    {user.rank}
                  </div>
                  <span className="text-2xl">{user.avatar}</span>
                  <div className="flex-1">
                    <p className="text-gray-800">{user.name}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Sparkles className="w-4 h-4 text-[#FFD700]" fill="#FFD700" />
                    <span className="text-[#008080]">{user.coins}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Confetti animation */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: -50, x: Math.random() * 300, opacity: 1 }}
            animate={{ 
              y: [null, Math.random() * 200 + 100],
              rotate: [0, Math.random() * 360],
              opacity: [1, 0]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              delay: Math.random() * 2 
            }}
            className="absolute text-xl pointer-events-none"
          >
            {['🎉', '⭐', '🏆'][Math.floor(Math.random() * 3)]}
          </motion.div>
        ))}
      </div>

      <BottomNav currentScreen="home" onNavigate={onNavigate} />
    </div>
  );
}
