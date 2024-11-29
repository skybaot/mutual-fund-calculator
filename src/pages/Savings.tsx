import React from 'react';
import { motion } from 'framer-motion';
import { PiggyBank, Wallet, LineChart, Shield, Calculator, ArrowUpRight } from 'lucide-react';

const savingsOptions = [
  {
    title: 'Systematic Investment Plan (SIP)',
    description: 'Regular investment in mutual funds for long-term wealth creation.',
    icon: LineChart,
    color: 'from-blue-600 to-indigo-600',
    features: [
      {
        title: 'Starting Amount',
        value: '₹500/month',
      },
      {
        title: 'Investment Horizon',
        value: '5+ years',
      },
      {
        title: 'Risk Level',
        value: 'Moderate',
      },
      {
        title: 'Returns',
        value: 'Market-linked',
      },
    ],
    benefits: [
      'Rupee cost averaging',
      'Power of compounding',
      'Flexible investment amount',
      'Professional management',
    ],
  },
  {
    title: 'Recurring Deposit',
    description: 'Fixed monthly savings with guaranteed returns.',
    icon: PiggyBank,
    color: 'from-purple-600 to-pink-600',
    features: [
      {
        title: 'Starting Amount',
        value: '₹1000/month',
      },
      {
        title: 'Investment Horizon',
        value: '6 months - 10 years',
      },
      {
        title: 'Risk Level',
        value: 'Low',
      },
      {
        title: 'Returns',
        value: 'Fixed (5-6% p.a.)',
      },
    ],
    benefits: [
      'Guaranteed returns',
      'No market risk',
      'Regular saving habit',
      'Easy to understand',
    ],
  },
  {
    title: 'Fixed Deposit',
    description: 'One-time investment with fixed returns.',
    icon: Shield,
    color: 'from-green-600 to-teal-600',
    features: [
      {
        title: 'Starting Amount',
        value: '₹10,000',
      },
      {
        title: 'Investment Horizon',
        value: '7 days - 10 years',
      },
      {
        title: 'Risk Level',
        value: 'Very Low',
      },
      {
        title: 'Returns',
        value: 'Fixed (5.5-7% p.a.)',
      },
    ],
    benefits: [
      'Capital protection',
      'Predictable returns',
      'Flexible tenures',
      'Higher senior citizen rates',
    ],
  },
  {
    title: 'Liquid Funds',
    description: 'Short-term investment with better returns than savings account.',
    icon: Wallet,
    color: 'from-orange-600 to-red-600',
    features: [
      {
        title: 'Starting Amount',
        value: '₹500',
      },
      {
        title: 'Investment Horizon',
        value: '1 day - 3 months',
      },
      {
        title: 'Risk Level',
        value: 'Very Low',
      },
      {
        title: 'Returns',
        value: '6-7% p.a.',
      },
    ],
    benefits: [
      'High liquidity',
      'Better than savings account',
      'Low risk',
      'Professional management',
    ],
  },
];

const comparisons = [
  {
    title: 'Risk vs Returns',
    description: 'Higher potential returns come with higher risk. Choose based on your risk appetite.',
    items: [
      'SIP: Moderate risk, High potential returns',
      'RD: Low risk, Moderate returns',
      'FD: Very low risk, Fixed returns',
      'Liquid Funds: Low risk, Moderate returns',
    ],
  },
  {
    title: 'Investment Horizon',
    description: 'Different options suit different time frames. Match with your goals.',
    items: [
      'Short-term: Liquid Funds (< 3 months)',
      'Medium-term: FD, RD (6 months - 3 years)',
      'Long-term: SIP (5+ years)',
    ],
  },
  {
    title: 'Flexibility',
    description: 'Consider how easily you can access your money when needed.',
    items: [
      'Most Flexible: Liquid Funds',
      'Moderate Flexibility: SIP',
      'Less Flexible: RD, FD',
    ],
  },
];

export function Savings() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
          Smart Savings Options
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
          Explore different ways to save and grow your money with our comprehensive guide to savings options.
        </p>
      </motion.div>

      {/* Savings Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {savingsOptions.map((option, index) => (
          <motion.div
            key={option.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group"
          >
            <div className="h-full p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${option.color} mb-4 group-hover:scale-110 transition-transform`}>
                <option.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                {option.title}
              </h3>
              <p className="text-gray-300 mb-4">
                {option.description}
              </p>

              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                {option.features.map((feature) => (
                  <div key={feature.title} className="p-3 rounded-lg bg-black/20">
                    <p className="text-sm text-gray-400">{feature.title}</p>
                    <p className="text-white font-medium">{feature.value}</p>
                  </div>
                ))}
              </div>

              {/* Benefits List */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-300 mb-2">Benefits:</p>
                {option.benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center text-gray-400 group-hover:text-gray-300">
                    <ArrowUpRight className="w-4 h-4 mr-2 text-indigo-400" />
                    {benefit}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Comparisons Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {comparisons.map((comparison, index) => (
          <motion.div
            key={comparison.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10"
          >
            <h3 className="text-xl font-semibold text-white mb-2">
              {comparison.title}
            </h3>
            <p className="text-gray-300 mb-4">
              {comparison.description}
            </p>
            <ul className="space-y-2">
              {comparison.items.map((item) => (
                <li key={item} className="flex items-center text-gray-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mr-2" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-center"
      >
        <p className="text-xl text-gray-300 mb-6">
          Ready to start your savings journey?
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="/calculator"
            className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Calculator className="w-5 h-5 mr-2" />
            Calculate Returns
          </a>
        </div>
      </motion.div>
    </div>
  );
}
