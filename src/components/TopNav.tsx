import React from 'react';
import { ShoppingBag, Settings2 } from 'lucide-react';

interface TopNavProps {
  onOrderClick: () => void;
  onOpenSettings: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({ onOrderClick, onOpenSettings }) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#EAE3D6] transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <a
          href="#"
          className="text-xl sm:text-2xl font-serif font-bold tracking-wider text-[#0F2E22] hover:text-[#C5A059] transition-colors whitespace-nowrap shrink-0"
        >
          TWG <span className="font-sans text-xs tracking-widest text-[#C5A059] uppercase ml-1 font-semibold">Skincare</span>
        </a>

        {/* Zone 2: 4 concise single-line nav links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#4A5551]">
          <a
            href="#product-overview"
            className="hover:text-[#0F2E22] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
          >
            Overview
          </a>
          <a
            href="#botanicals"
            className="hover:text-[#0F2E22] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
          >
            Botanicals
          </a>
          <a
            href="#how-to-use"
            className="hover:text-[#0F2E22] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
          >
            How to Use
          </a>
          <a
            href="#faqs"
            className="hover:text-[#0F2E22] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
          >
            FAQs
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenSettings}
            title="Configure Seller WhatsApp Number"
            className="p-2 text-[#7A8A83] hover:text-[#0F2E22] hover:bg-[#EFE8DC] rounded-lg transition-colors"
            aria-label="Seller WhatsApp Settings"
          >
            <Settings2 className="w-4 h-4" />
          </button>

          <button
            onClick={onOrderClick}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#0F2E22] hover:bg-[#163E2F] rounded-lg transition-all shadow-sm hover:shadow active:scale-95 whitespace-nowrap shrink-0"
          >
            <ShoppingBag className="w-4 h-4 text-[#C5A059]" />
            <span>Order COD</span>
          </button>
        </div>
      </div>
    </header>
  );
};
