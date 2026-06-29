import { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Send, Star, MessageSquare, Lightbulb, Bug } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import type { Screen, UserData } from '../App';

interface FeedbackScreenProps {
  onNavigate: (screen: Screen) => void;
  userData: UserData;
}

export function FeedbackScreen({ onNavigate, userData }: FeedbackScreenProps) {
  const [rating, setRating] = useState(0);
  const [feedbackType, setFeedbackType] = useState<'general' | 'suggestion' | 'bug'>('general');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const feedbackTypes = [
    { id: 'general' as const, label: 'General Feedback', icon: MessageSquare, color: 'from-blue-400 to-blue-600' },
    { id: 'suggestion' as const, label: 'Suggestion', icon: Lightbulb, color: 'from-yellow-400 to-orange-500' },
    { id: 'bug' as const, label: 'Report Bug', icon: Bug, color: 'from-red-400 to-red-600' }
  ];

  const handleSubmit = () => {
    if (message.trim() && rating > 0) {
      // In a real app, this would send to backend
      console.log({
        user: userData.name,
        rating,
        type: feedbackType,
        message,
        timestamp: new Date().toISOString()
      });
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="h-full bg-gradient-to-br from-[#008080] to-[#66CCFF] flex flex-col items-center justify-center p-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.6 }}
          className="text-center"
        >
          <div className="bg-white rounded-full p-8 mb-6 inline-block shadow-2xl">
            <span className="text-6xl">🎉</span>
          </div>
          <h2 className="text-white mb-4">Thank You!</h2>
          <p className="text-white/90 mb-8 max-w-sm">
            Your feedback helps us make FinQuest better for everyone. We appreciate you taking the time to share your thoughts!
          </p>
          <Button
            onClick={() => onNavigate('home')}
            className="bg-[#FFD700] text-[#008080] hover:bg-[#FFD700]/90 px-12 py-6 rounded-xl"
          >
            Back to Home
          </Button>
        </motion.div>

        {/* Confetti effect */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: -20, x: Math.random() * 400 - 200, opacity: 1 }}
            animate={{ y: 900, opacity: 0 }}
            transition={{ duration: 2 + Math.random() * 2, delay: Math.random() * 0.3 }}
            className="absolute text-2xl pointer-events-none"
            style={{ left: '50%' }}
          >
            {['⭐', '🎊', '✨', '💫', '🌟'][Math.floor(Math.random() * 5)]}
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className="h-full bg-gradient-to-br from-teal-50 to-blue-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#008080] to-[#66CCFF] rounded-b-[40px] p-6 shadow-lg">
        <div className="flex items-center gap-4">
          <button
            onClick={() => onNavigate('home')}
            className="text-white"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h3 className="text-white">Send Feedback</h3>
            <p className="text-white/80 text-sm">Help us improve FinQuest</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Rating */}
          <div className="bg-white rounded-3xl p-6 shadow-xl mb-6">
            <h4 className="text-[#008080] mb-4">How would you rate FinQuest?</h4>
            <div className="flex justify-center gap-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.button
                  key={star}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setRating(star)}
                  className="focus:outline-none"
                >
                  <Star
                    className={`w-12 h-12 transition-colors ${
                      star <= rating
                        ? 'text-[#FFD700] fill-[#FFD700]'
                        : 'text-gray-300'
                    }`}
                  />
                </motion.button>
              ))}
            </div>
            {rating > 0 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-gray-600 text-sm mt-3"
              >
                {rating === 5 && "Awesome! We're glad you love it! 🎉"}
                {rating === 4 && "Great! Thanks for your support! 😊"}
                {rating === 3 && "Good! We'll keep improving! 👍"}
                {rating === 2 && "We'll work harder to improve! 💪"}
                {rating === 1 && "Sorry to hear that. We'll do better! 🙏"}
              </motion.p>
            )}
          </div>

          {/* Feedback Type */}
          <div className="bg-white rounded-3xl p-6 shadow-xl mb-6">
            <h4 className="text-[#008080] mb-4">What kind of feedback?</h4>
            <div className="grid gap-3">
              {feedbackTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setFeedbackType(type.id)}
                  className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${
                    feedbackType === type.id
                      ? 'border-[#008080] bg-teal-50'
                      : 'border-gray-200 hover:border-[#008080]'
                  }`}
                >
                  <div className={`bg-gradient-to-br ${type.color} rounded-xl p-3`}>
                    <type.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-gray-800">{type.label}</span>
                  {feedbackType === type.id && (
                    <div className="ml-auto w-6 h-6 bg-[#008080] rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Message */}
          <div className="bg-white rounded-3xl p-6 shadow-xl mb-6">
            <h4 className="text-[#008080] mb-4">Tell us more</h4>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Share your thoughts, suggestions, or report an issue..."
              className="min-h-[150px] rounded-xl border-2 resize-none"
            />
            <p className="text-gray-500 text-sm mt-2">
              {message.length}/500 characters
            </p>
          </div>

          {/* User Info */}
          <div className="bg-gradient-to-br from-[#008080] to-[#66CCFF] rounded-3xl p-6 shadow-xl text-white mb-6">
            <h5 className="mb-3">Your Profile</h5>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-white/80">Name:</span>
                <span>{userData.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/80">Level:</span>
                <span>Level {userData.level}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/80">Modules Completed:</span>
                <span>{userData.completedModules.length}/5</span>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            disabled={!message.trim() || rating === 0}
            className="w-full bg-[#008080] hover:bg-[#008080]/90 text-white py-6 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5 mr-2" />
            Submit Feedback
          </Button>

          <p className="text-center text-gray-500 text-sm mt-4">
            Your feedback is valuable and helps us create a better learning experience! 💙
          </p>
        </motion.div>
      </div>
    </div>
  );
}
