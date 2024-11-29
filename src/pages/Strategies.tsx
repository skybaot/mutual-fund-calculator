import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, PieChart, Clock, DollarSign, Target, BarChart2 } from 'lucide-react';

const strategies = [
  {
    title: 'Systematic Investment Plan (SIP)',
    description: 'Invest a fixed amount regularly in mutual funds to benefit from rupee cost averaging.',
    icon: Clock,
    color: 'from-blue-600 to-indigo-600',
    points: [
      'Regular investment discipline',
      'Start with as low as ₹500 per month',
      'Benefit from market ups and downs',
      'Automated investment process',
      'Power of compounding',
    ],
  },
  {
    title: 'Lump Sum Investment',
    description: 'Invest a large amount at once when you have surplus funds or market conditions are favorable.',
    icon: DollarSign,
    color: 'from-purple-600 to-pink-600',
    points: [
      'Suitable for large surplus funds',
      'Take advantage of market dips',
      'Lower transaction costs',
      'Immediate market exposure',
      'Good for short-term goals',
    ],
  },
  {
    title: 'Asset Allocation',
    description: 'Distribute investments across different asset classes to optimize returns and manage risk.',
    icon: PieChart,
    color: 'from-green-600 to-teal-600',
    points: [
      'Diversification across assets',
      'Risk management',
      'Regular rebalancing',
      'Age-based allocation',
      'Goal-aligned distribution',
    ],
  },
  {
    title: 'Goal-Based Investing',
    description: 'Align your investments with specific financial goals and time horizons.',
    icon: Target,
    color: 'from-orange-600 to-red-600',
    points: [
      'Clear investment objectives',
      'Time-bound planning',
      'Risk-appropriate allocation',
      'Regular monitoring',
      'Flexible adjustments',
    ],
  },
  {
    title: 'Value Averaging',
    description: 'Adjust your investment amount based on portfolio performance to maintain steady growth.',
    icon: TrendingUp,
    color: 'from-pink-600 to-rose-600',
    points: [
      'Performance-based adjustment',
      'Systematic investment approach',
      'Market timing advantage',
      'Disciplined investing',
      'Long-term wealth creation',
    ],
  },
  {
    title: 'Index Investing',
    description: 'Invest in funds that track market indices for broad market exposure and lower costs.',
    icon: BarChart2,
    color: 'from-yellow-600 to-amber-600',
    points: [
      'Low-cost investment',
      'Market returns',
      'Passive management',
      'High transparency',
      'Broad diversification',
    ],
  },
];

export function Strategies() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
          Investment Strategies
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
          Discover proven investment strategies to help you achieve your financial goals and build long-term wealth.
        </p>
      </motion.div>

      {/* Strategies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {strategies.map((strategy, index) => (
          <motion.div
            key={strategy.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group"
          >
            <div className="h-full p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${strategy.color} mb-4 group-hover:scale-110 transition-transform`}>
                <strategy.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                {strategy.title}
              </h3>
              <p className="text-gray-300 mb-4">
                {strategy.description}
              </p>
              <ul className="space-y-2">
                {strategy.points.map((point, pointIndex) => (
                  <motion.li
                    key={point}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 + pointIndex * 0.05 }}
                    className="flex items-center text-gray-400 group-hover:text-gray-300 transition-colors"
                  >
                    <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${strategy.color} mr-2`} />
                    {point}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-center mt-16"
      >
        <p className="text-xl text-gray-300 mb-6">
          Ready to start investing with these strategies?
        </p>
        <a
          href="/calculator"
          className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Try Our Calculator
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="ml-2"
          >
            →
          </motion.span>
        </a>
      </motion.div>
    </div>
  );
}
