/**
 * Dynamic Reward Calculation Engine
 *
 * Formula: baseReward x rarityMultiplier x effortScore x timingBonus x streakMultiplier
 */

const BASE_REWARDS = {
  landmark: 10,
  food: 8,
  hidden: 20,
  nature: 12,
  culture: 15,
  shopping: 6,
  nightlife: 8,
  default: 10,
};

/**
 * Map rarity score (1-100) to multiplier (1.0-3.0)
 */
function getRarityMultiplier(rarityScore) {
  return 1.0 + (rarityScore / 100) * 2.0;
}

/**
 * Effort score based on journey progress
 */
function getEffortScore(completedCheckpoints, totalCheckpoints) {
  if (totalCheckpoints === 0) return 1.0;
  const progress = completedCheckpoints / totalCheckpoints;
  // More progress = slightly higher effort reward
  return 1.0 + progress * 0.5;
}

/**
 * Timing bonus — rewards off-peak visits
 */
function getTimingBonus() {
  const hour = new Date().getHours();
  // Early morning (5-8) or late evening (20-23) = bonus
  if (hour >= 5 && hour <= 8) return 1.3;
  if (hour >= 20 && hour <= 23) return 1.2;
  // Peak hours (10-16) = standard
  if (hour >= 10 && hour <= 16) return 1.0;
  return 1.1;
}

/**
 * Streak multiplier — consecutive days of activity
 */
function getStreakMultiplier(streakDays) {
  if (streakDays <= 1) return 1.0;
  if (streakDays <= 3) return 1.1;
  if (streakDays <= 7) return 1.25;
  if (streakDays <= 14) return 1.4;
  return 1.5;
}

/**
 * Calculate full reward for a checkpoint verification
 */
export function calculateReward({
  category = "default",
  rarityScore = 50,
  completedCheckpoints = 0,
  totalCheckpoints = 1,
  streakDays = 0,
}) {
  const base = BASE_REWARDS[category] || BASE_REWARDS.default;
  const rarity = getRarityMultiplier(rarityScore);
  const effort = getEffortScore(completedCheckpoints, totalCheckpoints);
  const timing = getTimingBonus();
  const streak = getStreakMultiplier(streakDays);

  const rawReward = base * rarity * effort * timing * streak;
  const finalReward = Math.round(rawReward * 100) / 100;

  return {
    amount: base,
    multiplier: Math.round(rarity * effort * timing * streak * 100) / 100,
    finalAmount: finalReward,
    breakdown: {
      base,
      rarityMultiplier: Math.round(rarity * 100) / 100,
      effortScore: Math.round(effort * 100) / 100,
      timingBonus: timing,
      streakMultiplier: streak,
    },
  };
}

/**
 * Calculate user level from total tokens
 */
export function calculateLevel(totalTokens) {
  if (totalTokens < 100) return 1;
  if (totalTokens < 500) return 2;
  if (totalTokens < 1500) return 3;
  if (totalTokens < 5000) return 4;
  if (totalTokens < 15000) return 5;
  if (totalTokens < 50000) return 6;
  return 7;
}

/**
 * Level titles
 */
export function getLevelTitle(level) {
  const titles = {
    1: "Wanderer",
    2: "Explorer",
    3: "Pathfinder",
    4: "Trailblazer",
    5: "Navigator",
    6: "Voyager",
    7: "Legend",
  };
  return titles[level] || "Wanderer";
}
