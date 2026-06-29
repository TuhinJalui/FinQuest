import { useState } from 'react';
import { ScenarioStoryScreen } from './ScenarioStoryScreen';
import { ScenarioChoiceScreen } from './ScenarioChoiceScreen';
import { ScenarioFeedbackScreen } from './ScenarioFeedbackScreen';
import { ScenarioRewardScreen } from './ScenarioRewardScreen';
import { ScenarioDashboardScreen } from './ScenarioDashboardScreen';
import { scenarios } from '../data/scenarios';
import type { Choice } from '../data/scenarios';
import type { Screen, UserData } from '../App';
import { calculateLevel } from '../utils/gameUtils';

interface ScenarioFlowScreenProps {
  onNavigate: (screen: Screen) => void;
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
}

type ScenarioStep = 'story' | 'choice' | 'feedback' | 'reward' | 'dashboard';

export function ScenarioFlowScreen({ onNavigate, userData, updateUserData }: ScenarioFlowScreenProps) {
  const [currentStep, setCurrentStep] = useState<ScenarioStep>('story');
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null);

  const currentScenario = scenarios[currentScenarioIndex];

  // Calculate financial health score based on choices made
  const calculateFinancialHealth = () => {
    const baseScore = 40;
    const moduleBonus = userData.completedModules.length * 10;
    const scenarioBonus = userData.scenariosCompleted * 5;
    return Math.min(100, baseScore + moduleBonus + scenarioBonus);
  };

  const handleStartScenario = () => {
    setCurrentStep('choice');
  };

  const handleChoice = (choice: Choice) => {
    setSelectedChoice(choice);
    setCurrentStep('feedback');
  };

  const handleFeedbackContinue = () => {
    if (selectedChoice) {
      // Update XP, coins, and level accurately
      const newXP = userData.xp + selectedChoice.xp;
      const newCoins = userData.coins + selectedChoice.coins;
      const newLevel = calculateLevel(newXP);

      updateUserData({ 
        xp: newXP,
        coins: newCoins,
        level: newLevel,
        scenariosCompleted: userData.scenariosCompleted + 1
      });

      setCurrentStep('reward');
    }
  };

  const handleRewardContinue = () => {
    setCurrentStep('dashboard');
  };

  const handleNextScenario = () => {
    if (currentScenarioIndex < scenarios.length - 1) {
      setCurrentScenarioIndex(prev => prev + 1);
      setSelectedChoice(null);
      setCurrentStep('story');
    }
  };

  const handleBackToDashboard = () => {
    setCurrentStep('dashboard');
  };

  const handleBackToHome = () => {
    onNavigate('home');
  };

  switch (currentStep) {
    case 'story':
      return (
        <ScenarioStoryScreen
          scenario={currentScenario}
          onStart={handleStartScenario}
          onBack={userData.scenariosCompleted > 0 ? handleBackToDashboard : handleBackToHome}
        />
      );

    case 'choice':
      return (
        <ScenarioChoiceScreen
          scenario={currentScenario}
          onChoice={handleChoice}
          onBack={() => setCurrentStep('story')}
        />
      );

    case 'feedback':
      if (!selectedChoice) return null;
      return (
        <ScenarioFeedbackScreen
          choice={selectedChoice}
          onContinue={handleFeedbackContinue}
        />
      );

    case 'reward':
      if (!selectedChoice) return null;
      return (
        <ScenarioRewardScreen
          choice={selectedChoice}
          totalXP={userData.xp}
          totalCoins={userData.coins}
          currentLevel={userData.level}
          onContinue={handleRewardContinue}
        />
      );

    case 'dashboard':
      return (
        <ScenarioDashboardScreen
          userData={userData}
          scenariosCompleted={userData.scenariosCompleted}
          totalScenarios={scenarios.length}
          onNextScenario={handleNextScenario}
          onBack={handleBackToHome}
          financialHealthScore={calculateFinancialHealth()}
        />
      );

    default:
      return null;
  }
}