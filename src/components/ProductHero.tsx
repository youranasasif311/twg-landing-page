import React, { useState } from 'react';
import { BRAND_CONFIG } from '../config/brand.ts';
import { Truck, ShieldCheck, Sparkles, Check, ChevronRight, Eye, Droplets, Leaf } from 'lucide-react';

interface ProductHeroProps {
  onOrderClick: () => void;
  onImageZoom: (imageIndex: number) => void;
}

export const ProductHero: React.FC<ProductHeroProps> = ({ onOrderClick, onImageZoom }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const currentImage = BRAND_CONFIG.images[selectedImageIndex];

  return (
    <section id="product-overview" className="pt-6 pb-12 sm:pb-16 bg-[#FAF8F5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Gallery & Visual Showcase (7 cols on lg) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Main Featured Image Container */}
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#F0EBE1] border border-[#E5DDD0] shadow-sm group">
              <img
                src={currentImage.url}
                alt={currentImage.alt}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
              />

              {/* Top Badge: Size & Authentic indicator */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="px-3 py-1 bg-[#0F2E22]/90 backdrop-blur-sm text-white text-xs font-semibold rounded-md tracking-wider">
                  {currentImage.badge}
                </span>
              </div>

              {/* Zoom click affordance */}
              <button
                type="button"
                onClick={() => onImageZoom(selectedImageIndex)}
                className="absolute bottom-4 right-4 p-2.5 bg-white/90 hover:bg-white text-[#0F2E22] rounded-xl shadow-md transition-all hover:scale-105 flex items-center gap-1.5 text-xs font-medium cursor-pointer"
                aria-label="View high resolution image"
              >
                <Eye className="w-4 h-4 text-[#C5A059]" />
                <span className="hidden sm:inline">Tap to Zoom</span>
              </button>
            </div>

            {/* Thumbnail Navigation Row */}
            <div className="grid grid-cols-4 gap-3">
              {BRAND_CONFIG.images.map((img, idx) => (
                <button
                  key={img.id}
                  type="button"
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    selectedImageIndex === idx
                      ? 'border-[#0F2E22] ring-2 ring-[#C5A059]/30 shadow-sm'
                      : 'border-[#E5DDD0] opacity-75 hover:opacity-100 hover:border-[#B8A892]'
                  }`}
                  aria-label={`Show image ${idx + 1}: ${img.title}`}
                >
                  <img
                    src={img.url}
                    alt={img.alt}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-black/60 backdrop-blur-[2px] py-0.5 px-1 text-[10px] text-white text-center truncate">
                    {img.title}
                  </div>
                </button>
              ))}
            </div>

            {/* Natural Ingredients Quick Highlight */}
            <div className="mt-2 p-4 rounded-xl bg-[#F4EFE6] border border-[#E8DEC9] flex items-center justify-between gap-4 text-xs text-[#3E4A44]">
              <div className="flex items-center gap-2 font-medium">
                <Leaf className="w-4 h-4 text-[#0F2E22]" />
                <span>Dragon's Blood Resin · Saffron · Ginseng · Rose</span>
              </div>
              <a
                href="#botanicals"
                className="text-[#0F2E22] font-semibold underline underline-offset-4 hover:text-[#C5A059] shrink-0"
              >
                See Breakdown
              </a>
            </div>
          </div>

          {/* Right Column: Product Narrative & Buy Box (5 cols on lg) */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            {/* Brand Kicker */}
            <div className="flex items-center gap-2 text-xs tracking-widest uppercase font-semibold text-[#8C6D2D] mb-2">
              <span>TWG Luxury Skincare</span>
              <span aria-hidden="true">·</span>
              <span>Imported 50g Jar</span>
            </div>

            {/* Product Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-[42px] leading-tight font-serif font-bold text-[#0F2E22] mb-3 text-balance">
              Dragon Blood Premium Skin Care Cream
            </h1>

            {/* Subtitle / Promise */}
            <p className="text-sm sm:text-base text-[#4F5D56] mb-5 leading-relaxed">
              Formulated with natural botanical dragon blood resin and active plant extracts. Restores intense 24-hour hydration, revitalizes natural glow, and helps support a resilient skin barrier.
            </p>

            {/* Pricing Box - Transparent & Honest */}
            <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#EAE3D6] shadow-xs mb-6">
              <div className="flex items-baseline justify-between mb-2">
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#6D7D75] font-medium block">
                    Product Price (50g)
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-serif font-bold text-[#0F2E22] tabular-nums">
                      PKR 2,000
                    </span>
                    <span className="text-xs text-[#7A8A83] font-medium">per jar</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[11px] font-semibold text-[#0F2E22] bg-[#EAF5EF] border border-[#BCE3CE] px-2.5 py-1 rounded-md inline-block">
                    Cash on Delivery
                  </span>
                  <p className="text-[11px] text-[#55695F] mt-1">Free Nationwide Shipping</p>
                </div>
              </div>

              <div className="pt-3 border-t border-[#F2ECE1] grid grid-cols-2 gap-3 text-xs text-[#4F5D56]">
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#0F2E22]" />
                  <span>100% Original Sealed Jar</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#0F2E22]" />
                  <span>No Advance Payment</span>
                </div>
              </div>
            </div>

            {/* Key Benefits List */}
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#EAE2D2] flex items-center justify-center shrink-0 mt-0.5 text-[#0F2E22]">
                  <Droplets className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#0F2E22]">Deep 24-Hour Hydration</h4>
                  <p className="text-xs text-[#5C6E65] leading-relaxed">
                    Locks in moisture to soothe dryness and rough texture across Pakistani dry & seasonal climates.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#EAE2D2] flex items-center justify-center shrink-0 mt-0.5 text-[#0F2E22]">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#0F2E22]">Healthy Dewy Glow</h4>
                  <p className="text-xs text-[#5C6E65] leading-relaxed">
                    Saffron and Dragon's blood botanical antioxidants restore dull, fatigued skin without harsh bleaching.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#EAE2D2] flex items-center justify-center shrink-0 mt-0.5 text-[#0F2E22]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#0F2E22]">Zero Bleach, Zero Mercury</h4>
                  <p className="text-xs text-[#5C6E65] leading-relaxed">
                    Pure ethical skincare. No steroids, no harsh peeling, safe for daily morning and night use.
                  </p>
                </div>
              </div>
            </div>

            {/* Primary Action Button (Scroll to Order Form) */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={onOrderClick}
                className="w-full py-3.5 px-6 bg-[#0F2E22] hover:bg-[#163E2F] text-white font-semibold text-sm sm:text-base rounded-xl transition-all shadow-md hover:shadow-lg active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Order Now (Cash on Delivery)</span>
                <ChevronRight className="w-4 h-4 text-[#C5A059]" />
              </button>
            </div>

            {/* Courier Dispatch Assurance */}
            <div className="mt-4 flex items-center gap-2 text-xs text-[#6B7C73]">
              <Truck className="w-4 h-4 text-[#0F2E22] shrink-0" />
              <span>Delivering all across Pakistan via TCS, Trax & Leopards Courier</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
