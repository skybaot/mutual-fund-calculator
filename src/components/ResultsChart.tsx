import React from 'react';
import { CalculationResult } from '../types/calculator';

interface Props {
  data: CalculationResult['yearlyBreakdown'];
}

export default function ResultsChart({ data }: Props) {
  const maxBalance = Math.max(...data.map(d => d.balance));
  
  return (
    <div className="h-64 flex items-end gap-2">
      {data.map((item, index) => (
        <div
          key={index}
          className="flex-1 flex flex-col items-center group relative"
        >
          <div className="w-full flex flex-col justify-end h-full">
            <div
              style={{ height: `${(item.balance / maxBalance) * 100}%` }}
              className="bg-blue-500 rounded-t-sm transition-all group-hover:bg-blue-600"
            />
          </div>
          <span className="text-xs mt-2 text-gray-600 dark:text-gray-400">
            Year {item.year}
          </span>
          
          <div className="absolute bottom-full mb-2 bg-gray-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
            Balance: ₹{item.balance.toLocaleString()}
            <br />
            Interest: ₹{item.interest.toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
}