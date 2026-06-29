import { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, TrendingUp, PlayCircle, Coins } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Slider } from './ui/slider';
import { Button } from './ui/button';
import type { Screen } from '../App';

interface SimulationScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function SimulationScreen({ onNavigate }: SimulationScreenProps) {
  const [monthlyInvestment, setMonthlyInvestment] = useState(1000);
  const [interestRate, setInterestRate] = useState(12);
  const [duration, setDuration] = useState(30);

  // Calculate investment growth
  const calculateGrowth = () => {
    const data = [];
    const monthlyRate = interestRate / 100 / 12;
    let amount = 0;

    for (let year = 0; year <= duration; year += 5) {
      const months = year * 12;
      if (months === 0) {
        data.push({ year, amount: 0 });
      } else {
        amount = monthlyInvestment * (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
        data.push({ year, amount: Math.round(amount) });
      }
    }
    return data;
  };

  const data = calculateGrowth();
  const finalAmount = data[data.length - 1].amount;
  const totalInvested = monthlyInvestment * duration * 12;
  const returns = finalAmount - totalInvested;

  const formatCurrency = (value: number) => {
    if (value >= 10000000) {
      return `₹${(value / 10000000).toFixed(2)}Cr`;
    } else if (value >= 100000) {
      return `₹${(value / 100000).toFixed(2)}L`;
    } else {
      return `₹${(value / 1000).toFixed(0)}K`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#008080] to-[#66CCFF] rounded-b-[24px] md:rounded-b-[40px] p-4 sm:p-6 md:p-8 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 sm:gap-4 mb-6">
            <button
              onClick={() => onNavigate('home')}
              className="text-white"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <h3 className="text-white flex-1 text-xl sm:text-2xl md:text-3xl">Investment Simulators</h3>
            <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-[#FFD700]" />
          </div>

          {/* Quick Action Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => onNavigate('scenario')}
              className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-left hover:bg-white/30 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/30 rounded-full flex items-center justify-center">
                  <PlayCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white">Life Scenarios</h4>
                  <p className="text-white/70 text-sm">Practice real-world decisions</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => onNavigate('coinSimulator')}
              className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-left hover:bg-white/30 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/30 rounded-full flex items-center justify-center">
                  <Coins className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white">Virtual Trading</h4>
                  <p className="text-white/70 text-sm">Trade stocks, crypto & gold</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl mb-6">
                <h4 className="text-[#008080] mb-6 text-center text-lg sm:text-xl md:text-2xl">See Your Investment Grow! 📈</h4>

                {/* Monthly Investment Slider */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-gray-700 text-sm sm:text-base">Monthly Investment</label>
                    <span className="text-[#008080]">₹{monthlyInvestment}</span>
                  </div>
                  <Slider
                    value={[monthlyInvestment]}
                    onValueChange={(value) => setMonthlyInvestment(value[0])}
                    min={500}
                    max={50000}
                    step={500}
                    className="mb-2"
                  />
                </div>

                {/* Interest Rate Slider */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-gray-700 text-sm sm:text-base">Interest Rate</label>
                    <span className="text-[#008080]">{interestRate}%</span>
                  </div>
                  <Slider
                    value={[interestRate]}
                    onValueChange={(value) => setInterestRate(value[0])}
                    min={1}
                    max={20}
                    step={0.5}
                    className="mb-2"
                  />
                </div>

                {/* Duration Slider */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-gray-700 text-sm sm:text-base">Duration (Years)</label>
                    <span className="text-[#008080]">{duration} years</span>
                  </div>
                  <Slider
                    value={[duration]}
                    onValueChange={(value) => setDuration(value[0])}
                    min={5}
                    max={40}
                    step={5}
                    className="mb-2"
                  />
                </div>
              </div>

              {/* Results */}
              <div className="bg-gradient-to-br from-[#008080] to-[#66CCFF] rounded-3xl p-6 sm:p-8 shadow-xl text-white mb-6">
                <h5 className="mb-4 text-center text-lg sm:text-xl">Your Future Wealth 🎯</h5>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
                    <p className="text-white/80 text-sm mb-1">Total Invested</p>
                    <p className="text-white text-sm sm:text-base">{formatCurrency(totalInvested)}</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
                    <p className="text-white/80 text-sm mb-1">Returns</p>
                    <p className="text-[#FFD700] text-sm sm:text-base">{formatCurrency(returns)}</p>
                  </div>
                </div>
                <div className="bg-[#FFD700] rounded-2xl p-6 text-center">
                  <p className="text-[#008080] text-sm mb-2">Final Amount After {duration} Years</p>
                  <p className="text-[#008080] text-xl sm:text-2xl">{formatCurrency(finalAmount)}</p>
                </div>
                <div className="mt-4 bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                  <p className="text-sm text-white/90 text-center">
                    💡 Start early! Even small investments can grow significantly over time with compound interest.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl mb-6 lg:h-full">
                <h5 className="text-gray-700 mb-6 text-lg sm:text-xl">Investment Growth Over Time</h5>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis 
                      dataKey="year" 
                      stroke="#6b7280"
                      tick={{ fontSize: 12 }}
                      label={{ value: 'Years', position: 'insideBottom', offset: -5 }}
                    />
                    <YAxis 
                      stroke="#6b7280"
                      tick={{ fontSize: 12 }}
                      tickFormatter={formatCurrency}
                    />
                    <Tooltip 
                      formatter={(value: number) => formatCurrency(value)}
                      contentStyle={{ borderRadius: '12px', border: '2px solid #008080' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="amount" 
                      stroke="#008080" 
                      strokeWidth={3}
                      dot={{ fill: '#008080', r: 4 }}
                      activeDot={{ r: 6, fill: '#FFD700' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          {/* Scenario Challenge Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <Button
              onClick={() => onNavigate('scenario')}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-6 sm:py-7 rounded-2xl shadow-lg hover:shadow-xl text-base sm:text-lg"
            >
              <PlayCircle className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
              Try Real-Life Financial Scenarios 🎮
            </Button>
            <p className="text-center text-gray-500 text-sm mt-3">
              Practice making smart financial decisions through interactive stories!
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}