import React from 'react';
import { BRAND_CONFIG } from '../config/brand.ts';
import { Leaf, Sparkles, Droplets, Shield, Eye } from 'lucide-react';

interface BotanicalInfographicSectionProps {
  onZoomInfographic: () => void;
}

export const BotanicalInfographicSection: React.FC<BotanicalInfographicSectionProps> = ({
  onZoomInfographic,
}) => {
  return (
    <section id="botanicals" className="py-14 sm:py-20 bg-[#F4EFE6] border-y border-[#E6DDCC]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-[#8C6D2D] font-semibold mb-2">
            <Leaf className="w-3.5 h-3.5 text-[#0F2E22]" />
            <span>Pure Botanical Formulation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0F2E22] mb-3 text-balance">
            Powered by Nature’s Finest Botanical Ingredients
          </h2>
          <p className="text-sm sm:text-base text-[#4E5C55]">
            Every jar of TWG Dragon Blood Cream contains concentrated natural plant extracts designed to nourish, soothe, and protect your skin against daily environmental stressors.
          </p>
        </div>

        {/* 4 Pillars Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#E3D9C7] flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full bg-[#EAE2D2] flex items-center justify-center mb-2.5 text-[#0F2E22]">
              <Leaf className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-semibold text-[#0F2E22] mb-1">Natural Ingredients</h3>
            <p className="text-xs text-[#5D6D65]">Pure herbal extracts crafted with care</p>
          </div>

          <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#E3D9C7] flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full bg-[#EAE2D2] flex items-center justify-center mb-2.5 text-[#0F2E22]">
              <Droplets className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-semibold text-[#0F2E22] mb-1">Deep Moisturization</h3>
            <p className="text-xs text-[#5D6D65]">24h hydration lock for soft skin</p>
          </div>

          <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#E3D9C7] flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full bg-[#EAE2D2] flex items-center justify-center mb-2.5 text-[#0F2E22]">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-semibold text-[#0F2E22] mb-1">Healthy Glow</h3>
            <p className="text-xs text-[#5D6D65]">Revitalizes tired, dull complexion</p>
          </div>

          <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#E3D9C7] flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full bg-[#EAE2D2] flex items-center justify-center mb-2.5 text-[#0F2E22]">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-semibold text-[#0F2E22] mb-1">Skin Protection</h3>
            <p className="text-xs text-[#5D6D65]">Antioxidants guard against dust & UV</p>
          </div>
        </div>

        {/* Infographic Visual + Ingredients Deep-Dive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Infographic Image Card (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden bg-white border border-[#DDD3C0] shadow-sm group">
              <img
                src="/assets/aistudio/Dragon_Blood_Cream_Botanical_Infographic_5ff8ed68.png"
                alt="TWG Dragon Blood Cream botanical ingredients chart with rose, ginseng, saffron, edelweiss and green tea"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-102"
              />
              <button
                type="button"
                onClick={onZoomInfographic}
                className="absolute bottom-4 right-4 px-3 py-1.5 bg-[#0F2E22]/90 hover:bg-[#0F2E22] text-white rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Zoom Infographic</span>
              </button>
            </div>
          </div>

          {/* 6 Key Botanical Cards (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {BRAND_CONFIG.ingredients.map((ing) => (
              <div
                key={ing.name}
                className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E3D9C7] hover:border-[#C5A059] transition-colors"
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <h4 className="text-sm font-semibold text-[#0F2E22]">{ing.name}</h4>
                  <span className="text-[11px] font-medium text-[#7A6436] bg-[#F2E8D5] px-2 py-0.5 rounded">
                    {ing.role}
                  </span>
                </div>
                <div className="text-[11px] font-mono text-[#8C9B93] mb-1.5 italic">
                  {ing.scientific}
                </div>
                <p className="text-xs text-[#4F5E56] leading-relaxed">
                  {ing.description}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
