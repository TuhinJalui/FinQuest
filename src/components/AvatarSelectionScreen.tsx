import { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import type { Screen, UserData, Avatar } from '../App';

interface AvatarSelectionScreenProps {
  onNavigate: (screen: Screen) => void;
  updateUserData: (data: Partial<UserData>) => void;
}

export function AvatarSelectionScreen({ onNavigate, updateUserData }: AvatarSelectionScreenProps) {
  const [selectedAvatar, setSelectedAvatar] = useState<Avatar | null>(null);

  const handleContinue = () => {
    if (selectedAvatar) {
      updateUserData({ avatar: selectedAvatar });
      onNavigate('home');
    }
  };

  return (
    <div className="h-full bg-gradient-to-br from-teal-50 to-blue-50 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12">
      <div className="w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-10 md:mb-12"
        >
          <div className="bg-gradient-to-br from-[#008080] to-[#66CCFF] w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-3xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-xl">
            <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" />
          </div>
          <h2 className="text-[#008080] mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-4xl">Choose Your Avatar</h2>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg">Select your financial personality</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mb-6 sm:mb-8 md:mb-10">
          {avatars.map((avatar, index) => (
            <motion.button
              key={avatar.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedAvatar(avatar.id)}
              className={`bg-white rounded-3xl p-6 sm:p-7 md:p-8 shadow-lg transition-all ${
                selectedAvatar === avatar.id
                  ? 'ring-4 ring-[#FFD700] shadow-2xl'
                  : 'hover:shadow-xl'
              }`}
            >
              <div className="text-5xl sm:text-6xl md:text-7xl mb-4 sm:mb-5 md:mb-6">{avatar.emoji}</div>
              <h3 className="text-[#008080] mb-2 sm:mb-3 text-lg sm:text-xl md:text-2xl">{avatar.name}</h3>
              <p className="text-gray-600 text-xs sm:text-sm md:text-base">{avatar.description}</p>
              {selectedAvatar === avatar.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="mt-3 sm:mt-4 bg-[#FFD700] rounded-full px-4 py-2 text-sm sm:text-base"
                >
                  Selected ✓
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="max-w-md mx-auto"
        >
          <Button
            onClick={handleContinue}
            disabled={!selectedAvatar}
            className="w-full bg-gradient-to-r from-[#008080] to-[#66CCFF] text-white rounded-2xl py-6 sm:py-7 md:py-8 text-base sm:text-lg md:text-xl disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-shadow"
          >
            Start Your Journey 🚀
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

const avatars = [
  {
    id: 'student' as Avatar,
    name: 'Student',
    icon: Sparkles,
    emoji: '💡',
    color: 'from-yellow-400 to-orange-400',
    description: 'Just starting to learn'
  },
  {
    id: 'saver' as Avatar,
    name: 'Saver',
    icon: Sparkles,
    emoji: '🏦',
    color: 'from-green-400 to-teal-400',
    description: 'Building savings habits'
  },
  {
    id: 'investor' as Avatar,
    name: 'Investor',
    icon: Sparkles,
    emoji: '📈',
    color: 'from-blue-400 to-purple-400',
    description: 'Growing wealth wisely'
  }
];