import { useState } from 'react';
import { motion } from 'motion/react';
import { User, Mail, Target, Moon, Volume2, Bell, ChevronRight, Edit2, Award, Coins, Flame } from 'lucide-react';
import { Switch } from './ui/switch';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { BottomNav } from './BottomNav';
import type { Screen, UserData } from '../App';
import { getCurrentLevelProgress } from '../utils/gameUtils';

interface ProfileScreenProps {
  onNavigate: (screen: Screen) => void;
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
}

export function ProfileScreen({ onNavigate, userData, updateUserData }: ProfileScreenProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(userData.name);
  const [age, setAge] = useState('25');
  const [goal, setGoal] = useState('Save for retirement');
  const [darkMode, setDarkMode] = useState(false);
  const [sound, setSound] = useState(true);
  const [notifications, setNotifications] = useState(true);

  const handleSave = () => {
    updateUserData({ name });
    setIsEditing(false);
  };

  const getAvatarEmoji = () => {
    if (userData.avatar === 'student') return '💡';
    if (userData.avatar === 'saver') return '🏦';
    if (userData.avatar === 'investor') return '📈';
    return '👤';
  };

  return (
    <div className="h-full bg-gradient-to-br from-teal-50 to-blue-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#008080] to-[#66CCFF] rounded-b-[40px] p-8 pb-12 shadow-lg">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="relative inline-block mb-4">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-xl">
              <span className="text-5xl">{getAvatarEmoji()}</span>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="absolute bottom-0 right-0 w-8 h-8 bg-[#FFD700] rounded-full flex items-center justify-center shadow-lg"
            >
              <Edit2 className="w-4 h-4 text-[#008080]" />
            </button>
          </div>
          <h3 className="text-white mb-1">{userData.name}</h3>
          <p className="text-white/80">{userData.email || 'vivan@finquest.com'}</p>
        </motion.div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 pb-24">
        {isEditing ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-6 shadow-xl mb-6"
          >
            <h4 className="text-[#008080] mb-6">Edit Profile</h4>
            
            <div className="space-y-4">
              <div>
                <label className="text-gray-700 text-sm mb-2 block">Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#008080]" />
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-11 rounded-xl border-2"
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-700 text-sm mb-2 block">Age</label>
                <Input
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  type="number"
                  className="rounded-xl border-2"
                />
              </div>

              <div>
                <label className="text-gray-700 text-sm mb-2 block">Financial Goal</label>
                <div className="relative">
                  <Target className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#008080]" />
                  <Input
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    className="pl-11 rounded-xl border-2"
                  />
                </div>
              </div>

              <Button
                onClick={handleSave}
                className="w-full bg-[#008080] hover:bg-[#008080]/90 text-white py-6 rounded-xl"
              >
                Save Changes
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-6 shadow-xl mb-6"
          >
            <h4 className="text-[#008080] mb-4">Personal Info</h4>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                <User className="w-5 h-5 text-[#008080]" />
                <div className="flex-1">
                  <p className="text-gray-500 text-sm">Age</p>
                  <p className="text-gray-800">{age} years</p>
                </div>
              </div>

              <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                <Mail className="w-5 h-5 text-[#008080]" />
                <div className="flex-1">
                  <p className="text-gray-500 text-sm">Email</p>
                  <p className="text-gray-800">{userData.email || 'vivan@finquest.com'}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Target className="w-5 h-5 text-[#008080]" />
                <div className="flex-1">
                  <p className="text-gray-500 text-sm">Financial Goal</p>
                  <p className="text-gray-800">{goal}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Settings */}
        <div className="bg-white rounded-3xl p-6 shadow-xl mb-6">
          <h4 className="text-[#008080] mb-4">Settings</h4>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <Moon className="w-5 h-5 text-[#008080]" />
                <div>
                  <p className="text-gray-800">Dark Mode</p>
                  <p className="text-gray-500 text-sm">Toggle dark theme</p>
                </div>
              </div>
              <Switch checked={darkMode} onCheckedChange={setDarkMode} />
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <Volume2 className="w-5 h-5 text-[#008080]" />
                <div>
                  <p className="text-gray-800">Sound Effects</p>
                  <p className="text-gray-500 text-sm">Enable audio feedback</p>
                </div>
              </div>
              <Switch checked={sound} onCheckedChange={setSound} />
            </div>

            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-[#008080]" />
                <div>
                  <p className="text-gray-800">Notifications</p>
                  <p className="text-gray-500 text-sm">Daily learning reminders</p>
                </div>
              </div>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>
          </div>
        </div>

        {/* Stats Card */}
        <div className="bg-gradient-to-br from-[#008080] to-[#66CCFF] rounded-3xl p-6 shadow-xl text-white">
          <h4 className="mb-4">Your Journey</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
              <p className="text-3xl mb-1">🎯</p>
              <p className="text-white/80 text-sm">Level {userData.level}</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
              <p className="text-3xl mb-1">🔥</p>
              <p className="text-white/80 text-sm">{userData.streak} Day Streak</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
              <p className="text-3xl mb-1">✅</p>
              <p className="text-white/80 text-sm">{userData.completedModules.length} Modules</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
              <p className="text-3xl mb-1">🪙</p>
              <p className="text-white/80 text-sm">{userData.coins} Coins</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 space-y-3">
          <button className="w-full bg-white rounded-2xl p-5 shadow-lg flex items-center justify-between hover:shadow-xl transition-shadow">
            <span className="text-gray-800">Help & Support</span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
          <button className="w-full bg-white rounded-2xl p-5 shadow-lg flex items-center justify-between hover:shadow-xl transition-shadow">
            <span className="text-gray-800">Privacy Policy</span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
          <button className="w-full bg-white rounded-2xl p-5 shadow-lg flex items-center justify-between hover:shadow-xl transition-shadow">
            <span className="text-red-500">Logout</span>
            <ChevronRight className="w-5 h-5 text-red-400" />
          </button>
        </div>
      </div>

      <BottomNav currentScreen="profile" onNavigate={onNavigate} />
    </div>
  );
}