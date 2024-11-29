import { CalculatorType, CalculatorInputs, CalculationResult } from '../types/calculator';

export function calculateInvestment(type: CalculatorType, inputs: CalculatorInputs): CalculationResult {
  switch (type) {
    case 'SIP':
      return calculateSIP(inputs);
    case 'FD':
      return calculateFD(inputs);
    case 'RD':
      return calculateRD(inputs);
    case 'MF':
      return calculateMF(inputs);
  }
}

export function calculateSIP(inputs: CalculatorInputs): CalculationResult {
  const { amount, tenure, interestRate } = inputs;
  const monthlyRate = interestRate / 12 / 100;
  const months = tenure * 12;
  const yearlyBreakdown = [];
  
  let totalInvestment = 0;
  let maturityValue = 0;
  
  for (let month = 1; month <= months; month++) {
    totalInvestment += amount;
    maturityValue = (maturityValue + amount) * (1 + monthlyRate);
    
    if (month % 12 === 0) {
      const year = month / 12;
      yearlyBreakdown.push({
        year,
        balance: maturityValue,
        interest: maturityValue - totalInvestment,
        investment: totalInvestment
      });
    }
  }
  
  return {
    totalInvestment,
    interestEarned: maturityValue - totalInvestment,
    maturityValue,
    yearlyBreakdown
  };
}

export function calculateFD(inputs: CalculatorInputs): CalculationResult {
  const { amount, tenure, interestRate } = inputs;
  const yearlyBreakdown = [];
  
  const maturityValue = amount * Math.pow(1 + interestRate / 100, tenure);
  const interestEarned = maturityValue - amount;
  
  for (let year = 1; year <= tenure; year++) {
    const balance = amount * Math.pow(1 + interestRate / 100, year);
    yearlyBreakdown.push({
      year,
      balance,
      interest: balance - amount,
      investment: amount
    });
  }
  
  return {
    totalInvestment: amount,
    interestEarned,
    maturityValue,
    yearlyBreakdown
  };
}

export function calculateRD(inputs: CalculatorInputs): CalculationResult {
  // Similar to SIP but with quarterly compounding
  const { amount, tenure, interestRate } = inputs;
  const quarterlyRate = interestRate / 4 / 100;
  const months = tenure * 12;
  const yearlyBreakdown = [];
  
  let totalInvestment = 0;
  let maturityValue = 0;
  
  for (let month = 1; month <= months; month++) {
    totalInvestment += amount;
    if (month % 3 === 0) {
      maturityValue = (maturityValue + amount * 3) * (1 + quarterlyRate);
    }
    
    if (month % 12 === 0) {
      const year = month / 12;
      yearlyBreakdown.push({
        year,
        balance: maturityValue,
        interest: maturityValue - totalInvestment,
        investment: totalInvestment
      });
    }
  }
  
  return {
    totalInvestment,
    interestEarned: maturityValue - totalInvestment,
    maturityValue,
    yearlyBreakdown
  };
}

export function calculateMF(inputs: CalculatorInputs): CalculationResult {
  // Similar to SIP but with variable returns
  const { amount, tenure, interestRate } = inputs;
  const monthlyRate = (interestRate + 2) / 12 / 100; // Adding 2% for equity premium
  const months = tenure * 12;
  const yearlyBreakdown = [];
  
  let totalInvestment = 0;
  let maturityValue = 0;
  
  for (let month = 1; month <= months; month++) {
    totalInvestment += amount;
    // Add some randomness to simulate market volatility
    const monthlyVolatility = 1 + (Math.random() * 0.01 - 0.005);
    maturityValue = (maturityValue + amount) * (1 + monthlyRate) * monthlyVolatility;
    
    if (month % 12 === 0) {
      const year = month / 12;
      yearlyBreakdown.push({
        year,
        balance: maturityValue,
        interest: maturityValue - totalInvestment,
        investment: totalInvestment
      });
    }
  }
  
  return {
    totalInvestment,
    interestEarned: maturityValue - totalInvestment,
    maturityValue,
    yearlyBreakdown
  };
}