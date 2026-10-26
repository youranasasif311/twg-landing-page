import React, { useState } from 'react';
import { BRAND_CONFIG } from '../config/brand.ts';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="faqs" className="py-14 sm:py-20 bg-[#FAF8F5]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-[#8C6D2D] font-semibold mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-[#0F2E22]" />
            <span>Honest Answers</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0F2E22] mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-[#4E5C55]">
            Everything you need to know about our product, ingredients, and Cash on Delivery service.
          </p>
        </div>

        {/* FAQs Accordion */}
        <div className="space-y-3">
          {BRAND_CONFIG.faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className="rounded-xl border border-[#E3D9C7] bg-white overflow-hidden transition-all shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-[#0F2E22] hover:bg-[#FAF8F5] transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#8C6D2D] transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#4F5E56] leading-relaxed border-t border-[#F2ECE1]">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
