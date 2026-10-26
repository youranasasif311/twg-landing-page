import React from 'react';
import { Truck, ShieldCheck, Banknote } from 'lucide-react';

export const TrustHeaderBanner: React.FC = () => {
  return (
    <div className="bg-[#0F2E22] text-[#FAF8F5] text-xs py-2 px-4 border-b border-[#1A4232]">
      <div className="max-w-6xl mx-auto flex items-center justify-between overflow-x-auto gap-4 scrollbar-none text-[11px] sm:text-xs">
        <div className="flex items-center gap-1.5 shrink-0">
          <Truck className="w-3.5 h-3.5 text-[#C5A059]" />
          <span>Free Nationwide Delivery</span>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 shrink-0 text-[#C9D6CE]">
          <span aria-hidden="true">·</span>
          <span>Pay Cash When Parcel Arrives (COD)</span>
          <span aria-hidden="true">·</span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
          <span>Original Sealed 50g Jar</span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <Banknote className="w-3.5 h-3.5 text-[#C5A059]" />
          <span className="font-semibold text-[#F7E7CE]">PKR 2,000 / Jar</span>
        </div>
      </div>
    </div>
  );
};
