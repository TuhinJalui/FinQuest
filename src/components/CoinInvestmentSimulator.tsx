import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, TrendingUp, TrendingDown, Award, Sparkles, Info, X, PieChart, Plus, Wallet } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import type { Screen, UserData } from '../App';
import confetti from 'canvas-confetti';
import { toast } from 'sonner@2.0.3';

interface CoinInvestmentSimulatorProps {
  onNavigate: (screen: Screen) => void;
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
}

interface Coin {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change: number;
  icon: string;
  color: string;
  owned: number;
  totalInvested: number; // Track total money invested in this coin
}

interface Transaction {
  type: 'buy' | 'sell';
  coinId: string;
  coinName: string;
  amount: number;
  price: number;
  total: number;
  timestamp: Date;
}

const AI_TIPS = [
  "💡 Diversify your investments across different asset types",
  "🎯 Avoid emotional trading - stick to your strategy",
  "📊 Research before investing - knowledge is power",
  "⏰ Think long-term - patience pays off",
  "🔄 Rebalance your portfolio regularly",
  "📉 Don't panic sell during market dips",
  "💰 Only invest what you can afford to lose",
  "🎓 Keep learning about financial markets"
];

export function CoinInvestmentSimulator({ onNavigate, userData, updateUserData }: CoinInvestmentSimulatorProps) {
  const [balance, setBalance] = useState(0);
  const [coins, setCoins] = useState<Coin[]>([
    { id: 'stock', name: 'Stock Coin', symbol: 'STC', price: 150, change: 2.5, icon: '📈', color: '#2E7D32', owned: 0, totalInvested: 0 },
    { id: 'crypto', name: 'Crypto Coin', symbol: 'CRP', price: 85, change: -1.2, icon: '₿', color: '#FF6B00', owned: 0, totalInvested: 0 },
    { id: 'gold', name: 'Gold Coin', symbol: 'GLD', price: 200, change: 0.8, icon: '🪙', color: '#FFD700', owned: 0, totalInvested: 0 }
  ]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedCoin, setSelectedCoin] = useState<Coin | null>(null);
  const [tradeAmount, setTradeAmount] = useState('');
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
  const [showTip, setShowTip] = useState(false);
  const [currentTip, setCurrentTip] = useState(AI_TIPS[0]);
  const [portfolioHistory, setPortfolioHistory] = useState<number[]>([0]);
  const [badges, setBadges] = useState<string[]>([]);
  const [transactionTab, setTransactionTab] = useState<'buy' | 'sell'>('buy');
  const [showAddMoney, setShowAddMoney] = useState(false);
  const [addMoneyAmount, setAddMoneyAmount] = useState('');

  // Simulate price changes every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCoins(prevCoins => 
        prevCoins.map(coin => {
          const changePercent = (Math.random() - 0.5) * 5;
          const newPrice = coin.price * (1 + changePercent / 100);
          return {
            ...coin,
            price: Math.max(10, parseFloat(newPrice.toFixed(2))),
            change: parseFloat(changePercent.toFixed(2))
          };
        })
      );
      
      // Update portfolio history with current portfolio value
      const currentPortfolioValue = coins.reduce((sum, coin) => sum + (coin.owned * coin.price), 0);
      setPortfolioHistory(prev => {
        const newHistory = [...prev];
        newHistory.push(currentPortfolioValue);
        if (newHistory.length > 30) newHistory.shift(); // Keep 30 data points for smooth line
        return newHistory;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [coins]);

  // Show random tip every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const randomTip = AI_TIPS[Math.floor(Math.random() * AI_TIPS.length)];
      setCurrentTip(randomTip);
      setShowTip(true);
      setTimeout(() => setShowTip(false), 8000);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const calculateTotalValue = () => {
    const portfolioValue = coins.reduce((sum, coin) => sum + (coin.owned * coin.price), 0);
    return balance + portfolioValue;
  };

  const calculateTotalInvested = () => {
    return coins.reduce((sum, coin) => sum + coin.totalInvested, 0);
  };

  const calculatePortfolioValue = () => {
    return coins.reduce((sum, coin) => sum + (coin.owned * coin.price), 0);
  };

  const calculatePortfolioProfitLoss = () => {
    const totalInvested = calculateTotalInvested();
    const currentValue = calculatePortfolioValue();
    return currentValue - totalInvested;
  };

  const calculatePortfolioProfitLossPercent = () => {
    const totalInvested = calculateTotalInvested();
    if (totalInvested === 0) return 0;
    return ((calculatePortfolioProfitLoss() / totalInvested) * 100).toFixed(2);
  };

  const calculateGainLoss = () => {
    return calculateTotalValue() - balance;
  };

  const calculateGainLossPercent = () => {
    return ((calculateGainLoss() / balance) * 100).toFixed(2);
  };

  const handleBuy = (coin: Coin) => {
    setSelectedCoin(coin);
    setTradeAmount('');
    setTradeType('buy');
  };

  const handleSell = (coin: Coin) => {
    setSelectedCoin({ ...coin });
    setTradeAmount('');
    setTradeType('sell');
  };

  const executeBuy = () => {
    if (!selectedCoin || !tradeAmount) return;
    
    const amount = parseFloat(tradeAmount);
    const total = amount * selectedCoin.price;
    
    if (total > balance) {
      toast.error('Insufficient balance!');
      return;
    }

    setBalance(prev => prev - total);
    setCoins(prevCoins =>
      prevCoins.map(c =>
        c.id === selectedCoin.id
          ? { ...c, owned: c.owned + amount, totalInvested: c.totalInvested + total }
          : c
      )
    );

    const transaction: Transaction = {
      type: 'buy',
      coinId: selectedCoin.id,
      coinName: selectedCoin.name,
      amount,
      price: selectedCoin.price,
      total,
      timestamp: new Date()
    };
    setTransactions(prev => [transaction, ...prev]);

    toast.success(`Bought ${amount} ${selectedCoin.symbol} for ₹${total.toFixed(2)}`);
    checkBadges('buy', amount, total);

    setSelectedCoin(null);
    setTradeAmount('');
  };

  const executeSell = () => {
    if (!selectedCoin || !tradeAmount) return;
    
    const amount = parseFloat(tradeAmount);
    const coin = coins.find(c => c.id === selectedCoin.id);
    
    if (!coin || amount > coin.owned) {
      toast.error('Insufficient coins to sell!');
      return;
    }

    const total = amount * selectedCoin.price;
    const investedAmount = (amount / coin.owned) * coin.totalInvested;

    setBalance(prev => prev + total);
    setCoins(prevCoins =>
      prevCoins.map(c =>
        c.id === selectedCoin.id
          ? { ...c, owned: c.owned - amount, totalInvested: Math.max(0, c.totalInvested - investedAmount) }
          : c
      )
    );

    const transaction: Transaction = {
      type: 'sell',
      coinId: selectedCoin.id,
      coinName: selectedCoin.name,
      amount,
      price: selectedCoin.price,
      total,
      timestamp: new Date()
    };
    setTransactions(prev => [transaction, ...prev]);

    toast.success(`Sold ${amount} ${selectedCoin.symbol} for ₹${total.toFixed(2)}`);
    checkBadges('sell', amount, total);

    setSelectedCoin(null);
    setTradeAmount('');
  };

  const checkBadges = (type: 'buy' | 'sell', amount: number, total: number) => {
    const newBadges: string[] = [];

    if (transactions.length === 0) {
      newBadges.push('🌟 First Trade!');
    }

    const ownedCoins = coins.filter(c => c.owned > 0).length;
    if (ownedCoins === 3 && !badges.includes('🎯 Diversified Portfolio')) {
      newBadges.push('🎯 Diversified Portfolio');
    }

    if (total >= 1000 && !badges.includes('💎 Big Trader')) {
      newBadges.push('💎 Big Trader');
    }

    const profitLoss = calculatePortfolioProfitLoss();
    if (profitLoss >= 1000 && !badges.includes('🏆 Profit Maker')) {
      newBadges.push('🏆 Profit Maker');
      triggerConfetti();
    }

    if (newBadges.length > 0) {
      setBadges(prev => [...prev, ...newBadges]);
      newBadges.forEach(badge => {
        setTimeout(() => {
          toast.success(`🎉 New Badge Earned: ${badge}`);
        }, 100);
      });
    }
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const maxHeight = Math.max(...portfolioHistory);
  const minHeight = Math.min(...portfolioHistory);

  const buyTransactions = transactions.filter(t => t.type === 'buy');
  const sellTransactions = transactions.filter(t => t.type === 'sell');

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#008080] to-[#66CCFF] px-4 sm:px-6 md:px-8 py-4 sm:py-6 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => onNavigate('simulation')}
              className="flex items-center gap-2 text-white hover:text-white/80 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Back</span>
            </button>
            <h2 className="text-white text-xl sm:text-2xl">Virtual Coin Trading</h2>
            <div className="w-16" /> {/* Spacer */}
          </div>

          {/* Floating Balance Indicator */}
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex-1 text-center">
                <p className="text-white/80 text-sm mb-1">Available Balance</p>
                <p className="text-white text-2xl sm:text-3xl">₹{balance.toFixed(2)}</p>
              </div>
              <button
                onClick={() => setShowAddMoney(true)}
                className="ml-4 bg-white/30 hover:bg-white/40 backdrop-blur-sm rounded-xl px-4 py-2 text-white flex items-center gap-2 transition-all"
              >
                <Plus className="w-5 h-5" />
                <span className="hidden sm:inline">Add Money</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6 space-y-6">
        {/* AI Tip Banner */}
        <AnimatePresence>
          {showTip && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-4 text-white flex items-center justify-between shadow-lg"
            >
              <div className="flex items-center gap-3">
                <Sparkles className="w-6 h-6" />
                <p className="text-sm sm:text-base">{currentTip}</p>
              </div>
              <button onClick={() => setShowTip(false)}>
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Investment Summary Section */}
        {calculateTotalInvested() > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <PieChart className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-gray-800 text-xl">Investment Summary</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Total Investment & Current Value */}
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-xl">
                  <p className="text-sm text-gray-600 mb-1">Total Investment Amount</p>
                  <p className="text-2xl text-blue-600">₹{calculateTotalInvested().toFixed(2)}</p>
                </div>

                <div className="p-4 bg-teal-50 rounded-xl">
                  <p className="text-sm text-gray-600 mb-1">Current Portfolio Value</p>
                  <p className="text-2xl text-[#008080]">₹{calculatePortfolioValue().toFixed(2)}</p>
                </div>

                {/* Profit/Loss Card */}
                <div className={`p-4 rounded-xl ${calculatePortfolioProfitLoss() >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
                  <p className="text-sm text-gray-600 mb-1">Portfolio Status</p>
                  <div className="flex items-center gap-2">
                    {calculatePortfolioProfitLoss() >= 0 ? (
                      <TrendingUp className="w-5 h-5 text-[#2E7D32]" />
                    ) : (
                      <TrendingDown className="w-5 h-5 text-red-500" />
                    )}
                    <p className={`text-2xl ${calculatePortfolioProfitLoss() >= 0 ? 'text-[#2E7D32]' : 'text-red-500'}`}>
                      {calculatePortfolioProfitLoss() >= 0 ? 'Profit' : 'Loss'} ₹{Math.abs(calculatePortfolioProfitLoss()).toFixed(2)}
                    </p>
                  </div>
                  <p className={`text-sm mt-1 ${calculatePortfolioProfitLoss() >= 0 ? 'text-[#2E7D32]' : 'text-red-500'}`}>
                    {calculatePortfolioProfitLoss() >= 0 ? '+' : ''}{calculatePortfolioProfitLossPercent()}%
                  </p>
                </div>
              </div>

              {/* Investment Breakdown */}
              <div>
                <p className="text-sm text-gray-600 mb-4">Invested In</p>
                <div className="space-y-3">
                  {coins.map((coin) => {
                    const currentValue = coin.owned * coin.price;
                    const profitLoss = currentValue - coin.totalInvested;
                    const profitLossPercent = coin.totalInvested > 0 
                      ? ((profitLoss / coin.totalInvested) * 100).toFixed(2) 
                      : '0.00';

                    return (
                      <div key={coin.id} className="p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{coin.icon}</span>
                            <div>
                              <p className="text-gray-800">{coin.name}</p>
                              <p className="text-xs text-gray-500">
                                {coin.owned > 0 ? `${coin.owned.toFixed(4)} ${coin.symbol}` : 'Not invested'}
                              </p>
                            </div>
                          </div>
                          {coin.totalInvested > 0 && (
                            <div className="text-right">
                              <p className="text-sm text-gray-600">₹{currentValue.toFixed(2)}</p>
                              <p className={`text-xs ${profitLoss >= 0 ? 'text-[#2E7D32]' : 'text-red-500'}`}>
                                {profitLoss >= 0 ? '+' : ''}₹{profitLoss.toFixed(2)} ({profitLoss >= 0 ? '+' : ''}{profitLossPercent}%)
                              </p>
                            </div>
                          )}
                        </div>
                        {coin.totalInvested > 0 && (
                          <div className="mt-2">
                            <div className="flex justify-between text-xs text-gray-500 mb-1">
                              <span>Invested: ₹{coin.totalInvested.toFixed(2)}</span>
                            </div>
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className={`h-full ${profitLoss >= 0 ? 'bg-[#2E7D32]' : 'bg-red-500'}`}
                                style={{ width: `${Math.min(100, (currentValue / coin.totalInvested) * 100)}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Portfolio Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-[#008080]/10 rounded-full flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-[#008080]" />
              </div>
              <h3 className="text-gray-700">Total Value</h3>
            </div>
            <p className="text-3xl text-[#008080]">₹{calculateTotalValue().toFixed(2)}</p>
          </div>

          <div className={`bg-white rounded-2xl p-6 shadow-lg ${calculateGainLoss() >= 0 ? 'border-l-4 border-[#2E7D32]' : 'border-l-4 border-red-500'}`}>
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${calculateGainLoss() >= 0 ? 'bg-[#2E7D32]/10' : 'bg-red-100'}`}>
                {calculateGainLoss() >= 0 ? (
                  <TrendingUp className="w-5 h-5 text-[#2E7D32]" />
                ) : (
                  <TrendingDown className="w-5 h-5 text-red-500" />
                )}
              </div>
              <h3 className="text-gray-700">Gain/Loss</h3>
            </div>
            <p className={`text-3xl ${calculateGainLoss() >= 0 ? 'text-[#2E7D32]' : 'text-red-500'}`}>
              {calculateGainLoss() >= 0 ? '+' : ''}₹{calculateGainLoss().toFixed(2)}
            </p>
            <p className={`text-sm ${calculateGainLoss() >= 0 ? 'text-[#2E7D32]' : 'text-red-500'}`}>
              {calculateGainLoss() >= 0 ? '+' : ''}{calculateGainLossPercent()}%
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Award className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="text-gray-700">Badges Earned</h3>
            </div>
            <p className="text-3xl text-purple-600">{badges.length}</p>
            {badges.length > 0 && (
              <p className="text-sm text-gray-500 mt-1">{badges[badges.length - 1]}</p>
            )}
          </div>
        </div>

        {/* Portfolio Growth Chart */}
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl p-6 shadow-lg overflow-hidden">
          <h3 className="text-white mb-6">Portfolio Performance</h3>
          <div className="relative h-64 w-full">
            <svg className="w-full h-full" viewBox="0 0 800 256" preserveAspectRatio="none">
              {/* Grid lines */}
              {[0, 25, 50, 75, 100].map((y) => (
                <line
                  key={y}
                  x1="0"
                  y1={y * 2.56}
                  x2="800"
                  y2={y * 2.56}
                  stroke="#2a2a2a"
                  strokeWidth="1"
                  opacity="0.3"
                />
              ))}

              {/* Draw the line chart */}
              {portfolioHistory.length > 1 && (
                <>
                  {/* Calculate path and points */}
                  {(() => {
                    const totalInvested = calculateTotalInvested();
                    
                    // Calculate investment baseline Y position
                    let investmentLineY = 128; // default middle
                    if (totalInvested > 0 && maxHeight > minHeight) {
                      const investedPercent = 100 - ((totalInvested - minHeight) / (maxHeight - minHeight)) * 100;
                      investmentLineY = (investedPercent / 100) * 256;
                    }
                    
                    const points = portfolioHistory.map((value, index) => {
                      let yPercent = 50;
                      if (maxHeight > minHeight) {
                        yPercent = 100 - ((value - minHeight) / (maxHeight - minHeight)) * 100;
                      }
                      const x = (index / (portfolioHistory.length - 1)) * 800;
                      const y = (yPercent / 100) * 256;
                      
                      // Determine if this point is profit or loss
                      const isProfit = totalInvested === 0 || value >= totalInvested;
                      
                      // Determine if going up or down compared to previous point
                      let isGoingUp = false;
                      if (index > 0) {
                        isGoingUp = value > portfolioHistory[index - 1];
                      }
                      
                      return { x, y, value, isProfit, isGoingUp };
                    });

                    return (
                      <>
                        {/* Investment baseline - drawn first so it's behind everything */}
                        {totalInvested > 0 && (
                          <>
                            <line
                              x1="0"
                              y1={investmentLineY}
                              x2="800"
                              y2={investmentLineY}
                              stroke="#64748b"
                              strokeWidth="2"
                              strokeDasharray="8 4"
                              opacity="0.6"
                            />
                            <text
                              x="10"
                              y={investmentLineY - 8}
                              fill="#94a3b8"
                              fontSize="12"
                              fontFamily="system-ui"
                            >
                              Investment: ₹{totalInvested.toFixed(0)}
                            </text>
                          </>
                        )}

                        {/* Draw gradient fills - one for profit zone, one for loss zone */}
                        <defs>
                          <linearGradient id="profitGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#10b981" stopOpacity="0.05" />
                          </linearGradient>
                          <linearGradient id="lossGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#ef4444" stopOpacity="0.05" />
                          </linearGradient>
                        </defs>

                        {/* Draw line segments with different colors based on up/down movement */}
                        {points.map((point, i) => {
                          if (i === 0) return null;
                          
                          const prevPoint = points[i - 1];
                          const isGoingUp = point.value > prevPoint.value;
                          const lineColor = isGoingUp ? '#10b981' : '#ef4444';
                          const glowColor = isGoingUp ? '#10b98180' : '#ef444480';
                          
                          return (
                            <g key={`segment-${i}`}>
                              {/* Glow effect */}
                              <motion.line
                                x1={prevPoint.x}
                                y1={prevPoint.y}
                                x2={point.x}
                                y2={point.y}
                                stroke={glowColor}
                                strokeWidth="6"
                                strokeLinecap="round"
                                filter="blur(4px)"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 1 }}
                                transition={{ duration: 0.5, delay: i * 0.05 }}
                              />
                              
                              {/* Main line segment */}
                              <motion.line
                                x1={prevPoint.x}
                                y1={prevPoint.y}
                                x2={point.x}
                                y2={point.y}
                                stroke={lineColor}
                                strokeWidth="3"
                                strokeLinecap="round"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 1 }}
                                transition={{ duration: 0.5, delay: i * 0.05 }}
                              />
                            </g>
                          );
                        })}

                        {/* Fill area under the curve - split by profit/loss zones */}
                        {totalInvested > 0 && points.map((point, i) => {
                          if (i === 0) return null;
                          const prevPoint = points[i - 1];
                          
                          // Create a small polygon for this segment
                          const isAboveLine = point.y < investmentLineY;
                          const fillColor = isAboveLine ? 'url(#profitGradient)' : 'url(#lossGradient)';
                          
                          // Clamp the fill to the investment line
                          const points1Y = Math.max(prevPoint.y, investmentLineY);
                          const points2Y = Math.max(point.y, investmentLineY);
                          const points3Y = Math.min(prevPoint.y, investmentLineY);
                          const points4Y = Math.min(point.y, investmentLineY);
                          
                          if (isAboveLine) {
                            // Profit zone (above investment line)
                            return (
                              <motion.polygon
                                key={`fill-profit-${i}`}
                                points={`${prevPoint.x},${prevPoint.y} ${point.x},${point.y} ${point.x},${investmentLineY} ${prevPoint.x},${investmentLineY}`}
                                fill={fillColor}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: i * 0.05 }}
                              />
                            );
                          } else {
                            // Loss zone (below investment line)
                            return (
                              <motion.polygon
                                key={`fill-loss-${i}`}
                                points={`${prevPoint.x},${investmentLineY} ${point.x},${investmentLineY} ${point.x},${point.y} ${prevPoint.x},${prevPoint.y}`}
                                fill={fillColor}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: i * 0.05 }}
                              />
                            );
                          }
                        })}

                        {/* Animated dots on each point */}
                        {points.map((point, i) => {
                          // Determine color based on position relative to investment line
                          const isAboveInvestment = totalInvested === 0 || point.value >= totalInvested;
                          const dotColor = isAboveInvestment ? '#10b981' : '#ef4444';
                          const dotStroke = isAboveInvestment ? '#34d399' : '#f87171';
                          
                          return (
                            <motion.circle
                              key={`dot-${i}`}
                              cx={point.x}
                              cy={point.y}
                              r={i === points.length - 1 ? 6 : 3}
                              fill={dotColor}
                              stroke={dotStroke}
                              strokeWidth="2"
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ 
                                scale: i === points.length - 1 ? [1, 1.3, 1] : 1,
                                opacity: 1 
                              }}
                              transition={{ 
                                delay: 0.5 + (i * 0.05),
                                scale: {
                                  repeat: i === points.length - 1 ? Infinity : 0,
                                  duration: 2,
                                  ease: "easeInOut"
                                }
                              }}
                            >
                              <title>
                                ₹{point.value.toFixed(2)}
                                {totalInvested > 0 && ` (${point.value >= totalInvested ? 'Profit' : 'Loss'})`}
                              </title>
                            </motion.circle>
                          );
                        })}
                      </>
                    );
                  })()}
                </>
              )}
            </svg>

            {/* Current percentage display */}
            {calculateTotalInvested() > 0 && portfolioHistory.length > 0 && (() => {
              const lastValue = portfolioHistory[portfolioHistory.length - 1];
              const totalInvested = calculateTotalInvested();
              const gainLossPercent = totalInvested > 0 
                ? (((lastValue - totalInvested) / totalInvested) * 100).toFixed(1)
                : '0.0';
              const isProfit = lastValue >= totalInvested;
              
              // Check if trending up or down
              const isGoingUp = portfolioHistory.length > 1 && 
                lastValue > portfolioHistory[portfolioHistory.length - 2];

              return (
                <motion.div 
                  className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-lg"
                  animate={{ 
                    borderColor: isProfit ? '#10b981' : '#ef4444',
                    boxShadow: isProfit ? '0 0 20px #10b98140' : '0 0 20px #ef444440'
                  }}
                  style={{ border: '2px solid' }}
                >
                  <div className="flex items-center gap-2">
                    {isGoingUp ? (
                      <TrendingUp className="w-4 h-4 text-[#10b981]" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-[#ef4444]" />
                    )}
                    <p className={`text-lg ${isProfit ? 'text-[#10b981]' : 'text-[#ef4444]'}`}>
                      {isProfit ? '+' : ''}{gainLossPercent}%
                    </p>
                  </div>
                  <p className="text-xs text-gray-400 text-center">
                    {isProfit ? 'Profit' : 'Loss'}
                  </p>
                  <p className="text-xs text-gray-500 text-center mt-1">
                    ₹{lastValue.toFixed(2)}
                  </p>
                </motion.div>
              );
            })()}

            {/* Investment amount display */}
            {calculateTotalInvested() > 0 && (
              <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm px-3 py-2 rounded-lg border border-gray-600">
                <p className="text-xs text-gray-400">Invested</p>
                <p className="text-sm text-white">₹{calculateTotalInvested().toFixed(2)}</p>
              </div>
            )}
          </div>

          <div className="flex justify-between mt-4 text-xs text-gray-400 px-2">
            <span>Start</span>
            <span>Current</span>
          </div>

          <div className="mt-4 flex items-center justify-center gap-4 sm:gap-6 text-xs flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#10b981] rounded-full"></div>
              <span className="text-gray-400">Going Up / Profit</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#ef4444] rounded-full"></div>
              <span className="text-gray-400">Going Down / Loss</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-0.5 border-t-2 border-dashed border-gray-500"></div>
              <span className="text-gray-400">Investment Baseline</span>
            </div>
          </div>
        </div>

        {/* Coin Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {coins.map((coin) => (
            <motion.div
              key={coin.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{coin.icon}</span>
                  <div>
                    <h4 className="text-gray-800">{coin.name}</h4>
                    <p className="text-sm text-gray-500">{coin.symbol}</p>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm ${coin.change >= 0 ? 'bg-[#2E7D32]/10 text-[#2E7D32]' : 'bg-red-100 text-red-600'}`}>
                  {coin.change >= 0 ? '+' : ''}{coin.change}%
                </div>
              </div>

              <div className="mb-4">
                <p className="text-3xl text-[#008080] mb-2">₹{coin.price.toFixed(2)}</p>
                <p className="text-sm text-gray-600">Owned: {coin.owned.toFixed(4)} {coin.symbol}</p>
                <p className="text-sm text-gray-500">Value: ₹{(coin.owned * coin.price).toFixed(2)}</p>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => handleBuy(coin)}
                  className="flex-1 bg-[#2E7D32] hover:bg-[#2E7D32]/90 text-white"
                >
                  Buy
                </Button>
                <Button
                  onClick={() => handleSell(coin)}
                  disabled={coin.owned === 0}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white disabled:opacity-50"
                >
                  Sell
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recent Transactions */}
        {transactions.length > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-gray-800 mb-4">Transaction History</h3>
            
            {/* Transaction Tabs */}
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setTransactionTab('buy')}
                className={`flex-1 py-2 px-4 rounded-lg transition-all ${
                  transactionTab === 'buy'
                    ? 'bg-[#2E7D32] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  <span>Buy ({buyTransactions.length})</span>
                </div>
              </button>
              <button
                onClick={() => setTransactionTab('sell')}
                className={`flex-1 py-2 px-4 rounded-lg transition-all ${
                  transactionTab === 'sell'
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <TrendingDown className="w-4 h-4" />
                  <span>Sell ({sellTransactions.length})</span>
                </div>
              </button>
            </div>

            {/* Transaction List */}
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {transactionTab === 'buy' ? (
                buyTransactions.length > 0 ? (
                  buyTransactions.slice(0, 10).map((tx, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-xl border border-green-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#2E7D32]/10">
                          <TrendingUp className="w-5 h-5 text-[#2E7D32]" />
                        </div>
                        <div>
                          <p className="text-gray-800">
                            Bought {tx.amount.toFixed(4)} {tx.coinName}
                          </p>
                          <p className="text-sm text-gray-500">
                            @ ₹{tx.price.toFixed(2)} each
                          </p>
                          <p className="text-xs text-gray-400">
                            {new Date(tx.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg text-red-500">-₹{tx.total.toFixed(2)}</p>
                        <p className="text-xs text-gray-500">Total Spent</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <TrendingUp className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                    <p>No buy transactions yet</p>
                  </div>
                )
              ) : (
                sellTransactions.length > 0 ? (
                  sellTransactions.slice(0, 10).map((tx, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-xl border border-red-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-red-100">
                          <TrendingDown className="w-5 h-5 text-red-500" />
                        </div>
                        <div>
                          <p className="text-gray-800">
                            Sold {tx.amount.toFixed(4)} {tx.coinName}
                          </p>
                          <p className="text-sm text-gray-500">
                            @ ₹{tx.price.toFixed(2)} each
                          </p>
                          <p className="text-xs text-gray-400">
                            {new Date(tx.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg text-[#2E7D32]">+₹{tx.total.toFixed(2)}</p>
                        <p className="text-xs text-gray-500">Total Received</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <TrendingDown className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                    <p>No sell transactions yet</p>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {/* Add Money Modal */}
        <AnimatePresence>
          {showAddMoney && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
              onClick={() => setShowAddMoney(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center gap-3 mb-6">
                  <Wallet className="w-5 h-5 text-[#008080]" />
                  <div>
                    <h3 className="text-2xl text-gray-800">Add Money</h3>
                    <p className="text-gray-500">Add funds to your virtual account</p>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 mb-2">Amount to Add</label>
                  <Input
                    type="number"
                    value={addMoneyAmount}
                    onChange={(e) => setAddMoneyAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="text-lg"
                    step="0.01"
                    min="0"
                  />
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={() => setShowAddMoney(false)}
                    variant="outline"
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      const amount = parseFloat(addMoneyAmount);
                      if (!isNaN(amount) && amount > 0) {
                        setBalance(prev => prev + amount);
                        toast.success(`Added ₹${amount.toFixed(2)} to your balance`);
                        setShowAddMoney(false);
                      } else {
                        toast.error('Please enter a valid amount');
                      }
                    }}
                    className="flex-1 bg-[#008080] hover:bg-[#008080]/90 text-white"
                    disabled={!addMoneyAmount || parseFloat(addMoneyAmount) <= 0}
                  >
                    Add Money
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Back to Dashboard Button */}
        <div className="flex justify-center pb-6">
          <Button
            onClick={() => onNavigate('home')}
            className="bg-[#008080] hover:bg-[#008080]/90 text-white px-8 py-6 text-lg rounded-2xl shadow-lg"
          >
            Back to Dashboard
          </Button>
        </div>
      </div>

      {/* Trade Modal */}
      <AnimatePresence>
        {selectedCoin && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedCoin(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-5xl">{selectedCoin.icon}</span>
                <div>
                  <h3 className="text-2xl text-gray-800">{selectedCoin.name}</h3>
                  <p className="text-gray-500">Current Price: ₹{selectedCoin.price.toFixed(2)}</p>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Amount to Trade</label>
                <Input
                  type="number"
                  value={tradeAmount}
                  onChange={(e) => setTradeAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="text-lg"
                  step="0.01"
                  min="0"
                />
                {tradeAmount && (
                  <p className="text-sm text-gray-500 mt-2">
                    Total: ₹{(parseFloat(tradeAmount) * selectedCoin.price).toFixed(2)}
                  </p>
                )}
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => setSelectedCoin(null)}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={tradeType === 'buy' ? executeBuy : executeSell}
                  className="flex-1 bg-[#008080] hover:bg-[#008080]/90 text-white"
                  disabled={!tradeAmount || parseFloat(tradeAmount) <= 0}
                >
                  Confirm {tradeType === 'buy' ? 'Buy' : 'Sell'}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}