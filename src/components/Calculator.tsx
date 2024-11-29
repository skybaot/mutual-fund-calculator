import React, { useState } from 'react';
import { Calculator, DollarSign, Percent, Calendar } from 'lucide-react';
import { CalculatorInputs } from '../types/calculator';
import { calculateSIP, calculateFD } from '../utils/calculations';
import ResultsChart from './ResultsChart';
import ResultsSummary from './ResultsSummary';

const calculatorTypes = ['SIP', 'FD', 'RD', 'MF'] as const;
type CalculatorType = typeof calculatorTypes[number];

export default function CalculatorComponent() {
  const [activeCalculator, setActiveCalculator] = useState<CalculatorType>('SIP');
  const [inputs, setInputs] = useState<CalculatorInputs>({
    amount: 5000,
    tenure: 5,
    interestRate: 12,
    frequency: 'monthly'
  });

  const handleCalculate = () => {
    const result = activeCalculator === 'SIP' 
      ? calculateSIP(inputs)
      : calculateFD(inputs);
    return result;
  };

  const results = handleCalculate();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg p-6 dark:bg-gray-800">
        <div className="grid grid-cols-4 gap-4 mb-8">
          {calculatorTypes.map((type) => (
            <button
              key={type}
              onClick={() => setActiveCalculator(type)}
              className={`p-4 rounded-lg flex items-center justify-center gap-2 transition-all
                ${activeCalculator === type 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
                }`}
            >
              <Calculator size={20} />
              <span className="font-medium">{type}</span>
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <div className="flex items-center gap-2">
                  <DollarSign size={16} />
                  Investment Amount
                </div>
              </label>
              <input
                type="number"
                value={inputs.amount}
                onChange={(e) => setInputs({ ...inputs, amount: Number(e.target.value) })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  Tenure (Years)
                </div>
              </label>
              <input
                type="number"
                value={inputs.tenure}
                onChange={(e) => setInputs({ ...inputs, tenure: Number(e.target.value) })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <div className="flex items-center gap-2">
                  <Percent size={16} />
                  Interest Rate (%)
                </div>
              </label>
              <input
                type="number"
                value={inputs.interestRate}
                onChange={(e) => setInputs({ ...inputs, interestRate: Number(e.target.value) })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="space-y-6">
            <ResultsChart data={results.yearlyBreakdown} />
            <ResultsSummary results={results} />
          </div>
        </div>
      </div>
    </div>
  );
}