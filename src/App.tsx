import { useState } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { LoginScreen } from './components/LoginScreen';
import { AvatarSelectionScreen } from './components/AvatarSelectionScreen';
import { HomeScreen } from './components/HomeScreen';
import { LearningModuleScreen } from './components/LearningModuleScreen';
import { QuizScreen } from './components/QuizScreen';
import { SimulationScreen } from './components/SimulationScreen';
import { ProgressScreen } from './components/ProgressScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { FeedbackScreen } from './components/FeedbackScreen';
import { ScenarioFlowScreen } from './components/ScenarioFlowScreen';
import { CoinInvestmentSimulator } from './components/CoinInvestmentSimulator';

export type Screen = 
  | 'splash' 
  | 'login' 
  | 'avatar' 
  | 'home' 
  | 'learning' 
  | 'quiz' 
  | 'simulation' 
  | 'progress' 
  | 'profile' 
  | 'feedback' 
  | 'scenario'
  | 'coinSimulator';

export type Avatar = 'student' | 'saver' | 'investor';

export interface UserData {
  name: string;
  email: string;
  avatar: Avatar | null;
  level: number;
  xp: number;
  coins: number;
  streak: number;
  lastActiveDate?: string;
  completedModules: string[];
  selectedModule?: string;
  quizzesTaken: number;
  scenariosCompleted: number;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [userData, setUserData] = useState<UserData>({
    name: 'Vivan',
    email: '',
    avatar: null,
    level: 1,
    xp: 0,
    coins: 0,
    streak: 0,
    lastActiveDate: undefined,
    completedModules: [],
    selectedModule: undefined,
    quizzesTaken: 0,
    scenariosCompleted: 0
  });

  const navigateToScreen = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const updateUserData = (data: Partial<UserData>) => {
    setUserData(prev => ({ ...prev, ...data }));
  };

  // Show full screen for certain screens
  const isFullScreen = currentScreen === 'splash' || currentScreen === 'login' || currentScreen === 'avatar';

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50">
      {/* Mobile/Tablet/Desktop Container */}
      <div className={`${
        isFullScreen 
          ? 'w-full h-screen' 
          : 'w-full min-h-screen'
      } bg-white overflow-hidden relative`}>
        {currentScreen === 'splash' && (
          <SplashScreen onNavigate={navigateToScreen} />
        )}
        {currentScreen === 'login' && (
          <LoginScreen onNavigate={navigateToScreen} updateUserData={updateUserData} />
        )}
        {currentScreen === 'avatar' && (
          <AvatarSelectionScreen onNavigate={navigateToScreen} updateUserData={updateUserData} />
        )}
        {currentScreen === 'home' && (
          <HomeScreen onNavigate={navigateToScreen} userData={userData} updateUserData={updateUserData} />
        )}
        {currentScreen === 'learning' && (
          <LearningModuleScreen onNavigate={navigateToScreen} updateUserData={updateUserData} userData={userData} />
        )}
        {currentScreen === 'quiz' && (
          <QuizScreen onNavigate={navigateToScreen} updateUserData={updateUserData} userData={userData} />
        )}
        {currentScreen === 'simulation' && (
          <SimulationScreen onNavigate={navigateToScreen} />
        )}
        {currentScreen === 'progress' && (
          <ProgressScreen onNavigate={navigateToScreen} userData={userData} />
        )}
        {currentScreen === 'profile' && (
          <ProfileScreen onNavigate={navigateToScreen} userData={userData} updateUserData={updateUserData} />
        )}
        {currentScreen === 'feedback' && (
          <FeedbackScreen onNavigate={navigateToScreen} userData={userData} />
        )}
        {currentScreen === 'scenario' && (
          <ScenarioFlowScreen onNavigate={navigateToScreen} userData={userData} updateUserData={updateUserData} />
        )}
        {currentScreen === 'coinSimulator' && (
          <CoinInvestmentSimulator onNavigate={navigateToScreen} userData={userData} updateUserData={updateUserData} />
        )}
      </div>
    </div>
  );
}