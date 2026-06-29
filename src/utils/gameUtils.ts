// Game utility functions for FinQuest

// Calculate level from XP (each level requires 100 XP more than the previous)
export function calculateLevel(xp: number): number {
  if (xp === 0) return 1;
  
  let level = 1;
  let xpNeeded = 100;
  let totalXp = 0;
  
  while (totalXp + xpNeeded <= xp) {
    totalXp += xpNeeded;
    level++;
    xpNeeded += 50; // Each level requires 50 more XP
  }
  
  return level;
}

// Calculate XP needed for next level
export function getXPForNextLevel(currentLevel: number): number {
  return 100 + (currentLevel - 1) * 50;
}

// Calculate current progress in current level
export function getCurrentLevelProgress(xp: number, currentLevel: number): {
  currentLevelXP: number;
  xpForNextLevel: number;
  progress: number;
  leveledUp?: boolean;
} {
  let totalXpForCurrentLevel = 0;
  
  for (let i = 1; i < currentLevel; i++) {
    totalXpForCurrentLevel += 100 + (i - 1) * 50;
  }
  
  const currentLevelXP = xp - totalXpForCurrentLevel;
  const xpForNextLevel = getXPForNextLevel(currentLevel);
  const progress = Math.min((currentLevelXP / xpForNextLevel) * 100, 100);
  
  return {
    currentLevelXP,
    xpForNextLevel,
    progress
  };
}

// Update streak based on last active date
export function updateStreak(lastActiveDate?: string): number {
  if (!lastActiveDate) return 1;
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const lastActive = new Date(lastActiveDate);
  lastActive.setHours(0, 0, 0, 0);
  
  const diffTime = today.getTime() - lastActive.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  // If last active was today, maintain streak
  if (diffDays === 0) {
    return 0; // No change
  }
  // If last active was yesterday, increment streak
  else if (diffDays === 1) {
    return 1; // Increment by 1
  }
  // If more than 1 day, reset streak
  else {
    return -1; // Reset to 1
  }
}

// Get today's date as string
export function getTodayString(): string {
  return new Date().toISOString().split('T')[0];
}

// Calculate rewards for quiz
export function calculateQuizRewards(score: number, totalQuestions: number): {
  xp: number;
  coins: number;
} {
  const percentage = (score / totalQuestions) * 100;
  
  let xp = 0;
  let coins = 0;
  
  if (percentage >= 90) {
    xp = 100;
    coins = 50;
  } else if (percentage >= 70) {
    xp = 75;
    coins = 35;
  } else if (percentage >= 50) {
    xp = 50;
    coins = 20;
  } else {
    xp = 25;
    coins = 10;
  }
  
  return { xp, coins };
}

// Calculate rewards for completing a module
export function calculateModuleRewards(): {
  xp: number;
  coins: number;
} {
  return {
    xp: 150,
    coins: 75
  };
}