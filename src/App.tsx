import React, { useState, useEffect } from 'react';
import { TopNav } from './components/TopNav.tsx';
import { TrustHeaderBanner } from './components/TrustHeaderBanner.tsx';
import { ProductHero } from './components/ProductHero.tsx';
import { BotanicalInfographicSection } from './components/BotanicalInfographicSection.tsx';
import { ProductDetailsSection } from './components/ProductDetailsSection.tsx';
import { OrderFormSection } from './components/OrderFormSection.tsx';
import { FaqSection } from './components/FaqSection.tsx';
import { Footer } from './components/Footer.tsx';
import { StickyMobileBar } from './components/StickyMobileBar.tsx';
import { OrderConfirmationModal } from './components/OrderConfirmationModal.tsx';
import { SellerSettingsModal } from './components/SellerSettingsModal.tsx';
import { ImageLightboxModal } from './components/ImageLightboxModal.tsx';
import { BRAND_CONFIG } from './config/brand.ts';
import { OrderPayload, parseUtmParams, UtmParams } from './utils/order.ts';

export default function App() {
  const [utmParams, setUtmParams] = useState<UtmParams>({});
  const [sellerWhatsApp, setSellerWhatsApp] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('twg_seller_whatsapp');
      if (saved && saved.trim()) return saved.trim();
    } catch {
      // ignore
    }
    return BRAND_CONFIG.defaultSellerWhatsApp;
  });

  const [activeZoomIndex, setActiveZoomIndex] = useState<number | null>(null);
  const [preparedOrder, setPreparedOrder] = useState<OrderPayload | null>(null);
  const [whatsappUrl, setWhatsappUrl] = useState<string>('');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Parse UTM parameters from URL search string
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const parsed = parseUtmParams(window.location.search);
      setUtmParams(parsed);
    }
  }, []);

  const scrollToOrderForm = () => {
    const el = document.getElementById('order-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      // Focus the customer name input for instant keyboard access
      setTimeout(() => {
        const input = document.getElementById('field-fullName');
        if (input) input.focus();
      }, 400);
    }
  };

  const handleOrderPrepared = (payload: OrderPayload, waUrl: string) => {
    setPreparedOrder(payload);
    setWhatsappUrl(waUrl);

    // Attempt to open WhatsApp in a new tab immediately
    try {
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    } catch (err) {
      console.warn('Popup blocked, customer can use modal button to open WhatsApp:', err);
    }
  };

  const handleSaveSellerNumber = (newNumber: string) => {
    setSellerWhatsApp(newNumber);
    try {
      localStorage.setItem('twg_seller_whatsapp', newNumber);
    } catch {
      // ignore
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1C2826] selection:bg-[#EAE0CD] selection:text-[#0F2E22]">
      {/* 1. Top Trust Announcement Bar */}
      <TrustHeaderBanner />

      {/* 2. Top Bar Navigation (Zone 1 Brand, Zone 2 Links, Zone 3 CTA) */}
      <TopNav
        onOrderClick={scrollToOrderForm}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 3. Hero Showcase with Product Gallery & Pricing */}
        <ProductHero
          onOrderClick={scrollToOrderForm}
          onImageZoom={(index) => setActiveZoomIndex(index)}
        />

        {/* 4. Botanical Infographic & Active Plant Extracts Breakdown */}
        <BotanicalInfographicSection
          onZoomInfographic={() => setActiveZoomIndex(3)}
        />

        {/* 5. Application Ritual & Ethical Skincare Guarantee */}
        <ProductDetailsSection />

        {/* 6. Cash on Delivery Order Form with Automatic Subtotal & WhatsApp Generation */}
        <OrderFormSection
          sellerWhatsApp={sellerWhatsApp}
          utmParams={utmParams}
          onOrderPrepared={handleOrderPrepared}
        />

        {/* 7. Frequently Asked Questions */}
        <FaqSection />
      </main>

      {/* 8. Footer */}
      <Footer
        onOpenSettings={() => setIsSettingsOpen(true)}
        sellerPhone={sellerWhatsApp}
      />

      {/* 9. Mobile Sticky Action Bar (<15% viewport height) */}
      <StickyMobileBar onOrderClick={scrollToOrderForm} />

      {/* 10. Order Review & WhatsApp Guidance Modal */}
      {preparedOrder && (
        <OrderConfirmationModal
          order={preparedOrder}
          whatsappUrl={whatsappUrl}
          sellerPhone={sellerWhatsApp}
          onClose={() => setPreparedOrder(null)}
        />
      )}

      {/* 11. Image Zoom / Lightbox Modal */}
      <ImageLightboxModal
        imageIndex={activeZoomIndex}
        onClose={() => setActiveZoomIndex(null)}
        onSelectIndex={(idx) => setActiveZoomIndex(idx)}
      />

      {/* 12. Seller WhatsApp Settings Modal */}
      {isSettingsOpen && (
        <SellerSettingsModal
          currentNumber={sellerWhatsApp}
          onSave={handleSaveSellerNumber}
          onClose={() => setIsSettingsOpen(false)}
        />
      )}
    </div>
  );
}
