import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, User, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import type { Screen, UserData } from '../App';

interface LoginScreenProps {
  onNavigate: (screen: Screen) => void;
  updateUserData: (data: Partial<UserData>) => void;
}

export function LoginScreen({ onNavigate, updateUserData }: LoginScreenProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleContinue = () => {
    if (name && email) {
      updateUserData({ name, email });
      onNavigate('avatar');
    }
  };

  return (
    <div className="h-full bg-gradient-to-br from-teal-50 to-blue-50 flex flex-col lg:flex-row">
      {/* Left side - Hero Section (hidden on mobile, visible on desktop) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#008080] to-[#66CCFF] p-12 items-center justify-center relative overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-[#FFD700]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-32 right-20 w-40 h-40 bg-white/20 rounded-full blur-3xl" />
        
        <div className="z-10 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring' }}
            className="bg-white w-32 h-32 rounded-[40px] flex items-center justify-center mx-auto mb-8 shadow-2xl"
          >
            <TrendingUp className="w-16 h-16 text-[#008080]" />
          </motion.div>
          
          <h1 className="text-white mb-6 text-5xl">Welcome to FinQuest</h1>
          <p className="text-white/90 text-xl max-w-md mx-auto">
            Learn personal finance through interactive lessons, quizzes, and real-world scenarios
          </p>

          <div className="grid grid-cols-3 gap-6 mt-12 max-w-lg mx-auto">
            {[
              { icon: '📚', text: 'Learn' },
              { icon: '🎮', text: 'Play' },
              { icon: '🏆', text: 'Achieve' }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.2 }}
                className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center"
              >
                <div className="text-4xl mb-2">{item.icon}</div>
                <p className="text-white text-sm">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Right side - Form Section */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-8 lg:p-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="bg-gradient-to-br from-[#008080] to-[#66CCFF] w-20 h-20 sm:w-24 sm:h-24 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-xl">
              <TrendingUp className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
            </div>
            <h2 className="text-[#008080] mb-2">Welcome to FinQuest</h2>
            <p className="text-gray-600">Start your financial learning journey</p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl">
              <h3 className="text-[#008080] mb-6 text-center lg:text-left">Create Your Account</h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-gray-700 mb-2 block">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border-2 border-gray-200 focus:border-[#008080] transition-colors h-12 sm:h-14 text-base"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-gray-700 mb-2 block">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border-2 border-gray-200 focus:border-[#008080] transition-colors h-12 sm:h-14 text-base"
                  />
                </div>
              </div>

              <Button
                onClick={handleContinue}
                disabled={!name || !email}
                className="w-full bg-gradient-to-r from-[#008080] to-[#66CCFF] text-white rounded-xl mt-6 h-12 sm:h-14 text-base sm:text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-shadow"
              >
                Continue 🚀
              </Button>
            </div>

            <p className="text-center text-gray-500 text-sm">
              By continuing, you agree to our Terms & Privacy Policy
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}