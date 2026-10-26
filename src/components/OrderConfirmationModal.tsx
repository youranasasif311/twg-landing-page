import React, { useState } from 'react';
import { OrderPayload, generateWhatsAppOrderMessage } from '../utils/order.ts';
import { MessageSquare, ExternalLink, Copy, Check, X, AlertCircle } from 'lucide-react';

interface OrderConfirmationModalProps {
  order: OrderPayload | null;
  whatsappUrl: string;
  sellerPhone: string;
  onClose: () => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  order,
  whatsappUrl,
  sellerPhone,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  if (!order) return null;

  const rawMessage = generateWhatsAppOrderMessage(order);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(rawMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleOpenWhatsApp = () => {
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto"
    >
      <div className="relative w-full max-w-lg bg-white rounded-2xl border border-[#E3D9C7] shadow-xl p-6 sm:p-8 my-8 text-[#1C2826] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#7A8A83] hover:text-[#0F2E22] hover:bg-[#F4EFE6] rounded-lg transition-colors cursor-pointer"
          aria-label="Close review dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-[#EAF7EE] text-[#25D366] flex items-center justify-center mx-auto mb-3 shadow-xs">
            <MessageSquare className="w-6 h-6 fill-current" />
          </div>

          <div className="text-xs font-semibold uppercase tracking-widest text-[#8C6D2D] mb-1">
            Final Step Required
          </div>

          <h3 id="modal-title" className="text-2xl font-serif font-bold text-[#0F2E22]">
            Ready to Send on WhatsApp
          </h3>

          <p className="text-xs sm:text-sm text-[#596961] mt-1.5 leading-relaxed">
            Thank you, <strong className="text-[#0F2E22]">{order.fullName}</strong>! To place your Cash on Delivery order, please open WhatsApp and press <strong className="text-[#0F2E22]">Send</strong> on the pre-filled message.
          </p>
        </div>

        {/* 3 Step Action Flow */}
        <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#EBE3D3] mb-6 space-y-2.5 text-xs text-[#45544C]">
          <div className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-[#0F2E22] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
              1
            </span>
            <span>
              Click <strong>"Open WhatsApp Now"</strong> below.
            </span>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-[#0F2E22] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
              2
            </span>
            <span>
              Your order message will appear in chat. <strong>Tap the Send button</strong> to transmit it to our support team.
            </span>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-[#0F2E22] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
              3
            </span>
            <span>
              Our representative will reply on WhatsApp to confirm your dispatch date & courier tracking.
            </span>
          </div>
        </div>

        {/* Order Brief Summary */}
        <div className="mb-6 border border-[#EBE3D3] rounded-xl p-4 bg-[#FAF8F5] text-xs">
          <div className="font-semibold text-[#0F2E22] mb-2 flex justify-between">
            <span>Order Summary:</span>
            <span className="text-emerald-700 font-bold">Cash on Delivery</span>
          </div>
          <div className="grid grid-cols-2 gap-y-1 text-[#5E6F67]">
            <span>Product:</span>
            <span className="font-medium text-[#1C2826] text-right">TWG Cream (50g) × {order.quantity}</span>
            <span>Total Payable:</span>
            <span className="font-bold text-[#0F2E22] text-right">PKR {order.finalTotal.toLocaleString()}</span>
            <span>Deliver to:</span>
            <span className="font-medium text-[#1C2826] text-right truncate">
              {order.city} ({order.fullName})
            </span>
          </div>
        </div>

        {/* Primary Action: Open WhatsApp */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={handleOpenWhatsApp}
            className="w-full py-3.5 px-6 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-base rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            <MessageSquare className="w-5 h-5 fill-current" />
            <span>Open WhatsApp Now</span>
            <ExternalLink className="w-4 h-4 opacity-80" />
          </button>

          {/* Fallback button: Copy Order Message */}
          <button
            type="button"
            onClick={handleCopy}
            className="w-full py-2.5 px-4 bg-[#FAF8F5] hover:bg-[#F2ECE0] text-[#0F2E22] font-semibold text-xs sm:text-sm rounded-xl border border-[#DCD3C0] transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700">Order text copied to clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-[#8C6D2D]" />
                <span>Copy Order Text to Clipboard</span>
              </>
            )}
          </button>
        </div>

        {/* If WhatsApp Didn't Open Guidance */}
        <div className="mt-5 pt-4 border-t border-[#F0EBE1] text-center">
          <div className="text-[11px] text-[#718279] leading-relaxed">
            WhatsApp didn’t launch? You can paste the copied order text and send directly to our WhatsApp support number:
            <span className="block mt-1 font-mono font-semibold text-[#0F2E22]">
              {sellerPhone || '+92 300 1234567'}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
