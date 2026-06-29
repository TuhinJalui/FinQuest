export interface Choice {
  text: string;
  icon: string;
  outcome: 'good' | 'average' | 'poor';
  feedback: string;
  explanation: string;
  xp: number;
  coins: number;
}

export interface Scenario {
  id: string;
  title: string;
  story: string;
  character: string;
  characterBg: string;
  choices: Choice[];
}

export const scenarios: Scenario[] = [
  {
    id: 'scenario1',
    title: 'First Salary Dilemma',
    story: 'You just received your first ₹30,000 salary! 🎉 You\'ve been wanting a new phone for months, but you also know saving is important. What will you do?',
    character: '💼',
    characterBg: 'from-blue-400 to-purple-500',
    choices: [
      {
        text: 'Buy the ₹25,000 phone immediately',
        icon: '📱',
        outcome: 'poor',
        feedback: 'Not the best choice!',
        explanation: 'Spending most of your salary on a want leaves you with little savings and no emergency fund. Try the 50/30/20 rule instead!',
        xp: 1,
        coins: 10
      },
      {
        text: 'Save ₹10,000 first, then buy later',
        icon: '💰',
        outcome: 'average',
        explanation: 'Good thinking! Building savings first is smart. Consider investing some of that money for better returns though!',
        feedback: 'Decent choice!',
        xp: 2,
        coins: 30
      },
      {
        text: 'Invest ₹5,000, Save ₹10,000, then decide',
        icon: '📈',
        outcome: 'good',
        feedback: 'Excellent decision!',
        explanation: 'Perfect! You\'re building wealth (investing), creating safety (saving), and still have room for wants. This follows the 50/30/20 rule!',
        xp: 5,
        coins: 50
      }
    ]
  },
  {
    id: 'scenario2',
    title: 'Credit Card Offer',
    story: 'A bank offers you a credit card with ₹50,000 limit and exciting cashback offers! Your friend says it\'s "free money". What do you do?',
    character: '💳',
    characterBg: 'from-orange-400 to-red-500',
    choices: [
      {
        text: 'Accept and start using it for everything',
        icon: '🛍️',
        outcome: 'poor',
        feedback: 'Risky move!',
        explanation: 'Credit cards aren\'t free money! High interest rates (18-36%) can trap you in debt if you only pay minimum dues. Use wisely!',
        xp: 1,
        coins: 10
      },
      {
        text: 'Reject it - credit cards are dangerous',
        icon: '❌',
        outcome: 'average',
        feedback: 'Safe, but not optimal!',
        explanation: 'Credit cards build credit score and offer benefits when used responsibly. Rejecting completely means missing out on building credit history!',
        xp: 2,
        coins: 25
      },
      {
        text: 'Accept, but use only for planned expenses and pay full balance',
        icon: '✅',
        outcome: 'good',
        feedback: 'Smart financial move!',
        explanation: 'Perfect! Using credit cards responsibly builds credit score, gives cashback, and creates financial discipline. Always pay full balance!',
        xp: 5,
        coins: 50
      }
    ]
  },
  {
    id: 'scenario3',
    title: 'Investment Opportunity',
    story: 'You have ₹20,000 saved. A friend suggests investing in stocks, another says fixed deposit is safer. You have 5 years before needing this money. What\'s your move?',
    character: '📊',
    characterBg: 'from-green-400 to-teal-500',
    choices: [
      {
        text: 'Put everything in Fixed Deposit',
        icon: '🏦',
        outcome: 'average',
        feedback: 'Safe but limited growth!',
        explanation: 'FDs are safe but offer 6-7% returns, barely beating inflation. With a 5-year horizon, you could take some calculated risk for better returns!',
        xp: 2,
        coins: 30
      },
      {
        text: 'Invest all ₹20,000 in one hot stock',
        icon: '🎲',
        outcome: 'poor',
        feedback: 'Too risky!',
        explanation: 'Never put all eggs in one basket! Individual stocks are risky. Diversification is key to managing investment risk.',
        xp: 1,
        coins: 15
      },
      {
        text: 'Diversify: 60% equity mutual funds, 30% debt, 10% emergency cash',
        icon: '🎯',
        outcome: 'good',
        feedback: 'Excellent strategy!',
        explanation: 'Perfect diversification! Long-term equity for growth, debt for stability, and emergency cash for safety. This balances risk and return!',
        xp: 5,
        coins: 50
      }
    ]
  },
  {
    id: 'scenario4',
    title: 'Emergency Expense',
    story: 'Your laptop broke and needs ₹15,000 repair for work. You have ₹8,000 in savings and ₹10,000 on credit card. How do you handle this?',
    character: '💻',
    characterBg: 'from-yellow-400 to-orange-500',
    choices: [
      {
        text: 'Use credit card for full ₹15,000',
        icon: '💳',
        outcome: 'poor',
        feedback: 'Expensive choice!',
        explanation: 'Credit card interest (18-36%) will make this repair cost much more! Use your savings first, then supplement if needed.',
        xp: 1,
        coins: 10
      },
      {
        text: 'Skip the repair and borrow friend\'s laptop',
        icon: '🤝',
        outcome: 'average',
        feedback: 'Short-term fix!',
        explanation: 'While saving money is good, delaying necessary work expenses could affect your income. Better to handle it properly.',
        xp: 2,
        coins: 25
      },
      {
        text: 'Use ₹8,000 savings + pay ₹7,000 from next salary',
        icon: '📅',
        outcome: 'good',
        feedback: 'Smart planning!',
        explanation: 'Great! You used savings for emergencies (their purpose!), avoided credit card interest, and planned repayment. Rebuild that emergency fund!',
        xp: 5,
        coins: 50
      }
    ]
  },
  {
    id: 'scenario5',
    title: 'Salary Increment',
    story: 'Congratulations! 🎊 You got a ₹5,000 monthly raise! Your current expenses are comfortable. What\'s your plan for this extra income?',
    character: '🎉',
    characterBg: 'from-pink-400 to-purple-500',
    choices: [
      {
        text: 'Upgrade lifestyle - better apartment, dining out more',
        icon: '🏠',
        outcome: 'poor',
        feedback: 'Lifestyle inflation alert!',
        explanation: 'Lifestyle inflation prevents wealth building. Each raise is a chance to save/invest more, not spend more. Live below your means!',
        xp: 1,
        coins: 15
      },
      {
        text: 'Save it all in savings account',
        icon: '🏦',
        outcome: 'average',
        feedback: 'Safe but not optimal!',
        explanation: 'Saving is good, but savings accounts give low returns. Consider investing for better long-term growth while keeping some for emergencies.',
        xp: 3,
        coins: 35
      },
      {
        text: 'Invest ₹4,000 in SIP, save ₹1,000 for fun',
        icon: '⚖️',
        outcome: 'good',
        feedback: 'Perfect balance!',
        explanation: 'Excellent! You\'re investing 80% for future wealth while allowing 20% for quality of life. This sustainable approach builds long-term prosperity!',
        xp: 5,
        coins: 50
      }
    ]
  }
];
