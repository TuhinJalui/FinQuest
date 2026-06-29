import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { modules } from '../data/modules';
import type { Screen, UserData } from '../App';

interface LearningModuleScreenProps {
  onNavigate: (screen: Screen) => void;
  updateUserData: (data: Partial<UserData>) => void;
  userData: UserData;
}

export function LearningModuleScreen({ onNavigate, updateUserData, userData }: LearningModuleScreenProps) {
  const [currentCard, setCurrentCard] = useState(0);
  
  // Get the selected module or default to first module
  const moduleId = userData.selectedModule || 'module1';
  const module = modules.find(m => m.id === moduleId) || modules[0];
  const lessons = module.lessons;

  const handleNext = () => {
    if (currentCard < lessons.length - 1) {
      setCurrentCard(currentCard + 1);
    } else {
      // Mark module as completed and award coins
      if (!userData.completedModules.includes(moduleId)) {
        updateUserData({ 
          coins: userData.coins + 100,
          completedModules: [...userData.completedModules, moduleId]
        });
      }
      // Navigate to quiz for this module
      onNavigate('quiz');
    }
  };

  const handlePrevious = () => {
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1);
    }
  };

  const lesson = lessons[currentCard];

  return (
    <div className="h-full bg-gradient-to-br from-teal-50 to-blue-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#008080] to-[#66CCFF] rounded-b-[40px] p-6 shadow-lg">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => onNavigate('home')}
            className="text-white"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h3 className="text-white text-sm">{module.title}</h3>
            <p className="text-white/70 text-xs">{module.skillLevel}</p>
          </div>
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center gap-2">
          {lessons.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === currentCard
                  ? 'w-8 bg-[#FFD700]'
                  : 'w-2 bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden p-6 flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCard}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <div className="bg-white rounded-3xl p-8 shadow-2xl">
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-6 mb-6 flex justify-center">
                <span className="text-6xl">{lesson.icon}</span>
              </div>

              <h3 className="text-[#008080] mb-4 text-center">{lesson.title}</h3>

              <p className="text-gray-700 mb-6 leading-relaxed">
                {lesson.content}
              </p>

              <div className="bg-yellow-50 border-l-4 border-[#FFD700] rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">💡</span>
                  <div>
                    <p className="text-sm text-[#008080]">Pro Tip</p>
                    <p className="text-gray-700 text-sm">{lesson.tip}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="p-6 flex gap-4">
        <Button
          onClick={handlePrevious}
          disabled={currentCard === 0}
          variant="outline"
          className="flex-1 py-6 rounded-xl disabled:opacity-50"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Previous
        </Button>
        <Button
          onClick={handleNext}
          className="flex-1 bg-[#008080] hover:bg-[#008080]/90 text-white py-6 rounded-xl"
        >
          {currentCard === lessons.length - 1 ? 'Start Quiz' : 'Next'}
          {currentCard < lessons.length - 1 && <ChevronRight className="w-5 h-5 ml-2" />}
        </Button>
      </div>
    </div>
  );
}
