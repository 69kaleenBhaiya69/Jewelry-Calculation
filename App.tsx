
import React, { useState, useMemo } from 'react';
import { PURITY_MULTIPLIERS, ETSY_CHARGE_PCT, USD_CONVERSION_RATE } from './constants';
import { CalculationResult } from './types';
import InputGroup from './components/InputGroup';
import PricingCard from './components/PricingCard';

const App: React.FC = () => {
  // Market & Labour Inputs
  const [goldRatePerGram, setGoldRatePerGram] = useState<number>(0);
  const [labourPerGram, setLabourPerGram] = useState<number>(0);
  
  // Weight Inputs
  const [weight10k, setWeight10k] = useState<number>(0);
  const [weight14k, setWeight14k] = useState<number>(0);
  const [weight18k, setWeight18k] = useState<number>(0);

  // Other Inputs
  const [diamondRate, setDiamondRate] = useState<number>(0);
  const [profit, setProfit] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);

  const results = useMemo<CalculationResult[]>(() => {
    const purities: Array<{ label: '10K' | '14K' | '18K'; weight: number }> = [
      { label: '10K', weight: weight10k },
      { label: '14K', weight: weight14k },
      { label: '18K', weight: weight18k },
    ];

    return purities.map((p) => {
      // 1. Foundation Costs
      const specificPurityRate = goldRatePerGram * PURITY_MULTIPLIERS[p.label];
      const goldValue = p.weight * specificPurityRate;
      const labourValue = p.weight * labourPerGram;
      
      // Fixed costs include diamond/setting
      const fixedCosts = diamondRate;
      
      // Subtotal before any fees or profit (manufacturing cost)
      const manufacturingCost = goldValue + labourValue + fixedCosts;

      // 2. Marketplace & Profit Handling
      // Following original logic: Profit is part of the pre-tax base
      const preEtsyTotal = manufacturingCost + profit;
      const marketplaceFees = preEtsyTotal * ETSY_CHARGE_PCT;
      const priceAfterFees = preEtsyTotal + marketplaceFees;

      // 3. Conversion & Discounting
      const basePriceUSD = priceAfterFees / USD_CONVERSION_RATE;
      const discountFactor = 1 - (discount / 100);
      const finalPriceUSD = discountFactor > 0 ? basePriceUSD / discountFactor : 0;

      return {
        purity: p.label,
        weight: p.weight,
        goldValue: goldValue,
        labourValue: labourValue,
        fixedCosts: fixedCosts,
        subtotalBeforeFees: manufacturingCost,
        marketplaceFees: marketplaceFees,
        priceAfterFees: priceAfterFees,
        profitAmount: profit,
        basePriceUSD: basePriceUSD,
        finalPriceUSD: Math.round(finalPriceUSD),
      };
    });
  }, [goldRatePerGram, labourPerGram, weight10k, weight14k, weight18k, diamondRate, profit, discount]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 sm:p-10 bg-[#FAFAFA]">
      <div className="w-full max-w-[480px] bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.03)] border border-gray-100 overflow-hidden">
        
        {/* Header Section */}
        <header className="px-8 pt-10 pb-8 text-center border-b border-gray-50">
          <h1 className="text-3xl serif font-medium text-[#2D2D2D] tracking-tight mb-1">
            Jewelry Pricing Intelligence
          </h1>
          <p className="text-[10px] text-gray-400 uppercase tracking-[0.3em] font-medium">
            Internal Production System • v5.0
          </p>
        </header>

        {/* Input Section */}
        <div className="p-8 space-y-8 bg-white">
          
          <div className="grid grid-cols-2 gap-4">
            <InputGroup 
              label="24K Rate (1g)" 
              value={goldRatePerGram} 
              onChange={setGoldRatePerGram} 
              prefix="₹"
            />
            <InputGroup 
              label="Labour (1g)" 
              value={labourPerGram} 
              onChange={setLabourPerGram} 
              prefix="₹"
            />
          </div>

          <div className="space-y-4">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C9A24D]">
              Product Weights (g)
            </h2>
            <div className="grid grid-cols-3 gap-3">
              <InputGroup label="10K" value={weight10k} onChange={setWeight10k} suffix="g" />
              <InputGroup label="14K" value={weight14k} onChange={setWeight14k} suffix="g" />
              <InputGroup label="18K" value={weight18k} onChange={setWeight18k} suffix="g" />
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C9A24D]">
              Fixed Costs & Margin
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <InputGroup label="Diamond/Setting" value={diamondRate} onChange={setDiamondRate} prefix="₹" />
              <InputGroup label="Profit Goal" value={profit} onChange={setProfit} prefix="₹" />
            </div>
            <InputGroup label="Promotional Discount" value={discount} onChange={setDiscount} suffix="%" />
          </div>

        </div>

        {/* Ledger Section Header */}
        <div className="px-8 py-4 bg-gray-50/50 border-y border-gray-100">
          <h2 className="text-[10px] font-bold text-center uppercase tracking-[0.4em] text-gray-400">
            Price Breakdown Ledger
          </h2>
        </div>

        {/* Results Section */}
        <div className="p-8 space-y-12">
          {results.map((result) => (
            <PricingCard key={result.purity} result={result} />
          ))}
        </div>

        {/* Footer info */}
        <footer className="bg-gray-50 px-8 py-8 text-center border-t border-gray-100">
          <p className="text-[9px] text-gray-400 uppercase tracking-[0.2em] leading-relaxed">
            Market Fee: 22% (Etsy) • Conversion: 1 USD = ₹90 <br/> 
            Proprietary Internal Pricing Engine
          </p>
        </footer>

      </div>
    </div>
  );
};

export default App;
