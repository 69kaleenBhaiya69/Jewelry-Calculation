
import React from 'react';

interface InputGroupProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  step?: string;
  prefix?: string;
  suffix?: string;
  placeholder?: string;
}

const InputGroup: React.FC<InputGroupProps> = ({ 
  label, 
  value, 
  onChange, 
  min = 0, 
  step = "any",
  prefix,
  suffix,
  placeholder = "0.00"
}) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-[11px] font-medium uppercase tracking-[0.15em] text-gray-500">
        {label}
      </label>
      <div className="relative">
        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">
            {prefix}
          </span>
        )}
        <input
          type="number"
          min={min}
          step={step}
          value={value === 0 ? '' : value}
          onChange={(e) => {
            const val = parseFloat(e.target.value);
            onChange(isNaN(val) ? 0 : val);
          }}
          className={`w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-base focus-gold transition-all duration-200 ${prefix ? 'pl-8' : ''} ${suffix ? 'pr-8' : ''}`}
          placeholder={placeholder}
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-medium uppercase">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
};

export default InputGroup;
