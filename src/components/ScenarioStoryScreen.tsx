import { motion } from 'motion/react';
import { ChevronLeft } from 'lucide-react';
import { Button } from './ui/button';
import type { Scenario } from '../data/scenarios';

interface ScenarioStoryScreenProps {
  scenario: Scenario;
  onStart: () => void;
  onBack: () => void;
}

export function ScenarioStoryScreen({ scenario, onStart, onBack }: ScenarioStoryScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex flex-col relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-20 right-10 sm:right-20 w-24 h-24 sm:w-32 sm:h-32 bg-[#FFD700]/20 rounded-full blur-3xl" />
      <div className="absolute bottom-40 left-10 sm:left-20 w-32 h-32 sm:w-40 sm:h-40 bg-[#66CCFF]/20 rounded-full blur-3xl" />

      {/* Header */}
      <div className="bg-gradient-to-r from-[#008080] to-[#66CCFF] rounded-b-[24px] md:rounded-b-[40px] p-4 sm:p-6 md:p-8 shadow-lg relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 sm:gap-4">
            <button onClick={onBack} className="text-white">
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <div className="flex-1">
              <h3 className="text-white text-xl sm:text-2xl md:text-3xl">Financial Story</h3>
              <p className="text-white/80 text-sm sm:text-base">Real-life scenario</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-8 md:p-12 lg:p-16 relative z-10">
        <div className="w-full max-w-3xl">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.6 }}
            className="text-center mb-8 sm:mb-12"
          >
            {/* Character Illustration */}
            <div className={`bg-gradient-to-br ${scenario.characterBg} w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-2xl`}>
              <span className="text-5xl sm:text-6xl md:text-7xl">{scenario.character}</span>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-[#008080] mb-4 text-2xl sm:text-3xl md:text-4xl">{scenario.title}</h2>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="w-full"
          >
            <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl mb-8">
              <p className="text-gray-700 text-center leading-relaxed text-base sm:text-lg md:text-xl">
                {scenario.story}
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <Button
                onClick={onStart}
                className="w-full bg-gradient-to-r from-[#008080] to-[#66CCFF] text-white py-6 sm:py-7 md:py-8 rounded-2xl text-base sm:text-lg md:text-xl shadow-lg hover:shadow-xl"
              >
                Start Scenario 🚀
              </Button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="text-center text-gray-500 text-sm sm:text-base mt-4"
            >
              Make wise choices to earn XP and coins! 💰
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Floating emojis */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute top-32 left-8 sm:left-16 text-3xl sm:text-4xl"
      >
        💡
      </motion.div>
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
        className="absolute top-48 right-12 sm:right-24 text-2xl sm:text-3xl"
      >
        📚
      </motion.div>
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, delay: 1 }}
        className="absolute bottom-32 left-16 sm:left-32 text-2xl sm:text-3xl"
      >
        🎯
      </motion.div>
    </div>
  );
}