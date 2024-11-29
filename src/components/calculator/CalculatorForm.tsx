import React from 'react';
import { DollarSign, Percent, Calendar } from 'lucide-react';
import { Input } from '../ui/Input';
import { CalculatorInputs } from '../../types/calculator';

interface CalculatorFormProps {
  inputs: CalculatorInputs;
  onChange: (inputs: CalculatorInputs) => void;
}

export function CalculatorForm({ inputs, onChange }: CalculatorFormProps) {
  const handleChange = (field: keyof CalculatorInputs) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    onChange({
      ...inputs,
      [field]: Number(e.target.value),
    });
  };

  return (
    <div className="space-y-6">
      <Input
        label="Investment Amount"
        type="number"
        value={inputs.amount}
        onChange={handleChange('amount')}
        icon={<DollarSign size={16} />}
        min={0}
      />
      <Input
        label="Tenure (Years)"
        type="number"
        value={inputs.tenure}
        onChange={handleChange('tenure')}
        icon={<Calendar size={16} />}
        min={1}
        max={30}
      />
      <Input
        label="Interest Rate (%)"
        type="number"
        value={inputs.interestRate}
        onChange={handleChange('interestRate')}
        icon={<Percent size={16} />}
        min={0}
        max={100}
        step={0.1}
      />
    </div>
  );
}