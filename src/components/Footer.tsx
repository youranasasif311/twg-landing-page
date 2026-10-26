import React from 'react';
import { ShieldCheck, Truck, MessageSquare, Settings2 } from 'lucide-react';

interface FooterProps {
  onOpenSettings: () => void;
  sellerPhone: string;
}

export const Footer: React.FC<FooterProps> = ({ onOpenSettings, sellerPhone }) => {
  return (
    <footer className="bg-[#0F2E22] text-[#FAF8F5] pt-12 pb-24 md:pb-12 border-t border-[#1C4A38]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#1C4A38]">
          
          {/* Brand Intro (5 cols) */}
          <div className="md:col-span-5">
            <div className="text-2xl font-serif font-bold text-white mb-2">
              TWG <span className="text-xs uppercase tracking-widest text-[#C5A059] font-sans">Skincare</span>
            </div>
            <p className="text-xs sm:text-sm text-[#B4C6BD] leading-relaxed max-w-sm mb-4">
              Dragon Blood Premium Skin Care Cream (50g). Authentic, botanical skincare formulated for deep barrier hydration and natural dewy radiance. Distributed across Pakistan with 100% Cash on Delivery.
            </p>
            <div className="flex items-center gap-3 text-xs text-[#E3EDE8]">
              <div className="flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Nationwide COD</span>
              </div>
              <span aria-hidden="true">·</span>
              <div className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Zero Bleach / Mercury</span>
              </div>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="md:col-span-3">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-[#C5A059] mb-3">
              Explore
            </h4>
            <ul className="space-y-2 text-xs text-[#B4C6BD]">
              <li>
                <a href="#product-overview" className="hover:text-white transition-colors">
                  Product Overview (50g)
                </a>
              </li>
              <li>
                <a href="#botanicals" className="hover:text-white transition-colors">
                  Botanical Ingredients
                </a>
              </li>
              <li>
                <a href="#how-to-use" className="hover:text-white transition-colors">
                  Daily Application Ritual
                </a>
              </li>
              <li>
                <a href="#order-form" className="hover:text-white transition-colors">
                  Order via Cash on Delivery
                </a>
              </li>
              <li>
                <a href="#faqs" className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Support & Store Admin (4 cols) */}
          <div className="md:col-span-4">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-[#C5A059] mb-3">
              Customer Support
            </h4>
            <p className="text-xs text-[#B4C6BD] leading-relaxed mb-3">
              Need assistance with your order? Our team is available on WhatsApp daily from 9:00 AM to 11:00 PM (Pakistan Standard Time).
            </p>
            
            <div className="flex items-center gap-2 mb-4">
              <a
                href={`https://wa.me/${sellerPhone.replace(/\D/g, '') || '923001234567'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#25D366] text-white text-xs font-semibold hover:bg-[#20BD5A] transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 fill-current" />
                <span>Chat on WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={onOpenSettings}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#194232] text-[#DCEAE2] text-xs hover:bg-[#21533F] transition-colors cursor-pointer"
              >
                <Settings2 className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Seller Settings</span>
              </button>
            </div>

            <div className="text-[11px] text-[#869B91]">
              Support WhatsApp: <span className="font-mono text-[#DCEAE2]">{sellerPhone}</span>
            </div>
          </div>

        </div>

        {/* Bottom Strip: Copyright & Disclaimer */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#7F948A]">
          <p>© {new Date().getFullYear()} TWG Skincare Pakistan. All rights reserved.</p>
          <p className="text-center sm:text-right">
            Cash on Delivery across Pakistan · TCS / Trax / Leopards Logistics
          </p>
        </div>
      </div>
    </footer>
  );
};
