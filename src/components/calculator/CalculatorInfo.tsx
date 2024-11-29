import React from 'react';
import { Info } from 'lucide-react';
import { CalculatorType } from '../../types/calculator';
import { cn } from '../../lib/utils';

const calculatorInfo: Record<CalculatorType, { title: string; description: string }> = {
  SIP: {
    title: 'Systematic Investment Plan',
    description: 'Invest a fixed amount regularly in mutual funds to build long-term wealth through the power of compounding.'
  },
  FD: {
    title: 'Fixed Deposit',
    description: 'Secure investment with guaranteed returns. Lock in your money for a fixed period at a predetermined interest rate.'
  },
  RD: {
    title: 'Recurring Deposit',
    description: 'Save regularly with monthly deposits while earning fixed interest rates, perfect for building a disciplined savings habit.'
  },
  MF: {
    title: 'Mutual Fund',
    description: 'Invest in a diversified portfolio managed by professionals. Suitable for both long-term wealth creation and regular income.'
  }
};

interface CalculatorInfoProps {
  type: CalculatorType;
  className?: string;
}

export function CalculatorInfo({ type, className }: CalculatorInfoProps) {
  const info = calculatorInfo[type];

  return (
    <div className={cn("flex items-start gap-3", className)}>
      <div className="p-2 rounded-full bg-primary/10 text-primary">
        <Info size={18} />
      </div>
      <div>
        <h4 className="font-medium text-foreground">{info.title}</h4>
        <p className="text-sm text-muted-foreground mt-1">{info.description}</p>
      </div>
    </div>
  );
}