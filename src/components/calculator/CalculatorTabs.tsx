import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, PiggyBank, RefreshCw, TrendingUp } from 'lucide-react';
import { CalculatorType } from '../../types/calculator';

const calculatorConfig = {
  SIP: { icon: RefreshCw, color: 'from-blue-500 to-cyan-500' },
  FD: { icon: PiggyBank, color: 'from-green-500 to-emerald-500' },
  RD: { icon: Wallet, color: 'from-orange-500 to-amber-500' },
  MF: { icon: TrendingUp, color: 'from-purple-500 to-pink-500' }
} as const;

interface CalculatorTabsProps {
  activeCalculator: CalculatorType;
  onSelect: (type: CalculatorType) => void;
}

export function CalculatorTabs({ activeCalculator, onSelect }: CalculatorTabsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {(Object.keys(calculatorConfig) as CalculatorType[]).map((type) => {
        const { icon: Icon, color } = calculatorConfig[type];
        const isActive = activeCalculator === type;

        return (
          <motion.button
            key={type}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(type)}
            className={`relative p-4 rounded-xl border transition-colors ${
              isActive 
                ? 'border-white/20 bg-white/10' 
                : 'border-white/5 bg-white/5 hover:bg-white/10'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="active-tab"
                className={`absolute inset-0 rounded-xl bg-gradient-to-br ${color} opacity-10`}
              />
            )}
            <div className="relative flex flex-col items-center gap-2">
              <Icon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-white/60'}`} />
              <span className={`text-sm font-medium ${isActive ? 'text-white' : 'text-white/60'}`}>
                {type}
              </span>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}