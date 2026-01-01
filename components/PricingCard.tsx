
import React from 'react';
import { CalculationResult } from '../types';

interface PricingCardProps {
  result: CalculationResult;
}

const PricingCard: React.FC<PricingCardProps> = ({ result }) => {
  const Row = ({ label, value, prefix = "", isBold = false, isSmall = false }: any) => (
    <div className={`flex justify-between items-center ${isSmall ? 'py-1' : 'py-1.5'}`}>
      <span className={`uppercase tracking-[0.1em] text-gray-400 ${isSmall ? 'text-[9px]' : 'text-[10px] font-medium'}`}>
        {label}
      </span>
      <span className={`${isBold ? 'font-semibold text-[#2D2D2D]' : 'text-gray-600'} ${isSmall ? 'text-xs' : 'text-sm'}`}>
        {prefix}{value.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
      </span>
    </div>
  );

  return (
    <div className="mb-12 last:mb-0">
      <div className="flex items-baseline justify-between mb-4 border-b border-gray-100 pb-2">
        <h3 className="text-2xl serif font-medium text-[#2D2D2D]">
          {result.purity} Gold Edition
        </h3>
        <span className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">
          {result.weight.toFixed(2)}g Net
        </span>
      </div>

      <div className="space-y-4">
        {/* Tier 1: Cost Breakdown */}
        <section>
          <h4 className="text-[9px] font-bold text-[#C9A24D] uppercase tracking-[0.2em] mb-2">Cost Breakdown (INR)</h4>
          <div className="bg-gray-50/50 rounded-lg p-3 space-y-0.5">
            <Row label="Gold Value" value={result.goldValue} prefix="₹" isSmall />
            <Row label="Labour Cost" value={result.labourValue} prefix="₹" isSmall />
            <Row label="Setting & Misc" value={result.fixedCosts} prefix="₹" isSmall />
            <div className="h-px bg-gray-200/50 my-1" />
            <Row label="Subtotal (Before Marketplace Fees)" value={result.subtotalBeforeFees} prefix="₹" isBold />
          </div>
        </section>

        {/* Tier 2: Fees & Profit */}
        <section>
          <h4 className="text-[9px] font-bold text-[#C9A24D] uppercase tracking-[0.2em] mb-2">Marketplace & Margin</h4>
          <div className="px-3 space-y-1">
            <Row label="Marketplace Charges (22%)" value={result.marketplaceFees} prefix="₹" />
            <Row label="Profit / Margin" value={result.profitAmount} prefix="₹" />
          </div>
        </section>

        {/* Tier 3: Final Conversion */}
        <section className="pt-2">
          <div className="bg-white border border-[#C9A24D]/30 rounded-xl p-6 shadow-[0_8px_24px_rgba(201,162,77,0.06)] flex flex-col items-center">
            <span className="text-[10px] font-bold text-[#C9A24D] uppercase tracking-[0.25em] mb-2">
              Final Price (USD)
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl serif font-bold text-[#2D2D2D]">
                ${result.finalPriceUSD.toLocaleString()}
              </span>
            </div>
            <div className="mt-4 w-full h-px bg-gray-100" />
            <div className="mt-3 flex justify-between w-full text-[9px] text-gray-400 uppercase tracking-widest font-medium">
              <span>Base: ${result.basePriceUSD.toFixed(2)}</span>
              <span>Market-Ready</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PricingCard;
