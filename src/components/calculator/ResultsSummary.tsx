import React from 'react';
import { motion } from 'framer-motion';

interface ResultsSummaryProps {
  results: {
    futureValue: number;
    totalInvested: number;
    totalReturns: number;
  };
}

export function ResultsSummary({ results }: ResultsSummaryProps) {
  const formatValue = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const summaryItems = [
    {
      label: 'Future Value',
      value: formatValue(results.futureValue),
      color: 'from-blue-500 to-purple-500',
    },
    {
      label: 'Total Invested',
      value: formatValue(results.totalInvested),
      color: 'from-indigo-500 to-blue-500',
    },
    {
      label: 'Total Returns',
      value: formatValue(results.totalReturns),
      color: 'from-purple-500 to-pink-500',
    },
  ];

  return (
    <div className="bg-gray-800/50 backdrop-blur-xl p-6 rounded-2xl border border-gray-700">
      <h3 className="text-lg font-medium text-white mb-4">Investment Summary</h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {summaryItems.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700"
          >
            <div className="text-sm text-gray-400">{item.label}</div>
            <div className={`text-xl sm:text-2xl font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
              {item.value}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}