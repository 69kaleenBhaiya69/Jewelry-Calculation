
export interface PurityConfig {
  label: string;
  rate: number;
}

export interface CalculationResult {
  purity: string;
  weight: number;
  goldValue: number;
  labourValue: number;
  fixedCosts: number;
  subtotalBeforeFees: number;
  marketplaceFees: number;
  priceAfterFees: number;
  profitAmount: number;
  basePriceUSD: number;
  finalPriceUSD: number;
}
