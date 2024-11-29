import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator as CalcIcon, TrendingUp, PiggyBank, Clock } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface CalculatorInputs {
  initialInvestment: number;
  monthlyInvestment: number;
  years: number;
  expectedReturn: number;
}

export function Calculator() {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    initialInvestment: 10000,
    monthlyInvestment: 5000,
    years: 10,
    expectedReturn: 12,
  });

  const [showResults, setShowResults] = useState(false);

  const calculateReturns = () => {
    const monthlyRate = inputs.expectedReturn / 12 / 100;
    const totalMonths = inputs.years * 12;
    let balance = inputs.initialInvestment;
    
    const data = [];
    
    for (let month = 0; month <= totalMonths; month++) {
      data.push({
        month,
        balance: Math.round(balance),
      });
      balance = (balance + inputs.monthlyInvestment) * (1 + monthlyRate);
    }
    
    return data;
  };

  const data = calculateReturns();
  const finalAmount = data[data.length - 1].balance;
  const totalInvestment = inputs.initialInvestment + (inputs.monthlyInvestment * inputs.years * 12);
  const totalReturns = finalAmount - totalInvestment;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
          Mutual Fund Calculator
        </h1>
        <p className="text-lg md:text-xl text-gray-300">
          Plan your investments and visualize your wealth growth
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Calculator Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
        >
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Initial Investment (₹)
              </label>
              <input
                type="number"
                value={inputs.initialInvestment}
                onChange={(e) => setInputs({ ...inputs, initialInvestment: Number(e.target.value) })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Monthly Investment (₹)
              </label>
              <input
                type="number"
                value={inputs.monthlyInvestment}
                onChange={(e) => setInputs({ ...inputs, monthlyInvestment: Number(e.target.value) })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Time Period (Years)
              </label>
              <input
                type="number"
                value={inputs.years}
                onChange={(e) => setInputs({ ...inputs, years: Number(e.target.value) })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Expected Return (% per year)
              </label>
              <input
                type="number"
                value={inputs.expectedReturn}
                onChange={(e) => setInputs({ ...inputs, expectedReturn: Number(e.target.value) })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              />
            </div>

            <button
              onClick={() => setShowResults(true)}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg px-4 py-3 font-medium hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Calculate Returns
            </button>
          </div>
        </motion.div>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-indigo-500/20">
                  <PiggyBank className="w-5 h-5 text-indigo-400" />
                </div>
                <h3 className="text-sm font-medium text-gray-300">
                  Total Investment
                </h3>
              </div>
              <p className="text-2xl font-bold text-white">
                {formatCurrency(totalInvestment)}
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-purple-500/20">
                  <TrendingUp className="w-5 h-5 text-purple-400" />
                </div>
                <h3 className="text-sm font-medium text-gray-300">
                  Total Returns
                </h3>
              </div>
              <p className="text-2xl font-bold text-white">
                {formatCurrency(totalReturns)}
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-green-500/20">
                  <CalcIcon className="w-5 h-5 text-green-400" />
                </div>
                <h3 className="text-sm font-medium text-gray-300">
                  Final Amount
                </h3>
              </div>
              <p className="text-2xl font-bold text-white">
                {formatCurrency(finalAmount)}
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-orange-500/20">
                  <Clock className="w-5 h-5 text-orange-400" />
                </div>
                <h3 className="text-sm font-medium text-gray-300">
                  Investment Period
                </h3>
              </div>
              <p className="text-2xl font-bold text-white">
                {inputs.years} Years
              </p>
            </div>
          </div>

          {/* Chart */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis
                  dataKey="month"
                  stroke="rgba(255,255,255,0.5)"
                  tickFormatter={(value) => `${Math.floor(value / 12)}y`}
                />
                <YAxis
                  stroke="rgba(255,255,255,0.5)"
                  tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                  }}
                  labelFormatter={(value) => `Month ${value}`}
                  formatter={(value: number) => [formatCurrency(value), 'Balance']}
                />
                <Line
                  type="monotone"
                  dataKey="balance"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
