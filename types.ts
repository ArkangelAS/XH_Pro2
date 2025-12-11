export interface CalculationResult {
  totalFee: number;
  breakdown: TierResult[];
  activeTierIndex: number; // 0 for none, 1 for 70-79, 2 for 80-89, 3 for 90+
}

export interface TierResult {
  label: string;
  amount: number;
  formula: string;
  isFull: boolean; // True if this tier is fully saturated
}

export interface ChartDataPoint {
  rate: number;
  fee: number;
  isCurrent: boolean;
}