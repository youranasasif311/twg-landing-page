import React, { useState } from 'react';
import { validatePakistanPhone, buildWhatsAppUrl } from '../utils/order.ts';
import { Settings, Save, Check, ExternalLink, X, PhoneCall } from 'lucide-react';

interface SellerSettingsModalProps {
  currentNumber: string;
  onSave: (newNumber: string) => void;
  onClose: () => void;
}

export const SellerSettingsModal: React.FC<SellerSettingsModalProps> = ({
  currentNumber,
  onSave,
  onClose,
}) => {
  const [inputVal, setInputVal] = useState(currentNumber);
  const [error, setError] = useState<string | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validatePakistanPhone(inputVal);
    if (!validation.isValid) {
      setError(validation.error || 'Please enter a valid Pakistani WhatsApp number.');
      return;
    }
    setError(null);
    onSave(validation.international || inputVal);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  const testUrl = buildWhatsAppUrl(
    inputVal,
    'Salam TWG Team, this is a test message to verify seller WhatsApp receiving.'
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="seller-settings-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
    >
      <div className="relative w-full max-w-md bg-white rounded-2xl border border-[#E3D9C7] shadow-xl p-6 text-[#1C2826] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#7A8A83] hover:text-[#0F2E22] hover:bg-[#F4EFE6] rounded-lg transition-colors cursor-pointer"
          aria-label="Close seller settings"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 mb-2">
          <div className="p-2 rounded-lg bg-[#EFE8DC] text-[#0F2E22]">
            <Settings className="w-5 h-5 text-[#8C6D2D]" />
          </div>
          <div>
            <h3 id="seller-settings-title" className="text-lg font-serif font-bold text-[#0F2E22]">
              Seller WhatsApp Settings
            </h3>
            <p className="text-xs text-[#6B7C73]">
              Configure where customers send their COD orders.
            </p>
          </div>
        </div>

        <form onSubmit={handleSave} className="mt-4 space-y-4">
          <div>
            <label htmlFor="seller-phone-input" className="block text-xs font-semibold text-[#2D3B34] mb-1.5">
              Store Owner Pakistani WhatsApp Number
            </label>
            <input
              id="seller-phone-input"
              type="text"
              placeholder="0300 1234567 or 923001234567"
              value={inputVal}
              onChange={(e) => {
                setInputVal(e.target.value);
                setError(null);
              }}
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#D9CEBC] text-sm text-[#1C2826] bg-[#FAF8F5] focus:bg-white focus:outline-none focus:border-[#0F2E22] transition-colors tabular-nums"
              required
            />
            {error && <p className="mt-1 text-xs text-rose-600">{error}</p>}
            <p className="mt-1 text-[11px] text-[#718279]">
              Enter the WhatsApp number that will receive incoming customer orders.
            </p>
          </div>

          <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EBE3D3] text-xs flex items-center justify-between">
            <span className="text-[#55675F]">Test receiving connection:</span>
            <a
              href={testUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#25D366] hover:underline font-semibold inline-flex items-center gap-1"
            >
              <span>Test Chat</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-[#4A5551] hover:bg-[#F2ECE0] rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-[#0F2E22] hover:bg-[#163E2F] rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4 text-[#C5A059]" />
                  <span>Saved!</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 text-[#C5A059]" />
                  <span>Save Number</span>
                </>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
