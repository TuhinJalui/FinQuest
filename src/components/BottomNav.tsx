import { Home, Brain, BarChart3, User } from 'lucide-react';
import type { Screen } from '../App';

interface BottomNavProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

export function BottomNav({ currentScreen, onNavigate }: BottomNavProps) {
  const navItems = [
    { id: 'home' as Screen, label: 'Home', icon: Home },
    { id: 'quiz' as Screen, label: 'Quiz', icon: Brain },
    { id: 'progress' as Screen, label: 'Progress', icon: BarChart3 },
    { id: 'profile' as Screen, label: 'Profile', icon: User }
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 rounded-t-3xl shadow-2xl">
      <div className="flex items-center justify-around px-6 py-4">
        {navItems.map((item) => {
          const isActive = currentScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center gap-1 transition-colors ${
                isActive ? 'text-[#008080]' : 'text-gray-400'
              }`}
            >
              <item.icon className={`w-6 h-6 ${isActive ? 'fill-[#008080]/20' : ''}`} />
              <span className="text-xs">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
