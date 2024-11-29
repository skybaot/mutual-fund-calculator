import React from 'react';
import { CalculationResult } from '../types/calculator';
import { TrendingUp, PiggyBank, Coins } from 'lucide-react';

interface Props {
  results: CalculationResult;
}

export default function ResultsSummary({ results }: Props) {
  const metrics = [
    {
      label: 'Total Investment',
      value: results.totalInvestment,
      icon: PiggyBank,
      color: 'bg-green-100 text-green-600'
    },
    {
      label: 'Interest Earned',
      value: results.interestEarned,
      icon: Coins,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      label: 'Maturity Value',
      value: results.maturityValue,
      icon: TrendingUp,
      color: 'bg-purple-100 text-purple-600'
    }
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700"
        >
          <div className={`w-10 h-10 rounded-full ${metric.color} flex items-center justify-center mb-3`}>
            <metric.icon size={20} />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">{metric.label}</p>
          <p className="text-xl font-semibold mt-1">
            ₹{metric.value.toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}