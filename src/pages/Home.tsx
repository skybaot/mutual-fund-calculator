import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calculator, BookOpen, TrendingUp, PiggyBank } from 'lucide-react';

const features = [
  {
    title: 'Mutual Fund Calculator',
    description: 'Calculate potential returns, understand compound interest, and plan your investments with our powerful calculator.',
    icon: Calculator,
    link: '/calculator',
    color: 'from-blue-600 to-indigo-600',
  },
  {
    title: 'Financial Terms',
    description: 'Learn essential financial terms and concepts to make informed investment decisions.',
    icon: BookOpen,
    link: '/terms',
    color: 'from-purple-600 to-pink-600',
  },
  {
    title: 'Investment Strategies',
    description: 'Explore different investment strategies like SIP, lump sum investments, and portfolio diversification.',
    icon: TrendingUp,
    link: '/terms',
    color: 'from-green-600 to-teal-600',
  },
  {
    title: 'Smart Savings',
    description: 'Learn about systematic investment plans, recurring deposits, and other smart saving options.',
    icon: PiggyBank,
    link: '/calculator',
    color: 'from-orange-600 to-red-600',
  },
];

const highlights = [
  {
    title: 'Why Mutual Funds?',
    points: [
      'Professional Portfolio Management',
      'Diversification Benefits',
      'High Liquidity',
      'Start with Small Amounts',
      'Regulated by SEBI',
    ],
  },
  {
    title: 'Types of Mutual Funds',
    points: [
      'Equity Funds',
      'Debt Funds',
      'Hybrid Funds',
      'Index Funds',
      'Sector Funds',
    ],
  },
  {
    title: 'Investment Tips',
    points: [
      'Start Early',
      'Invest Regularly',
      'Diversify Portfolio',
      'Review Periodically',
      'Stay Invested Long-term',
    ],
  },
];

export function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
          Smart Investment Decisions Start Here
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto px-4">
          Use our powerful calculator and financial tools to plan your mutual fund investments,
          understand market trends, and make informed decisions.
        </p>
        <Link
          to="/calculator"
          className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Get Started
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="ml-2"
          >
            →
          </motion.span>
        </Link>
      </motion.div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-16 px-4">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link
              to={feature.link}
              className="block group h-full"
            >
              <div className="h-full p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.color} mb-4`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-300">
                  {feature.description}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Highlights Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 px-4">
        {highlights.map((highlight, index) => (
          <motion.div
            key={highlight.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 backdrop-blur-sm hover:from-white/10 hover:to-white/15 transition-all duration-300"
          >
            <h3 className="text-xl font-semibold text-white mb-4">
              {highlight.title}
            </h3>
            <ul className="space-y-2">
              {highlight.points.map((point, pointIndex) => (
                <motion.li
                  key={point}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 + pointIndex * 0.05 }}
                  className="flex items-center text-gray-300"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mr-2" />
                  {point}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
