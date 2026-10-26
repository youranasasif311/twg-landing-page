import React, { useState, useEffect } from 'react';
import {
  OrderFormData,
  FormErrors,
  OrderPayload,
  calculateSubtotal,
  getDeliveryFee,
  calculateFinalTotal,
  validateOrderForm,
  formatPhoneInput,
  POPULAR_PAKISTANI_CITIES,
  generateWhatsAppOrderMessage,
  buildWhatsAppUrl,
  UtmParams,
} from '../utils/order.ts';
import { Truck, Check, MessageSquare, AlertCircle, ShoppingBag, ShieldCheck } from 'lucide-react';

interface OrderFormSectionProps {
  sellerWhatsApp: string;
  utmParams: UtmParams;
  onOrderPrepared: (payload: OrderPayload, waUrl: string) => void;
}

export const OrderFormSection: React.FC<OrderFormSectionProps> = ({
  sellerWhatsApp,
  utmParams,
  onOrderPrepared,
}) => {
  const [formData, setFormData] = useState<OrderFormData>({
    fullName: '',
    phone: '',
    city: 'Karachi',
    customCity: '',
    address: '',
    quantity: 1,
    instructions: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const subtotal = calculateSubtotal(formData.quantity);
  const deliveryFee = getDeliveryFee();
  const finalTotal = calculateFinalTotal(formData.quantity, deliveryFee);

  // Live validation on blur
  const handleBlur = (field: keyof OrderFormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const result = validateOrderForm(formData);
    setErrors(result.errors);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneInput(e.target.value);
    setFormData((prev) => ({ ...prev, phone: formatted }));
    if (touched.phone) {
      const result = validateOrderForm({ ...formData, phone: formatted });
      setErrors((prev) => ({ ...prev, phone: result.errors.phone }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({
      fullName: true,
      phone: true,
      city: true,
      address: true,
      quantity: true,
    });

    const validation = validateOrderForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      // Find first error and scroll to it
      const firstErrorField = Object.keys(validation.errors)[0];
      const element = document.getElementById(`field-${firstErrorField}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.focus();
      }
      return;
    }

    // Prepare complete payload
    const payload: OrderPayload = {
      ...formData,
      subtotal,
      deliveryFee,
      finalTotal,
      utmParams,
    };

    // Generate WhatsApp Message & URL
    const message = generateWhatsAppOrderMessage(payload);
    const waUrl = buildWhatsAppUrl(sellerWhatsApp, message);

    // Call parent handler to open modal and proceed to WhatsApp
    onOrderPrepared(payload, waUrl);
  };

  return (
    <section id="order-form" className="py-14 sm:py-20 bg-[#F5EFE6] border-t border-[#E5DBC7]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Heading */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8DFC9] text-[#7A6436] text-xs font-semibold uppercase tracking-wider mb-2">
            <Truck className="w-3.5 h-3.5 text-[#0F2E22]" />
            <span>Cash on Delivery across Pakistan</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0F2E22] mb-2">
            Order Your Cream Now
          </h2>
          <p className="text-sm text-[#55675F]">
            Fill out your delivery details below. No advance payment required. Pay when you receive your parcel at your doorstep.
          </p>
        </div>

        {/* Main Form Box */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="bg-white rounded-2xl p-6 sm:p-10 border border-[#E3D9C7] shadow-sm"
        >
          {/* STEP 1: Select Quantity */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-bold text-[#0F2E22] flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#0F2E22] text-white text-xs flex items-center justify-center font-sans">
                  1
                </span>
                <span>Select Quantity (50g per jar)</span>
              </label>
              <span className="text-xs text-[#7A8A83]">PKR 2,000 / Jar</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { qty: 1, label: '1 Jar', sub: 'PKR 2,000', note: 'Standard Single Order' },
                { qty: 2, label: '2 Jars', sub: 'PKR 4,000', note: 'Most Popular for 2-3 Months' },
                { qty: 3, label: '3 Jars', sub: 'PKR 6,000', note: 'Best Value for Family' },
              ].map((tier) => {
                const isSelected = formData.quantity === tier.qty;
                return (
                  <button
                    key={tier.qty}
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, quantity: tier.qty }))}
                    className={`p-4 rounded-xl border-2 text-left transition-all cursor-pointer relative ${
                      isSelected
                        ? 'border-[#0F2E22] bg-[#FAF8F4] ring-2 ring-[#C5A059]/20 shadow-xs'
                        : 'border-[#EAE3D6] hover:border-[#C5A059] bg-white'
                    }`}
                  >
                    {isSelected && (
                      <span className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[#0F2E22] text-white flex items-center justify-center text-xs">
                        <Check className="w-3 h-3 text-[#C5A059]" />
                      </span>
                    )}
                    <div className="text-sm font-bold text-[#0F2E22]">{tier.label}</div>
                    <div className="text-base font-serif font-bold text-[#8C6D2D] my-0.5 tabular-nums">
                      {tier.sub}
                    </div>
                    <div className="text-[11px] text-[#697A72]">{tier.note}</div>
                  </button>
                );
              })}
            </div>
            {errors.quantity && (
              <p className="mt-1 text-xs text-rose-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.quantity}
              </p>
            )}
          </div>

          {/* STEP 2: Customer Details */}
          <div className="mb-8 border-t border-[#F0EAE0] pt-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-5 h-5 rounded-full bg-[#0F2E22] text-white text-xs flex items-center justify-center font-sans">
                2
              </span>
              <span className="text-sm font-bold text-[#0F2E22]">Your Delivery Details</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Customer Full Name */}
              <div>
                <label htmlFor="field-fullName" className="block text-xs font-semibold text-[#2D3B34] mb-1.5">
                  Customer Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  id="field-fullName"
                  type="text"
                  placeholder="e.g. Ayesha Khan / Muhammad Ali"
                  value={formData.fullName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
                  onBlur={() => handleBlur('fullName')}
                  className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-[#1C2826] bg-[#FAF8F5] focus:bg-white focus:outline-none transition-colors ${
                    errors.fullName && touched.fullName
                      ? 'border-rose-400 focus:border-rose-500 ring-1 ring-rose-200'
                      : 'border-[#D9CEBC] focus:border-[#0F2E22] focus:ring-1 focus:ring-[#0F2E22]'
                  }`}
                  required
                />
                {errors.fullName && touched.fullName && (
                  <p className="mt-1 text-xs text-rose-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    {errors.fullName}
                  </p>
                )}
              </div>

              {/* Pakistani Mobile Number */}
              <div>
                <label htmlFor="field-phone" className="block text-xs font-semibold text-[#2D3B34] mb-1.5">
                  Pakistani Mobile Number <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    id="field-phone"
                    type="tel"
                    placeholder="0300 1234567"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    onBlur={() => handleBlur('phone')}
                    className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-[#1C2826] bg-[#FAF8F5] focus:bg-white focus:outline-none transition-colors tabular-nums ${
                      errors.phone && touched.phone
                        ? 'border-rose-400 focus:border-rose-500 ring-1 ring-rose-200'
                        : 'border-[#D9CEBC] focus:border-[#0F2E22] focus:ring-1 focus:ring-[#0F2E22]'
                    }`}
                    required
                  />
                </div>
                <div className="flex items-center justify-between mt-1">
                  {errors.phone && touched.phone ? (
                    <p className="text-xs text-rose-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      {errors.phone}
                    </p>
                  ) : (
                    <p className="text-[11px] text-[#718279]">
                      Enter active number for courier dispatch confirmation call.
                    </p>
                  )}
                </div>
              </div>

              {/* City Selection */}
              <div>
                <label htmlFor="field-city" className="block text-xs font-semibold text-[#2D3B34] mb-1.5">
                  City in Pakistan <span className="text-rose-500">*</span>
                </label>
                <select
                  id="field-city"
                  value={formData.city}
                  onChange={(e) => setFormData((prev) => ({ ...prev, city: e.target.value }))}
                  onBlur={() => handleBlur('city')}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#D9CEBC] text-sm text-[#1C2826] bg-[#FAF8F5] focus:bg-white focus:outline-none focus:border-[#0F2E22] focus:ring-1 focus:ring-[#0F2E22] transition-colors"
                  required
                >
                  {POPULAR_PAKISTANI_CITIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                {errors.city && touched.city && (
                  <p className="mt-1 text-xs text-rose-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    {errors.city}
                  </p>
                )}
              </div>

              {/* Custom City if "Other" */}
              {formData.city === 'Other / Not in list' && (
                <div>
                  <label htmlFor="field-customCity" className="block text-xs font-semibold text-[#2D3B34] mb-1.5">
                    Type Your City Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="field-customCity"
                    type="text"
                    placeholder="e.g. Sahiwal, Kasur, Swat..."
                    value={formData.customCity || ''}
                    onChange={(e) => setFormData((prev) => ({ ...prev, customCity: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#D9CEBC] text-sm text-[#1C2826] bg-[#FAF8F5] focus:bg-white focus:outline-none focus:border-[#0F2E22] focus:ring-1 focus:ring-[#0F2E22] transition-colors"
                    required
                  />
                </div>
              )}

              {/* Complete Delivery Address */}
              <div className="sm:col-span-2">
                <label htmlFor="field-address" className="block text-xs font-semibold text-[#2D3B34] mb-1.5">
                  Complete Delivery Address <span className="text-rose-500">*</span>
                </label>
                <textarea
                  id="field-address"
                  rows={2}
                  placeholder="House or Flat #, Street #, Sector / Area / Colony, Nearest Famous Landmark"
                  value={formData.address}
                  onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                  onBlur={() => handleBlur('address')}
                  className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-[#1C2826] bg-[#FAF8F5] focus:bg-white focus:outline-none transition-colors ${
                    errors.address && touched.address
                      ? 'border-rose-400 focus:border-rose-500 ring-1 ring-rose-200'
                      : 'border-[#D9CEBC] focus:border-[#0F2E22] focus:ring-1 focus:ring-[#0F2E22]'
                  }`}
                  required
                />
                {errors.address && touched.address && (
                  <p className="mt-1 text-xs text-rose-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    {errors.address}
                  </p>
                )}
              </div>

              {/* Delivery Instructions (Optional) */}
              <div className="sm:col-span-2">
                <label htmlFor="field-instructions" className="block text-xs font-semibold text-[#2D3B34] mb-1.5">
                  Special Delivery Instructions <span className="text-[#8B9891] font-normal">(Optional)</span>
                </label>
                <input
                  id="field-instructions"
                  type="text"
                  placeholder="e.g. Please call before arriving, or deliver after 3:00 PM"
                  value={formData.instructions || ''}
                  onChange={(e) => setFormData((prev) => ({ ...prev, instructions: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#D9CEBC] text-sm text-[#1C2826] bg-[#FAF8F5] focus:bg-white focus:outline-none focus:border-[#0F2E22] transition-colors"
                />
              </div>
            </div>
          </div>

          {/* STEP 3: Order Subtotal & Transparent Breakdown */}
          <div className="mb-6 p-5 rounded-xl bg-[#FAF8F5] border border-[#E8DFC9]">
            <div className="text-xs uppercase tracking-wider font-semibold text-[#6E7E76] mb-3">
              Order Summary & Payment
            </div>

            <div className="space-y-2 text-sm text-[#3E4D45]">
              <div className="flex justify-between">
                <span>TWG Dragon Blood Cream (50g) × {formData.quantity}</span>
                <span className="font-semibold tabular-nums">PKR {subtotal.toLocaleString()}</span>
              </div>

              <div className="flex justify-between items-center text-xs">
                <div className="flex items-center gap-1.5 text-[#0F2E22]">
                  <Truck className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Nationwide Courier Delivery</span>
                </div>
                <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  FREE (PKR 0)
                </span>
              </div>

              <div className="flex justify-between text-xs text-[#6B7C73]">
                <span>Payment Method</span>
                <span className="font-medium text-[#0F2E22]">Cash on Delivery (COD)</span>
              </div>

              <div className="pt-3 border-t border-[#E8DFC9] flex justify-between items-baseline">
                <span className="text-base font-bold text-[#0F2E22]">Final Amount to Pay:</span>
                <span className="text-2xl sm:text-3xl font-serif font-bold text-[#0F2E22] tabular-nums">
                  PKR {finalTotal.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* WHATSAPP ORDER BUTTON */}
          <div className="space-y-3">
            <button
              type="submit"
              className="w-full py-4 px-6 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-base sm:text-lg rounded-xl transition-all shadow-md hover:shadow-lg active:scale-[0.99] flex items-center justify-center gap-3 cursor-pointer group"
            >
              <MessageSquare className="w-5 h-5 fill-current text-white transition-transform group-hover:scale-110" />
              <span>Confirm Order on WhatsApp</span>
            </button>

            {/* Clear Order Submission Transparency Explanation */}
            <div className="p-3.5 rounded-lg bg-[#FAF8F5] border border-[#EAE3D6] text-xs text-[#5D6F66] text-center leading-relaxed">
              <p className="font-semibold text-[#0F2E22] mb-0.5">
                Notice: Your order is only submitted after you send the WhatsApp message.
              </p>
              <p>
                Clicking the button will open WhatsApp with your full order details pre-filled. Simply review and press <strong className="text-[#0F2E22]">Send</strong> to reach our customer support team.
              </p>
            </div>
          </div>

          {/* Trust badges */}
          <div className="mt-6 pt-5 border-t border-[#F2EDE4] grid grid-cols-3 gap-2 text-center text-[11px] sm:text-xs text-[#6C7E76]">
            <div>📦 Safe Sealed Box</div>
            <div>🇵🇰 Deliveries Across Pakistan</div>
            <div>💵 Pay Cash at Doorstep</div>
          </div>

        </form>

      </div>
    </section>
  );
};
