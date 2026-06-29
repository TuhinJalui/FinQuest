export interface Question {
  question: string;
  options: string[];
  correct: number;
  difficulty: 'easy' | 'medium' | 'hard';
  explanation?: string;
}

export interface Lesson {
  title: string;
  content: string;
  tip: string;
  icon: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  goal: string;
  skillLevel: string;
  color: string;
  icon: string;
  lessons: Lesson[];
  questions: Question[];
}

export const modules: Module[] = [
  {
    id: 'module1',
    title: 'Introduction to Money & Financial Basics',
    description: 'Build fundamental understanding of money, income, expenses, and smart decision-making',
    goal: 'Understand money fundamentals and smart financial decision-making',
    skillLevel: 'Beginner',
    color: 'from-purple-400 to-purple-600',
    icon: '💡',
    lessons: [
      {
        title: 'What is Money?',
        content: 'Money is a medium of exchange that allows us to buy goods and services. It holds value because everyone agrees it does, making trade easier than bartering.',
        tip: 'Money is a tool - use it wisely to achieve your goals!',
        icon: '💰'
      },
      {
        title: 'Understanding Income vs Expenses',
        content: 'Income is money you receive (salary, allowance, gifts). Expenses are what you spend. The key to financial success is earning more than you spend.',
        tip: 'Track both income and expenses to stay in control!',
        icon: '📊'
      },
      {
        title: 'The Concept of Inflation',
        content: 'Inflation means prices increase over time. ₹100 today can buy less than ₹100 could buy 10 years ago. That\'s why saving and investing is important.',
        tip: 'Invest your money to beat inflation and grow wealth!',
        icon: '📈'
      },
      {
        title: 'Needs vs Wants',
        content: 'Needs are essentials like food, shelter, and education. Wants are nice-to-haves like eating out or new gadgets. Prioritize needs first!',
        tip: 'Ask yourself: "Do I need this or just want it?"',
        icon: '🤔'
      },
      {
        title: 'The Value of Saving Early',
        content: 'Starting to save early gives your money more time to grow through compound interest. Even small amounts saved today can become large sums tomorrow.',
        tip: 'The best time to start saving was yesterday. The next best time is today!',
        icon: '🌱'
      }
    ],
    questions: [
      // Easy Questions (5)
      {
        question: 'What is the primary function of money?',
        options: ['To look pretty', 'Medium of exchange for goods and services', 'To collect dust', 'Only for saving'],
        correct: 1,
        difficulty: 'easy',
        explanation: 'Money serves as a medium of exchange, making transactions easier than bartering.'
      },
      {
        question: 'Which of these is a "need"?',
        options: ['Latest smartphone', 'Designer clothes', 'Food and shelter', 'Gaming console'],
        correct: 2,
        difficulty: 'easy',
        explanation: 'Food and shelter are basic necessities, while the others are wants.'
      },
      {
        question: 'What does income mean?',
        options: ['Money you spend', 'Money you receive', 'Money you borrow', 'Money you lose'],
        correct: 1,
        difficulty: 'easy',
        explanation: 'Income is the money you earn or receive from various sources.'
      },
      {
        question: 'What are expenses?',
        options: ['Money saved', 'Money spent on goods and services', 'Money invested', 'Money borrowed'],
        correct: 1,
        difficulty: 'easy',
        explanation: 'Expenses represent all the money you spend on purchases and services.'
      },
      {
        question: 'Why is it important to save money?',
        options: ['For future needs and emergencies', 'To impress friends', 'No reason', 'Only when old'],
        correct: 0,
        difficulty: 'easy',
        explanation: 'Saving prepares you for unexpected expenses and helps achieve future goals.'
      },
      // Medium Questions (5)
      {
        question: 'What is inflation?',
        options: ['Decrease in prices', 'Increase in prices over time', 'Your income growing', 'Saving money'],
        correct: 1,
        difficulty: 'medium',
        explanation: 'Inflation is the rate at which the general level of prices increases, reducing purchasing power.'
      },
      {
        question: 'If you earn ₹10,000 and spend ₹12,000, what is your financial situation?',
        options: ['Surplus', 'Deficit', 'Balanced', 'Profitable'],
        correct: 1,
        difficulty: 'medium',
        explanation: 'Spending more than you earn creates a deficit, which can lead to debt.'
      },
      {
        question: 'Which statement is true about starting to save early?',
        options: ['It doesn\'t matter when you start', 'Early saving gives more time for compound growth', 'Only save when you\'re old', 'Saving early is a waste'],
        correct: 1,
        difficulty: 'medium',
        explanation: 'Starting early leverages compound interest, significantly growing your wealth over time.'
      },
      {
        question: 'What should you do first when you receive money?',
        options: ['Spend it all', 'Save a portion first', 'Lend it to friends', 'Hide it under the bed'],
        correct: 1,
        difficulty: 'medium',
        explanation: 'Pay yourself first by saving before spending - this ensures consistent wealth building.'
      },
      {
        question: 'How does inflation affect your savings?',
        options: ['Increases the value', 'Reduces purchasing power', 'No effect', 'Doubles the money'],
        correct: 1,
        difficulty: 'medium',
        explanation: 'Inflation reduces what your saved money can buy unless it grows faster than inflation.'
      },
      // Hard Questions (5)
      {
        question: 'If inflation is 6% per year, approximately how much will a ₹100 item cost in 12 years?',
        options: ['₹150', '₹180', '₹200', '₹250'],
        correct: 2,
        difficulty: 'hard',
        explanation: 'Using the rule of 72 (72÷6=12), money doubles in 12 years, so prices roughly double too.'
      },
      {
        question: 'Which financial decision demonstrates the best understanding of opportunity cost?',
        options: ['Buying anything you want', 'Choosing to invest ₹5000 instead of spending on non-essentials', 'Spending all income immediately', 'Never saving money'],
        correct: 1,
        difficulty: 'hard',
        explanation: 'Opportunity cost means choosing the option with the best long-term value - investing over frivolous spending.'
      },
      {
        question: 'What is the relationship between time and wealth building?',
        options: ['No relationship', 'Linear - wealth grows steadily', 'Exponential - compound growth accelerates over time', 'Inverse - time reduces wealth'],
        correct: 2,
        difficulty: 'hard',
        explanation: 'Due to compound interest, wealth grows exponentially - the longer you invest, the faster it grows.'
      },
      {
        question: 'If your income increases by 20% but inflation is 15%, what is your real income growth?',
        options: ['20%', '15%', '5%', '35%'],
        correct: 2,
        difficulty: 'hard',
        explanation: 'Real income growth = Nominal growth (20%) - Inflation (15%) = 5%'
      },
      {
        question: 'Which scenario best demonstrates distinguishing needs from wants?',
        options: ['Buying expensive coffee daily', 'Choosing nutritious food over branded snacks', 'Purchasing latest gadgets first', 'Spending on entertainment before rent'],
        correct: 1,
        difficulty: 'hard',
        explanation: 'Prioritizing nutrition (need) over branded items (want) shows financial maturity.'
      }
    ]
  },
  {
    id: 'module2',
    title: 'Budgeting & Money Management',
    description: 'Learn to plan, track, and manage your income effectively',
    goal: 'Master budgeting techniques and expense tracking',
    skillLevel: 'Beginner-Intermediate',
    color: 'from-green-400 to-green-600',
    icon: '📊',
    lessons: [
      {
        title: 'The 50/30/20 Rule',
        content: '50% of income for needs (rent, food, utilities), 30% for wants (entertainment, hobbies), and 20% for savings and debt repayment. This simple rule balances present needs with future security.',
        tip: 'Start with this rule and adjust based on your situation!',
        icon: '⚖️'
      },
      {
        title: 'Creating a Personal Budget',
        content: 'List all income sources and expenses. Set spending limits for each category. Track actual spending against your budget monthly to stay on track.',
        tip: 'A budget isn\'t restrictive - it\'s freedom from financial stress!',
        icon: '📝'
      },
      {
        title: 'Expense Tracking',
        content: 'Write down every purchase for a month. You\'ll discover where money actually goes. Small daily expenses add up! Use apps or a simple notebook.',
        tip: 'Track expenses daily - waiting makes you forget small purchases!',
        icon: '🔍'
      },
      {
        title: 'Emergency Fund Basics',
        content: 'An emergency fund is 3-6 months of expenses saved for unexpected situations like medical emergencies or job loss. Start with ₹1000 and build gradually.',
        tip: 'Your emergency fund = peace of mind during tough times!',
        icon: '🛡️'
      },
      {
        title: 'Fixed vs Variable Expenses',
        content: 'Fixed expenses stay the same monthly (rent, subscriptions). Variable expenses change (groceries, entertainment). Budget for fixed first, then allocate remaining to variable expenses.',
        tip: 'Control variable expenses to increase savings!',
        icon: '📌'
      }
    ],
    questions: [
      // Easy Questions (5)
      {
        question: 'What does the 50/30/20 rule suggest for needs?',
        options: ['20% of income', '30% of income', '50% of income', '70% of income'],
        correct: 2,
        difficulty: 'easy'
      },
      {
        question: 'What is a budget?',
        options: ['A plan for spending money', 'A type of bank account', 'A loan', 'A savings target'],
        correct: 0,
        difficulty: 'easy'
      },
      {
        question: 'How many months of expenses should an emergency fund cover?',
        options: ['1 month', '3-6 months', '10 years', '1 week'],
        correct: 1,
        difficulty: 'easy'
      },
      {
        question: 'Which is a fixed expense?',
        options: ['Groceries', 'Entertainment', 'Monthly rent', 'Clothing'],
        correct: 2,
        difficulty: 'easy'
      },
      {
        question: 'Why is expense tracking important?',
        options: ['To waste time', 'To know where your money goes', 'It\'s not important', 'Only for accountants'],
        correct: 1,
        difficulty: 'easy'
      },
      // Medium Questions (5)
      {
        question: 'If your monthly income is ₹30,000, how much should you save according to 50/30/20 rule?',
        options: ['₹3,000', '₹6,000', '₹9,000', '₹15,000'],
        correct: 1,
        difficulty: 'medium',
        explanation: '20% of ₹30,000 = ₹6,000 for savings'
      },
      {
        question: 'What should you do if your expenses exceed your income?',
        options: ['Borrow money', 'Reduce wants and unnecessary needs', 'Ignore it', 'Stop tracking'],
        correct: 1,
        difficulty: 'medium'
      },
      {
        question: 'Which expense category can be most easily reduced?',
        options: ['Rent', 'Loan EMI', 'Wants/discretionary spending', 'Insurance'],
        correct: 2,
        difficulty: 'medium'
      },
      {
        question: 'What is the first step in creating a budget?',
        options: ['Start spending less', 'List all income and expenses', 'Open a savings account', 'Buy a planner'],
        correct: 1,
        difficulty: 'medium'
      },
      {
        question: 'How often should you review your budget?',
        options: ['Never', 'Every 5 years', 'Monthly', 'Only when broke'],
        correct: 2,
        difficulty: 'medium'
      },
      // Hard Questions (5)
      {
        question: 'You earn ₹50,000/month. After 50/30/20 allocation, you want to save for a ₹2L vacation. How many months minimum?',
        options: ['10 months', '15 months', '20 months', '25 months'],
        correct: 2,
        difficulty: 'hard',
        explanation: '20% of ₹50,000 = ₹10,000/month. ₹2L ÷ ₹10,000 = 20 months'
      },
      {
        question: 'If your fixed expenses are ₹20,000 and you earn ₹35,000, what\'s the maximum for wants (30/20 rule)?',
        options: ['₹10,500', '₹9,000', '₹7,000', '₹15,000'],
        correct: 1,
        difficulty: 'hard',
        explanation: 'Remaining: ₹15,000. Using 30/20 split of remaining: ₹15,000 × 30/(30+20) = ₹9,000'
      },
      {
        question: 'Which budgeting method is most effective for variable income earners?',
        options: ['50/30/20 rule strictly', 'Zero-based budgeting', 'Percentage of lowest month income', 'No budgeting needed'],
        correct: 2,
        difficulty: 'hard',
        explanation: 'Budget based on your lowest expected income to ensure you can always cover expenses.'
      },
      {
        question: 'What is lifestyle inflation and why is it problematic?',
        options: ['Good - shows success', 'Spending more as income rises, preventing savings growth', 'Only affects rich people', 'Not a real concept'],
        correct: 1,
        difficulty: 'hard'
      },
      {
        question: 'If you save ₹5,000/month for 12 months at 6% annual interest (compounded monthly), approximately how much will you have?',
        options: ['₹60,000', '₹61,500', '₹63,000', '₹65,000'],
        correct: 1,
        difficulty: 'hard',
        explanation: 'With monthly compound interest, you\'ll have slightly more than ₹60,000 + interest ≈ ₹61,500'
      }
    ]
  },
  {
    id: 'module3',
    title: 'Saving and Interest',
    description: 'Discover how savings grow and why early saving matters',
    goal: 'Understand compound interest and the power of consistent saving',
    skillLevel: 'Beginner-Intermediate',
    color: 'from-blue-400 to-blue-600',
    icon: '💰',
    lessons: [
      {
        title: 'Simple vs Compound Interest',
        content: 'Simple interest is calculated only on principal. Compound interest is calculated on principal + accumulated interest. Compound interest makes your money grow exponentially!',
        tip: 'Always choose compound interest for savings and investments!',
        icon: '📈'
      },
      {
        title: 'Importance of Saving Early',
        content: 'Time is your biggest asset. Starting at 25 vs 35 can mean lakhs more by retirement due to compound interest. Don\'t wait to start saving!',
        tip: 'Even ₹500/month at 25 beats ₹2000/month at 35!',
        icon: '⏰'
      },
      {
        title: 'Power of Consistency',
        content: 'Regular monthly investments (SIPs) average out market volatility and build discipline. Consistency beats timing the market!',
        tip: 'Set up automatic savings - consistency is key to wealth!',
        icon: '🎯'
      },
      {
        title: 'Saving vs Investing',
        content: 'Saving is keeping money safe (bank accounts, FDs). Investing is putting money to work for higher returns (stocks, mutual funds). You need both!',
        tip: 'Save for short-term, invest for long-term goals!',
        icon: '⚡'
      },
      {
        title: 'The Rule of 72',
        content: 'Divide 72 by interest rate to know how long it takes to double your money. At 12% return, 72÷12 = 6 years to double!',
        tip: 'Use Rule of 72 to quickly estimate investment growth!',
        icon: '🧮'
      }
    ],
    questions: [
      // Easy Questions (5)
      {
        question: 'What is compound interest?',
        options: ['Interest on principal only', 'Interest on principal and accumulated interest', 'No interest', 'Fixed return'],
        correct: 1,
        difficulty: 'easy'
      },
      {
        question: 'What does SIP stand for?',
        options: ['Systematic Investment Plan', 'Simple Interest Plan', 'Savings Income Plan', 'Stock Investment Portfolio'],
        correct: 0,
        difficulty: 'easy'
      },
      {
        question: 'Which grows faster over time?',
        options: ['Simple interest', 'Compound interest', 'Both same', 'Neither grows'],
        correct: 1,
        difficulty: 'easy'
      },
      {
        question: 'What is the Rule of 72 used for?',
        options: ['Calculate taxes', 'Estimate time to double money', 'Set interest rates', 'Budget planning'],
        correct: 1,
        difficulty: 'easy'
      },
      {
        question: 'Why is starting early important for savings?',
        options: ['It\'s not important', 'More time for compound growth', 'To impress others', 'Banks require it'],
        correct: 1,
        difficulty: 'easy'
      },
      // Medium Questions (5)
      {
        question: 'If you invest ₹10,000 at 10% annual compound interest, how much after 2 years?',
        options: ['₹11,000', '₹12,000', '₹12,100', '₹13,000'],
        correct: 2,
        difficulty: 'medium',
        explanation: 'Year 1: ₹11,000. Year 2: ₹11,000 × 1.10 = ₹12,100'
      },
      {
        question: 'Using Rule of 72, at 8% return, how long to double your money?',
        options: ['6 years', '8 years', '9 years', '12 years'],
        correct: 2,
        difficulty: 'medium',
        explanation: '72 ÷ 8 = 9 years'
      },
      {
        question: 'What is the main benefit of SIP investments?',
        options: ['Guaranteed returns', 'Rupee cost averaging', 'No risk', 'Tax exemption'],
        correct: 1,
        difficulty: 'medium'
      },
      {
        question: 'Which is better for a 20-year goal?',
        options: ['Savings account', 'Fixed deposit', 'Equity mutual funds', 'Cash at home'],
        correct: 2,
        difficulty: 'medium'
      },
      {
        question: 'What happens if you start investing 10 years late?',
        options: ['No difference', 'Significantly less wealth due to lost compounding', 'Slightly less', 'You gain more'],
        correct: 1,
        difficulty: 'medium'
      },
      // Hard Questions (5)
      {
        question: 'Person A invests ₹5000/month from age 25-35 (10 yrs) then stops. Person B invests ₹5000/month from age 35-60 (25 yrs). At 12% return, who has more at 60?',
        options: ['Person A', 'Person B', 'Equal', 'Cannot determine'],
        correct: 0,
        difficulty: 'hard',
        explanation: 'Person A benefits from 25 years more compounding time, despite investing for fewer years!'
      },
      {
        question: 'At 6% inflation and 8% savings account interest, what\'s your real return?',
        options: ['8%', '6%', '2%', '14%'],
        correct: 2,
        difficulty: 'hard',
        explanation: 'Real return = Nominal return (8%) - Inflation (6%) = 2%'
      },
      {
        question: 'You invest ₹1L at 10% for 5 years compounded annually. What\'s the final amount (approximately)?',
        options: ['₹1.5L', '₹1.61L', '₹1.75L', '₹2L'],
        correct: 1,
        difficulty: 'hard',
        explanation: '₹1L × (1.10)^5 = ₹1,61,051'
      },
      {
        question: 'What is the effect of increasing SIP amount by 10% annually vs fixed SIP over 20 years?',
        options: ['No significant difference', 'Approximately 50% more corpus', 'Doubles the corpus', 'Reduces returns'],
        correct: 1,
        difficulty: 'hard'
      },
      {
        question: 'If you need ₹1 crore in 30 years and can earn 12% annually, approximately how much monthly SIP needed?',
        options: ['₹5,000', '₹8,500', '₹12,000', '₹15,000'],
        correct: 1,
        difficulty: 'hard',
        explanation: 'Using SIP formula, approximately ₹8,500/month for 30 years at 12% ≈ ₹1 crore'
      }
    ]
  },
  {
    id: 'module4',
    title: 'Investing & Wealth Building',
    description: 'Learn about investments and risk-return principles',
    goal: 'Understand different asset classes and build a diversified portfolio',
    skillLevel: 'Intermediate',
    color: 'from-orange-400 to-orange-600',
    icon: '📈',
    lessons: [
      {
        title: 'What is Investing?',
        content: 'Investing means putting money into assets that can grow in value over time. Unlike saving, investing involves some risk but offers higher potential returns.',
        tip: 'Don\'t just save - invest to beat inflation and build wealth!',
        icon: '💎'
      },
      {
        title: 'Asset Classes',
        content: 'Stocks (ownership in companies), Bonds (lending money), Mutual Funds (pooled investments), Gold (precious metal), Real Estate, and Crypto. Each has different risk-return profiles.',
        tip: 'Learn about each asset class before investing your money!',
        icon: '🎨'
      },
      {
        title: 'Risk vs Return',
        content: 'Higher potential returns come with higher risk. Stocks are risky but offer high returns long-term. Fixed deposits are safe but offer lower returns. Balance based on your goals!',
        tip: 'Don\'t chase high returns without understanding the risks!',
        icon: '⚖️'
      },
      {
        title: 'Diversification',
        content: 'Don\'t put all eggs in one basket! Spread investments across different asset classes, sectors, and geographies to reduce risk. If one investment falls, others may rise.',
        tip: 'Diversification is the only free lunch in investing!',
        icon: '🗂️'
      },
      {
        title: 'Time Horizon & Compounding',
        content: 'Your investment timeline affects strategy. Long-term (10+ years) allows taking more risk in stocks. Short-term needs debt instruments. Let compounding work its magic over time!',
        tip: 'Time in the market beats timing the market!',
        icon: '⏳'
      }
    ],
    questions: [
      // Easy Questions (5)
      {
        question: 'What is the main goal of investing?',
        options: ['Losing money', 'Growing wealth over time', 'Spending money', 'Keeping money idle'],
        correct: 1,
        difficulty: 'easy'
      },
      {
        question: 'Which asset class represents ownership in a company?',
        options: ['Bonds', 'Stocks', 'Fixed Deposits', 'Gold'],
        correct: 1,
        difficulty: 'easy'
      },
      {
        question: 'What is diversification?',
        options: ['Investing in only one stock', 'Spreading investments across different assets', 'Keeping money in cash', 'Borrowing to invest'],
        correct: 1,
        difficulty: 'easy'
      },
      {
        question: 'Which is generally safer but offers lower returns?',
        options: ['Stocks', 'Cryptocurrency', 'Fixed Deposits', 'Startup investments'],
        correct: 2,
        difficulty: 'easy'
      },
      {
        question: 'What does higher risk usually mean?',
        options: ['Guaranteed loss', 'Potential for higher returns', 'No returns', 'Safe investment'],
        correct: 1,
        difficulty: 'easy'
      },
      // Medium Questions (5)
      {
        question: 'What is a mutual fund?',
        options: ['A type of bank account', 'Pooled money invested professionally', 'Government scheme', 'Insurance policy'],
        correct: 1,
        difficulty: 'medium'
      },
      {
        question: 'For a goal 15 years away, which asset allocation is appropriate?',
        options: ['100% fixed deposits', '70% equity, 30% debt', '100% cash', '100% gold'],
        correct: 1,
        difficulty: 'medium',
        explanation: 'Long time horizon allows higher equity allocation for better growth potential.'
      },
      {
        question: 'What is the relationship between inflation and investment returns?',
        options: ['No relationship', 'Investments should beat inflation to grow real wealth', 'Inflation helps investments', 'Inflation doesn\'t matter'],
        correct: 1,
        difficulty: 'medium'
      },
      {
        question: 'Which investment typically has highest long-term returns?',
        options: ['Savings account', 'Fixed deposit', 'Equity/stocks', 'Gold'],
        correct: 2,
        difficulty: 'medium'
      },
      {
        question: 'What is the benefit of starting to invest early?',
        options: ['No benefit', 'More time for compound growth', 'Less risk', 'Higher interest rates'],
        correct: 1,
        difficulty: 'medium'
      },
      // Hard Questions (5)
      {
        question: 'A portfolio has 60% stocks (expected 12% return) and 40% bonds (expected 6% return). What\'s the expected portfolio return?',
        options: ['9%', '9.6%', '10%', '12%'],
        correct: 1,
        difficulty: 'hard',
        explanation: '(0.60 × 12%) + (0.40 × 6%) = 7.2% + 2.4% = 9.6%'
      },
      {
        question: 'What is the primary purpose of rebalancing a portfolio?',
        options: ['To pay more fees', 'Maintain desired asset allocation and risk level', 'Buy more stocks', 'Sell everything'],
        correct: 1,
        difficulty: 'hard'
      },
      {
        question: 'If stock market falls 30%, what must a diversified portfolio with 60% stocks, 40% bonds (unchanged) fall?',
        options: ['30%', '18%', '10%', '40%'],
        correct: 1,
        difficulty: 'hard',
        explanation: 'Only stock portion affected: 60% × 30% = 18% overall portfolio decline'
      },
      {
        question: 'What is the Sharpe Ratio used for?',
        options: ['Calculate taxes', 'Measure risk-adjusted returns', 'Determine company value', 'Set interest rates'],
        correct: 1,
        difficulty: 'hard'
      },
      {
        question: 'Why is rupee cost averaging beneficial in SIPs?',
        options: ['Guaranteed profits', 'Buy more units when prices low, fewer when high', 'No benefit', 'Eliminates all risk'],
        correct: 1,
        difficulty: 'hard',
        explanation: 'Regular investing means you buy more units at lower prices and fewer at higher prices, averaging your cost.'
      }
    ]
  },
  {
    id: 'module5',
    title: 'Credit, Loans & Debt Management',
    description: 'Learn responsible borrowing and credit usage',
    goal: 'Master credit management and debt repayment strategies',
    skillLevel: 'Intermediate',
    color: 'from-red-400 to-red-600',
    icon: '💳',
    lessons: [
      {
        title: 'What is Credit?',
        content: 'Credit is borrowed money you promise to repay. Credit cards, loans, and EMIs are forms of credit. Used wisely, credit helps achieve goals. Misused, it leads to debt traps.',
        tip: 'Credit is a tool - use it wisely, not freely!',
        icon: '🎴'
      },
      {
        title: 'Credit Score Explained',
        content: 'A credit score (300-900) shows your creditworthiness. Higher scores (750+) get better loan rates. Built by paying bills on time, low credit utilization, and credit history length.',
        tip: 'A good credit score saves you lakhs in interest over time!',
        icon: '⭐'
      },
      {
        title: 'Types of Loans',
        content: 'Personal loans (unsecured, higher interest), Home loans (secured, lower interest), Education loans (for studies), Car loans. Each has different terms, rates, and purposes.',
        tip: 'Never take a loan for depreciating assets if avoidable!',
        icon: '🏦'
      },
      {
        title: 'Interest and EMIs',
        content: 'EMI (Equated Monthly Installment) = principal + interest paid monthly. Lower EMI means longer tenure and more interest! Use EMI calculators before borrowing.',
        tip: 'Pay more than minimum EMI to save on interest!',
        icon: '💰'
      },
      {
        title: 'Debt Repayment Strategies',
        content: 'Snowball method: pay smallest debts first for motivation. Avalanche method: pay highest interest debt first to save money. Both work - pick what motivates you!',
        tip: 'Becoming debt-free is a marathon, not a sprint!',
        icon: '🎯'
      }
    ],
    questions: [
      // Easy Questions (5)
      {
        question: 'What is a credit score?',
        options: ['Bank balance', 'Measure of creditworthiness', 'Loan amount', 'Interest rate'],
        correct: 1,
        difficulty: 'easy'
      },
      {
        question: 'What is EMI?',
        options: ['Emergency Medical Insurance', 'Equated Monthly Installment', 'Extra Money Income', 'Electronic Money Interface'],
        correct: 1,
        difficulty: 'easy'
      },
      {
        question: 'Which credit score range is considered good?',
        options: ['300-500', '500-650', '750-900', '100-200'],
        correct: 2,
        difficulty: 'easy'
      },
      {
        question: 'What should you do if you can\'t pay credit card bill in full?',
        options: ['Ignore it', 'Pay at least the minimum due', 'Close the card', 'Get another card'],
        correct: 1,
        difficulty: 'easy'
      },
      {
        question: 'Which type of loan typically has lowest interest rate?',
        options: ['Personal loan', 'Credit card debt', 'Home loan', 'Payday loan'],
        correct: 2,
        difficulty: 'easy'
      },
      // Medium Questions (5)
      {
        question: 'What is the minimum due trap?',
        options: ['Paying full amount', 'Paying only minimum leads to high interest accumulation', 'Not using credit card', 'Closing credit card'],
        correct: 1,
        difficulty: 'medium'
      },
      {
        question: 'What is credit utilization and ideal percentage?',
        options: ['100% is best', 'Percentage of credit limit used; below 30% is ideal', 'Doesn\'t matter', 'Only 10%'],
        correct: 1,
        difficulty: 'medium',
        explanation: 'Using less than 30% of your credit limit shows responsible credit usage and improves your score.'
      },
      {
        question: 'In debt snowball method, which debt do you pay first?',
        options: ['Largest debt', 'Highest interest debt', 'Smallest debt', 'Newest debt'],
        correct: 2,
        difficulty: 'medium'
      },
      {
        question: 'What happens if you miss loan EMI payments?',
        options: ['Nothing', 'Credit score drops and penalty charges apply', 'Interest rate decreases', 'Loan is forgiven'],
        correct: 1,
        difficulty: 'medium'
      },
      {
        question: 'Which improves your credit score?',
        options: ['Missing payments', 'Paying bills on time', 'Maxing out credit cards', 'Closing old accounts'],
        correct: 1,
        difficulty: 'medium'
      },
      // Hard Questions (5)
      {
        question: 'A ₹5L loan at 10% for 5 years has EMI of ₹10,624. How much total interest paid?',
        options: ['₹50,000', '₹1,37,440', '₹2,00,000', '₹87,440'],
        correct: 1,
        difficulty: 'hard',
        explanation: 'Total paid = ₹10,624 × 60 months = ₹6,37,440. Interest = ₹6,37,440 - ₹5,00,000 = ₹1,37,440'
      },
      {
        question: 'You have debts: ₹10K at 24% and ₹50K at 12%. Using avalanche method, which to pay first?',
        options: ['₹50K debt', '₹10K debt', 'Both equally', 'Neither'],
        correct: 1,
        difficulty: 'hard',
        explanation: 'Avalanche method prioritizes highest interest rate (24%) regardless of balance.'
      },
      {
        question: 'If you pay ₹15,000 instead of ₹10,000 EMI, what\'s the main benefit?',
        options: ['No benefit', 'Significantly reduced tenure and interest paid', 'Higher credit score immediately', 'Lower EMI next month'],
        correct: 1,
        difficulty: 'hard'
      },
      {
        question: 'What is the effective annual rate if a credit card charges 3% per month?',
        options: ['36%', '40%', '42.6%', '30%'],
        correct: 2,
        difficulty: 'hard',
        explanation: 'Compound monthly: (1.03)^12 - 1 = 42.6% annual rate'
      },
      {
        question: 'You have ₹50K to invest or prepay ₹50K loan at 11% interest. Investment returns 10%. What should you do?',
        options: ['Invest the money', 'Prepay the loan', 'Split equally', 'Keep as cash'],
        correct: 1,
        difficulty: 'hard',
        explanation: 'Prepaying 11% loan gives guaranteed 11% "return" vs risky 10% investment return. Prepay the loan!'
      }
    ]
  }
];
