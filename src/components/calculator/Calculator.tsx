import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ResultsChart } from './ResultsChart';
import { ResultsSummary } from './ResultsSummary';

export function Calculator() {
  const [formData, setFormData] = useState({
    initialInvestment: 10000,
    monthlyInvestment: 1000,
    investmentPeriod: 10,
    expectedReturn: 12,
  });

  const [showResults, setShowResults] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }));
    setShowResults(true);
  };

  const calculateResults = () => {
    const monthlyRate = formData.expectedReturn / 12 / 100;
    const months = formData.investmentPeriod * 12;
    let futureValue = formData.initialInvestment;

    for (let i = 0; i < months; i++) {
      futureValue = (futureValue + formData.monthlyInvestment) * (1 + monthlyRate);
    }

    const totalInvested = formData.initialInvestment + (formData.monthlyInvestment * months);
    const totalReturns = futureValue - totalInvested;

    return {
      futureValue,
      totalInvested,
      totalReturns,
    };
  };

  const results = calculateResults();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="text-center space-y-2">
        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Mutual Fund Calculator
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Plan your financial future with our advanced mutual fund calculator. Estimate your potential returns and make informed investment decisions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gray-800/50 backdrop-blur-xl p-6 rounded-2xl border border-gray-700"
        >
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Initial Investment (₹)
              </label>
              <input
                type="number"
                name="initialInvestment"
                value={formData.initialInvestment}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                min="0"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Monthly Investment (₹)
              </label>
              <input
                type="number"
                name="monthlyInvestment"
                value={formData.monthlyInvestment}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                min="0"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Investment Period (Years)
              </label>
              <input
                type="number"
                name="investmentPeriod"
                value={formData.investmentPeriod}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                min="1"
                max="30"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Expected Annual Return (%)
              </label>
              <input
                type="number"
                name="expectedReturn"
                value={formData.expectedReturn}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                min="1"
                max="30"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          {showResults && (
            <>
              <ResultsSummary results={results} />
              <ResultsChart
                data={[
                  { name: 'Total Invested', value: results.totalInvested },
                  { name: 'Total Returns', value: results.totalReturns },
                ]}
              />
            </>
          )}
        </motion.div>
      </div>

      <div className="text-center text-sm text-gray-400 mt-8">
        <p>
          Note: The calculations are based on assumed constant returns and do not account for market volatility or taxes.
        </p>
      </div>
    </motion.div>
  );
}