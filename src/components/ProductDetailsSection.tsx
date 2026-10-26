import React from 'react';
import { BRAND_CONFIG } from '../config/brand.ts';
import { Sparkles, CheckCircle2, ShieldCheck, Sun, Moon, HeartHandshake } from 'lucide-react';

export const ProductDetailsSection: React.FC = () => {
  return (
    <section id="how-to-use" className="py-14 sm:py-20 bg-[#FAF8F5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-[#8C6D2D] font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#0F2E22]" />
            <span>Application & Care</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0F2E22] mb-3 text-balance">
            How to Use for Best Radiant Results
          </h2>
          <p className="text-sm sm:text-base text-[#4E5C55]">
            Simple morning and nighttime ritual designed to give your skin a natural, dewy, supple glow.
          </p>
        </div>

        {/* 4 Step Process Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {BRAND_CONFIG.howToUse.map((item) => (
            <div
              key={item.step}
              className="p-6 rounded-2xl bg-white border border-[#EBE4D8] relative hover:shadow-xs transition-all"
            >
              <div className="text-2xl font-serif font-bold text-[#C5A059] mb-3 tabular-nums">
                {item.step}
              </div>
              <h3 className="text-base font-semibold text-[#0F2E22] mb-2">{item.title}</h3>
              <p className="text-xs sm:text-sm text-[#55675F] leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        {/* 2-Column Split: Formula Details & Ethical Skincare Pledge */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Texture & Compatibility (6 cols) */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-[#F4EFE6] border border-[#E3D9C7]">
            <h3 className="text-2xl font-serif font-bold text-[#0F2E22] mb-4">
              Silky Velvet Whip Texture
            </h3>
            <p className="text-sm text-[#4F5E56] leading-relaxed mb-6">
              Unlike heavy cold creams or sticky gels, TWG Dragon Blood Cream is micro-whipped into an airy, soft pink emulsion. It melts effortlessly into facial skin within seconds without leaving a greasy sheen.
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-[#2E3C35]">
                <CheckCircle2 className="w-4 h-4 text-[#0F2E22] shrink-0" />
                <span>Lightweight, fast-absorbing & non-greasy</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#2E3C35]">
                <CheckCircle2 className="w-4 h-4 text-[#0F2E22] shrink-0" />
                <span>Suitable for dry, normal, combination, & sensitive skin</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#2E3C35]">
                <CheckCircle2 className="w-4 h-4 text-[#0F2E22] shrink-0" />
                <span>Non-comedogenic: will not clog pores</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#2E3C35]">
                <div className="flex items-center gap-1">
                  <Sun className="w-4 h-4 text-[#8C6D2D]" />
                  <Moon className="w-4 h-4 text-[#0F2E22]" />
                </div>
                <span>Perfect as daytime moisturizer & overnight renewal cream</span>
              </div>
            </div>
          </div>

          {/* Right: Ethical Skincare Guarantee for Pakistan (6 cols) */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-[#0F2E22] text-[#FAF8F5] border border-[#194232]">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#C5A059] font-semibold mb-3">
              <ShieldCheck className="w-4 h-4" />
              <span>Ethical Beauty Commitment</span>
            </div>

            <h3 className="text-2xl font-serif font-bold text-white mb-4">
              Safe, Honest Skincare with No Harmful Chemicals
            </h3>

            <p className="text-sm text-[#C8D6CF] leading-relaxed mb-6">
              Pakistani skin deserves gentle, authentic nourishment. We take pride in offering real skincare that respects your skin barrier and health:
            </p>

            <div className="space-y-3.5 text-xs sm:text-sm text-[#E2ECE7]">
              <div className="flex items-start gap-2.5">
                <HeartHandshake className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <span><strong>No Mercury or Steroids:</strong> Zero harmful bleaching compounds, mercury, or harsh steroid peelers.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <HeartHandshake className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <span><strong>No Fake Whitening Claims:</strong> Nourishes for a natural, even, hydrated glow rather than artificial bleach results.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <HeartHandshake className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <span><strong>No Fake Discounts:</strong> Honest standard price of PKR 2,000 per 50g jar. No inflated strike-through tricks.</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
