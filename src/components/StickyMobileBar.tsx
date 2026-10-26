import React from 'react';
import { MessageSquare, ShoppingBag } from 'lucide-react';

interface StickyMobileBarProps {
  onOrderClick: () => void;
}

export const StickyMobileBar: React.FC<StickyMobileBarProps> = ({ onOrderClick }) => {
  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#FAF8F5]/98 backdrop-blur-md border-t border-[#E5DDD0] px-4 py-2.5 shadow-lg">
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-wider text-[#6D7D75] font-semibold">
            TWG Cream (50g)
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-serif font-bold text-[#0F2E22] tabular-nums">
              PKR 2,000
            </span>
            <span className="text-[10px] text-emerald-700 font-medium bg-emerald-50 px-1 rounded">
              Free COD
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={onOrderClick}
          className="flex-1 max-w-[210px] py-2.5 px-3.5 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer"
        >
          <MessageSquare className="w-4 h-4 fill-current shrink-0" />
          <span className="whitespace-nowrap">Order on WhatsApp</span>
        </button>
      </div>
    </div>
  );
};
