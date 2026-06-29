import { motion } from 'motion/react';
import { Coins, PiggyBank, TrendingUp, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import type { Screen } from '../App';
import { useState, useEffect } from 'react';

interface SplashScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function SplashScreen({ onNavigate }: SplashScreenProps) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(() => onNavigate('login'), 500);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onNavigate]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: show ? 1 : 0 }}
      className="h-full bg-gradient-to-br from-[#008080] to-[#66CCFF] flex flex-col items-center justify-center p-4 sm:p-8 relative overflow-hidden"
    >
      {/* Decorative floating elements */}
      <div className="absolute top-10 sm:top-20 left-10 sm:left-20 w-20 sm:w-32 h-20 sm:h-32 bg-[#FFD700]/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 sm:bottom-32 right-10 sm:right-20 w-24 sm:w-40 h-24 sm:h-40 bg-white/20 rounded-full blur-3xl" />
      
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        className="text-center z-10"
      >
        {/* Logo/Icon */}
        <div className="bg-white w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-[32px] sm:rounded-[40px] flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-2xl">
          <Coins className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-[#FFD700]" />
        </div>

        {/* App Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-white mb-3 sm:mb-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
        >
          FinQuest
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-white/90 text-base sm:text-lg md:text-xl px-4"
        >
          Master Your Money, Level Up Your Life 🚀
        </motion.p>
      </motion.div>

      {/* Loading animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-12 sm:bottom-20 md:bottom-24"
      >
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full"
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}