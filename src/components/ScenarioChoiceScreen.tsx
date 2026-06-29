import { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft } from 'lucide-react';
import { Button } from './ui/button';
import type { Scenario, Choice } from '../data/scenarios';

interface ScenarioChoiceScreenProps {
  scenario: Scenario;
  onChoice: (choice: Choice) => void;
  onBack: () => void;
}

export function ScenarioChoiceScreen({ scenario, onChoice, onBack }: ScenarioChoiceScreenProps) {
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);

  const handleSelect = (index: number) => {
    setSelectedChoice(index);
  };

  const handleConfirm = () => {
    if (selectedChoice !== null) {
      onChoice(scenario.choices[selectedChoice]);
    }
  };

  const getChoiceColor = (index: number) => {
    const colors = [
      'from-blue-400 to-blue-600',
      'from-purple-400 to-purple-600',
      'from-green-400 to-green-600'
    ];
    return colors[index] || 'from-gray-400 to-gray-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#008080] to-[#66CCFF] rounded-b-[24px] md:rounded-b-[40px] p-4 sm:p-6 md:p-8 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 sm:gap-4 mb-4">
            <button onClick={onBack} className="text-white">
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <div className="flex-1">
              <h3 className="text-white text-xl sm:text-2xl md:text-3xl">Make Your Choice</h3>
              <p className="text-white/80 text-sm sm:text-base">{scenario.title}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Story Reminder */}
      <div className="p-4 sm:p-6 md:p-8 pb-0">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-4 sm:p-5 md:p-6 shadow-lg mb-4 sm:mb-6"
          >
            <div className="flex items-start gap-3">
              <div className={`bg-gradient-to-br ${scenario.characterBg} w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center flex-shrink-0 shadow-md`}>
                <span className="text-xl sm:text-2xl md:text-3xl">{scenario.character}</span>
              </div>
              <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed flex-1">
                {scenario.story}
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Choices */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 md:px-8 pb-6">
        <div className="max-w-5xl mx-auto">
          <h4 className="text-[#008080] mb-4 sm:mb-6 text-lg sm:text-xl md:text-2xl">What will you do?</h4>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {scenario.choices.map((choice, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.15 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelect(index)}
                className={`w-full text-left rounded-3xl p-5 sm:p-6 md:p-7 shadow-lg transition-all ${
                  selectedChoice === index
                    ? 'ring-4 ring-[#FFD700] shadow-2xl'
                    : 'hover:shadow-xl'
                }`}
                style={{
                  background: selectedChoice === index 
                    ? 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)'
                    : 'white'
                }}
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className={`bg-gradient-to-br ${getChoiceColor(index)} w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md`}>
                    <span className="text-2xl sm:text-3xl md:text-4xl">{choice.icon}</span>
                  </div>
                  <div className="flex-1">
                    <p className={`leading-relaxed text-sm sm:text-base md:text-lg ${
                      selectedChoice === index ? 'text-white' : 'text-gray-800'
                    }`}>
                      {choice.text}
                    </p>
                    {selectedChoice === index && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-3 flex items-center gap-2"
                      >
                        <div className="bg-white/30 backdrop-blur-sm rounded-full px-3 py-1 text-sm text-white">
                          Selected ✓
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Confirm Button */}
      <div className="p-4 sm:p-6 md:p-8 pt-0">
        <div className="max-w-5xl mx-auto">
          <Button
            onClick={handleConfirm}
            disabled={selectedChoice === null}
            className="w-full bg-[#008080] hover:bg-[#008080]/90 text-white py-5 sm:py-6 md:py-7 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed shadow-lg text-base sm:text-lg"
          >
            {selectedChoice !== null ? 'Confirm Choice 🎯' : 'Select an option'}
          </Button>
        </div>
      </div>
    </div>
  );
}