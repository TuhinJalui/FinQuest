# 🏦 FinQuest — Financial Learning App

A gamified financial literacy web application that teaches budgeting, investing, saving, and credit management through interactive modules, real-world scenario simulations, and a virtual coin trading simulator.

---

## 🚀 Features

### 📚 Learning Modules
5 progressive, skill-leveled modules covering core personal finance concepts:

| Module | Topic | Level |
|--------|-------|-------|
| 1 | Introduction to Money & Financial Basics | Beginner |
| 2 | Budgeting & Money Management (50/30/20 Rule) | Beginner–Intermediate |
| 3 | Saving & Interest (Compound Interest, Rule of 72) | Beginner–Intermediate |
| 4 | Investing & Wealth Building | Intermediate |
| 5 | Credit, Loans & Debt Management | Intermediate |

Each module includes:
- Structured lessons with tips and real-world context
- 15 quiz questions across **Easy**, **Medium**, and **Hard** difficulty levels
- Detailed explanations for every answer

Modules are **progressively unlocked** — complete one to unlock the next.

---

### 🎮 Gamification System
- **XP & Leveling** — Earn XP from quizzes and modules; each level requires progressively more XP
- **Coins** — Virtual currency rewarded for completing activities
- **Daily Streak** — Tracks consecutive daily visits to build learning habits
- **Quiz Rewards** — Score-based XP/coin rewards (90%+ = 100 XP & 50 Coins)
- **Module Completion Bonus** — 150 XP & 75 Coins per completed module

---

### 🎭 Scenario-Based Learning
5 real-world financial decision scenarios:

1. **First Salary Dilemma** — How to allocate your first paycheck
2. **Credit Card Offer** — Evaluating and responsibly using credit
3. **Investment Opportunity** — Diversification vs. single-asset risk
4. **Emergency Expense** — Handling unexpected costs wisely
5. **Salary Increment** — Avoiding lifestyle inflation

Each scenario offers 3 choices with instant feedback, explanations, and XP/coin rewards based on the quality of the decision.

---

### 🪙 Virtual Coin Trading Simulator
Practice investing with ₹10,000 virtual capital:

- **3 asset types** — Stock Coin (STC), Crypto Coin (CRP), Gold Coin (GLD)
- **Live price simulation** — Prices update every 5 seconds with random market movements
- **Buy & Sell** — Execute trades and track holdings in real time
- **Investment Summary** — View total invested, current portfolio value, and profit/loss per asset
- **Portfolio Performance Chart** — Animated SVG chart with profit/loss zones and investment baseline
- **AI Tips** — Periodic investing tips displayed during trading
- **Achievement Badges** — Earn badges like *First Trade*, *Diversified Portfolio*, *Big Trader*, and *Profit Maker*
- **Add Money** — Top up virtual balance at any time

---

### 📊 Progress Tracking
- Module completion status
- Quizzes taken and scenarios completed
- XP progress bar with level indicator
- Streak and coin counters on the home dashboard

---

### 👤 User Onboarding
- Splash screen → Login → **Avatar Selection** (`Student`, `Saver`, `Investor`)
- Personalized greeting and stats on the home screen

---

## 🛠️ Tech Stack

| Technology | Usage |
|------------|-------|
| **React 18** | UI framework |
| **TypeScript** | Type safety across all components |
| **Vite** | Build tool and dev server |
| **Tailwind CSS** | Utility-first styling |
| **Radix UI** | Accessible, unstyled component primitives |
| **Framer Motion** (`motion`) | Animations and transitions |
| **Recharts** | Data visualization |
| **Lucide React** | Icon library |
| **Sonner** | Toast notifications |
| **canvas-confetti** | Celebration effects |

---

## 📁 Project Structure

```
FinQuest/
├── src/
│   ├── components/          # All screen and UI components
│   │   ├── HomeScreen.tsx
│   │   ├── LearningModuleScreen.tsx
│   │   ├── QuizScreen.tsx
│   │   ├── ScenarioFlowScreen.tsx
│   │   ├── CoinInvestmentSimulator.tsx
│   │   ├── ProgressScreen.tsx
│   │   ├── ProfileScreen.tsx
│   │   └── ui/              # Reusable Radix-based UI primitives
│   ├── data/
│   │   ├── modules.ts       # All learning modules, lessons & quiz questions
│   │   └── scenarios.ts     # Financial decision scenarios & choices
│   ├── utils/
│   │   └── gameUtils.ts     # XP, leveling, streak, and reward logic
│   ├── App.tsx              # Root component and screen navigation state
│   └── main.tsx             # App entry point
├── index.html
├── package.json
└── vite.config.ts
```

---

## 🏃 Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

### Build for Production

```bash
npm run build
```

---

## 🎨 Design Reference

Original Figma design: [FinQuest Financial Learning App](https://www.figma.com/design/IAktShYCkUMI83vVThGGNR/FinQuest-Financial-Learning-App)

---

