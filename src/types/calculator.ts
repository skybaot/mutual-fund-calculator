export type CalculatorType = 'SIP' | 'FD' | 'RD' | 'MF';

export interface CalculationResult {
  totalInvestment: number;
  interestEarned: number;
  maturityValue: number;
  yearlyBreakdown: Array<{
    year: number;
    balance: number;
    interest: number;
    investment: number;
  }>;
}

export interface CalculatorInputs {
  amount: number;
  tenure: number;
  interestRate: number;
  frequency?: 'monthly' | 'yearly';
}