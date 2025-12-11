import { CalculationResult, TierResult } from './types';

export const BASE_PRICE = 1.5;

export const calculateFee = (rate: number, people: number): CalculationResult => {
  const tiers: TierResult[] = [];
  let totalFee = 0;
  let activeTierIndex = 0;

  // Constants
  const TIER_1_START = 70;
  const TIER_2_START = 80;
  const TIER_3_START = 90;

  // Helper to format currency in formula
  const fmt = (n: number) => n.toFixed(2);
  const pct = (n: number) => `${n.toFixed(1)}%`;

  // Tier 1 Calculation (70% - 79%)
  // Logic: 1.5 * 2 * People * (Rate - 70%)
  if (rate > TIER_1_START) {
    const tier1Coef = 2;
    // Cap rate contribution at 10% (from 70 to 80) if rate goes higher
    const rateInTier1 = Math.min(rate, TIER_2_START) - TIER_1_START;
    const rateDecimal = rateInTier1 / 100;
    
    const tier1Amount = BASE_PRICE * tier1Coef * people * rateDecimal;
    
    tiers.push({
      label: '70% - 79% 区间',
      amount: tier1Amount,
      formula: `1.5 × 2 × ${people}人 × ${pct(rateInTier1)}`,
      isFull: rate >= TIER_2_START
    });

    totalFee += tier1Amount;
    activeTierIndex = 1;
  }

  // Tier 2 Calculation (80% - 89%)
  // Logic: Previous + 1.5 * 3 * People * (Rate - 80%)
  if (rate > TIER_2_START) {
    const tier2Coef = 3;
    const rateInTier2 = Math.min(rate, TIER_3_START) - TIER_2_START;
    const rateDecimal = rateInTier2 / 100;

    const tier2Amount = BASE_PRICE * tier2Coef * people * rateDecimal;

    tiers.push({
      label: '80% - 89% 区间',
      amount: tier2Amount,
      formula: `1.5 × 3 × ${people}人 × ${pct(rateInTier2)}`,
      isFull: rate >= TIER_3_START
    });

    totalFee += tier2Amount;
    activeTierIndex = 2;
  }

  // Tier 3 Calculation (90% - 100%)
  // Logic: Previous + 1.5 * 4 * People * (Rate - 90%)
  if (rate > TIER_3_START) {
    const tier3Coef = 4;
    const rateInTier3 = rate - TIER_3_START;
    const rateDecimal = rateInTier3 / 100;

    const tier3Amount = BASE_PRICE * tier3Coef * people * rateDecimal;

    tiers.push({
      label: '90% - 100% 区间',
      amount: tier3Amount,
      formula: `1.5 × 4 × ${people}人 × ${pct(rateInTier3)}`,
      isFull: false
    });

    totalFee += tier3Amount;
    activeTierIndex = 3;
  }

  return {
    totalFee,
    breakdown: tiers,
    activeTierIndex
  };
};

export const generateChartData = (people: number, currentRate: number) => {
  const data = [];
  // Generate points from 65% to 100% to show the curve
  for (let r = 65; r <= 105; r += 1) {
    const result = calculateFee(Math.min(r, 100), people);
    data.push({
      rate: r,
      fee: result.totalFee,
      isCurrent: Math.abs(r - currentRate) < 0.5
    });
  }
  return data;
};