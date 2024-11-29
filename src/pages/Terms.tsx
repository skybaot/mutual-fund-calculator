import React from 'react';
import { motion } from 'framer-motion';

interface Term {
  title: string;
  description: string;
  category: 'mutual-fund' | 'investment' | 'fixed-income';
}

const financialTerms: Term[] = [
  {
    title: 'Mutual Fund',
    description: 'A professionally managed investment fund that pools money from multiple investors to purchase securities. Offers diversification, professional management, and liquidity.',
    category: 'mutual-fund',
  },
  {
    title: 'SIP (Systematic Investment Plan)',
    description: 'An investment strategy where you invest a fixed amount in mutual funds at regular intervals (usually monthly). Benefits include rupee cost averaging and disciplined investing.',
    category: 'mutual-fund',
  },
  {
    title: 'NAV (Net Asset Value)',
    description: 'The per-unit market value of a mutual fund. Calculated by dividing the total value of all the assets in a portfolio by the number of units outstanding.',
    category: 'mutual-fund',
  },
  {
    title: 'Expense Ratio',
    description: 'The annual fee charged by mutual funds to cover operating expenses, expressed as a percentage of assets. Lower expense ratios mean better returns for investors.',
    category: 'mutual-fund',
  },
  {
    title: 'FD (Fixed Deposit)',
    description: 'A secure investment option offered by banks where you deposit money for a fixed period at a predetermined interest rate. Offers guaranteed returns but typically lower than market-linked investments.',
    category: 'fixed-income',
  },
  {
    title: 'RD (Recurring Deposit)',
    description: 'A type of term deposit where you invest a fixed amount monthly. Interest is compounded quarterly, and the maturity amount is predetermined. Ideal for regular savers.',
    category: 'fixed-income',
  },
  {
    title: 'ELSS (Equity Linked Savings Scheme)',
    description: 'A type of mutual fund that invests primarily in equity and offers tax benefits under Section 80C. Has a lock-in period of 3 years.',
    category: 'mutual-fund',
  },
  {
    title: 'Exit Load',
    description: 'A fee charged when you sell mutual fund units before a specified period. Designed to discourage short-term investing.',
    category: 'mutual-fund',
  },
  {
    title: 'Portfolio Rebalancing',
    description: 'The process of realigning the weightings of assets in an investment portfolio. Helps maintain desired levels of asset allocation and risk.',
    category: 'investment',
  },
  {
    title: 'Dividend Reinvestment',
    description: 'An option where dividends earned from mutual funds are automatically reinvested to purchase additional units instead of being paid out.',
    category: 'mutual-fund',
  },
  {
    title: 'Market Capitalization',
    description: 'The total market value of a company\'s outstanding shares. Mutual funds often categorize investments based on large-cap, mid-cap, or small-cap.',
    category: 'investment',
  },
  {
    title: 'Asset Allocation',
    description: 'The strategy of dividing investments among different asset categories like stocks, bonds, and cash. Helps balance risk and reward according to goals and risk tolerance.',
    category: 'investment',
  },
];

export function Terms() {
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);

  const filteredTerms = selectedCategory 
    ? financialTerms.filter(term => term.category === selectedCategory)
    : financialTerms;

  const categories = [
    { id: 'mutual-fund', label: 'Mutual Funds' },
    { id: 'investment', label: 'Investment Basics' },
    { id: 'fixed-income', label: 'Fixed Income' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-12"
    >
      <motion.h1
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="text-4xl font-bold text-white mb-8 text-center"
      >
        Financial Terms
      </motion.h1>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-full transition-all duration-300 ${
            selectedCategory === null
              ? 'bg-indigo-500 text-white'
              : 'bg-white/10 text-gray-300 hover:bg-white/20'
          }`}
        >
          All Terms
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-full transition-all duration-300 ${
              selectedCategory === category.id
                ? 'bg-indigo-500 text-white'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Terms Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredTerms.map((term, index) => (
          <motion.div
            key={term.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 p-6 hover:bg-white/10 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/30 to-purple-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="relative">
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-indigo-300 transition-colors duration-300">
                {term.title}
              </h3>
              <p className="text-gray-300">
                {term.description}
              </p>
              <div className="mt-4">
                <span className="text-xs text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full">
                  {categories.find(cat => cat.id === term.category)?.label}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
