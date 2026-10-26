/**
 * Order calculation, Pakistani phone validation, UTM parsing, and WhatsApp link generation.
 */

export interface OrderFormData {
  fullName: string;
  phone: string;
  city: string;
  customCity?: string;
  address: string;
  quantity: number; // 1, 2, or 3
  instructions?: string;
}

export interface FormErrors {
  fullName?: string;
  phone?: string;
  city?: string;
  address?: string;
  quantity?: string;
}

export interface UtmParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

export interface OrderPayload extends OrderFormData {
  subtotal: number;
  deliveryFee: number;
  finalTotal: number;
  utmParams?: UtmParams;
}

export const UNIT_PRICE = 2000; // PKR 2,000 per 50g jar
export const DEFAULT_DELIVERY_FEE = 0; // Free Cash on Delivery nationwide

export const POPULAR_PAKISTANI_CITIES = [
  'Karachi',
  'Lahore',
  'Islamabad',
  'Rawalpindi',
  'Faisalabad',
  'Multan',
  'Peshawar',
  'Quetta',
  'Sialkot',
  'Gujranwala',
  'Hyderabad',
  'Abbottabad',
  'Bahawalpur',
  'Sargodha',
  'Sukkur',
  'Sheikhupura',
  'Jhelum',
  'Gujrat',
  'Mardan',
  'Wah Cantt',
  'Other / Not in list',
];

/**
 * Calculates subtotal based on unit quantity:
 * 1 unit = PKR 2,000
 * 2 units = PKR 4,000
 * 3 units = PKR 6,000
 */
export function calculateSubtotal(quantity: number): number {
  const validQty = Math.max(1, Math.min(3, Math.floor(quantity) || 1));
  return validQty * UNIT_PRICE;
}

/**
 * Returns delivery fee. Free delivery across Pakistan.
 */
export function getDeliveryFee(): number {
  return DEFAULT_DELIVERY_FEE;
}

/**
 * Calculates final total before order confirmation.
 */
export function calculateFinalTotal(quantity: number, deliveryFee = DEFAULT_DELIVERY_FEE): number {
  return calculateSubtotal(quantity) + deliveryFee;
}

/**
 * Validates a Pakistani mobile number.
 * Accepts:
 * - 03001234567 or 0300 1234567 or 0300-1234567
 * - +923001234567 or 923001234567 or 00923001234567
 */
export function validatePakistanPhone(input: string): {
  isValid: boolean;
  cleanDigits?: string;
  international?: string;
  display?: string;
  error?: string;
} {
  if (!input || !input.trim()) {
    return {
      isValid: false,
      error: 'Please enter your Pakistani mobile number.',
    };
  }

  // Strip spaces, dashes, brackets, plus signs
  let cleaned = input.replace(/[\s\-\(\)\+]/g, '');

  // Handle leading 0092
  if (cleaned.startsWith('0092')) {
    cleaned = '92' + cleaned.slice(4);
  }

  // Case 1: Starts with 03 (e.g. 03001234567) -> 11 digits
  if (/^03\d{9}$/.test(cleaned)) {
    const international = '92' + cleaned.slice(1);
    const display = `${cleaned.slice(0, 4)} ${cleaned.slice(4)}`;
    return {
      isValid: true,
      cleanDigits: cleaned,
      international,
      display,
    };
  }

  // Case 2: Starts with 923 (e.g. 923001234567) -> 12 digits
  if (/^923\d{9}$/.test(cleaned)) {
    const local = '0' + cleaned.slice(2);
    const display = `${local.slice(0, 4)} ${local.slice(4)}`;
    return {
      isValid: true,
      cleanDigits: local,
      international: cleaned,
      display,
    };
  }

  // Case 3: 10 digits starting with 3 (e.g. 3001234567)
  if (/^3\d{9}$/.test(cleaned)) {
    const local = '0' + cleaned;
    const international = '92' + cleaned;
    const display = `${local.slice(0, 4)} ${local.slice(4)}`;
    return {
      isValid: true,
      cleanDigits: local,
      international,
      display,
    };
  }

  return {
    isValid: false,
    error: 'Invalid Pakistani mobile number. Must be an 11-digit number starting with 03 (e.g., 0300 1234567).',
  };
}

/**
 * Format live phone input for smooth user experience.
 */
export function formatPhoneInput(value: string): string {
  const digits = value.replace(/\D/g, '');
  if (digits.startsWith('92')) {
    // International input: 92 3XX XXXXXXX
    if (digits.length <= 2) return '+' + digits;
    if (digits.length <= 5) return `+${digits.slice(0, 2)} ${digits.slice(2)}`;
    return `+${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5, 12)}`;
  }
  // Local 03XX XXXXXXX
  if (digits.length <= 4) return digits;
  return `${digits.slice(0, 4)} ${digits.slice(4, 11)}`;
}

/**
 * Parses UTM tracking parameters from URL search string.
 */
export function parseUtmParams(search: string): UtmParams {
  const params: UtmParams = {};
  if (!search) return params;

  try {
    const searchParams = new URLSearchParams(search);
    const keys: (keyof UtmParams)[] = [
      'utm_source',
      'utm_medium',
      'utm_campaign',
      'utm_term',
      'utm_content',
    ];

    keys.forEach((key) => {
      const val = searchParams.get(key);
      if (val && val.trim()) {
        params[key] = val.trim();
      }
    });
  } catch {
    // Ignore invalid search strings
  }

  return params;
}

/**
 * Validates the entire order form and returns any validation errors.
 */
export function validateOrderForm(data: OrderFormData): {
  isValid: boolean;
  errors: FormErrors;
} {
  const errors: FormErrors = {};

  // Full Name validation
  const nameTrimmed = data.fullName ? data.fullName.trim() : '';
  if (!nameTrimmed) {
    errors.fullName = 'Please enter your full name.';
  } else if (nameTrimmed.length < 3) {
    errors.fullName = 'Full name must be at least 3 characters.';
  }

  // Phone validation
  const phoneValidation = validatePakistanPhone(data.phone);
  if (!phoneValidation.isValid) {
    errors.phone = phoneValidation.error || 'Please enter a valid Pakistani mobile number.';
  }

  // City validation
  if (!data.city || !data.city.trim()) {
    errors.city = 'Please select or enter your city.';
  } else if (data.city === 'Other / Not in list' && (!data.customCity || data.customCity.trim().length < 2)) {
    errors.city = 'Please type your city name.';
  }

  // Address validation
  const addressTrimmed = data.address ? data.address.trim() : '';
  if (!addressTrimmed) {
    errors.address = 'Please provide your complete delivery address for courier dispatch.';
  } else if (addressTrimmed.length < 8) {
    errors.address = 'Please enter complete house/flat number, street and area.';
  }

  // Quantity validation
  if (![1, 2, 3].includes(data.quantity)) {
    errors.quantity = 'Please select a valid quantity (1, 2, or 3 jars).';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Generates formatted WhatsApp order message string.
 */
export function generateWhatsAppOrderMessage(order: OrderPayload): string {
  const effectiveCity =
    order.city === 'Other / Not in list' && order.customCity
      ? order.customCity.trim()
      : order.city;

  const phoneDisplay = validatePakistanPhone(order.phone).display || order.phone;

  const utmLines: string[] = [];
  if (order.utmParams) {
    if (order.utmParams.utm_source) utmLines.push(`• Source: ${order.utmParams.utm_source}`);
    if (order.utmParams.utm_medium) utmLines.push(`• Medium: ${order.utmParams.utm_medium}`);
    if (order.utmParams.utm_campaign) utmLines.push(`• Campaign: ${order.utmParams.utm_campaign}`);
    if (order.utmParams.utm_term) utmLines.push(`• Term: ${order.utmParams.utm_term}`);
    if (order.utmParams.utm_content) utmLines.push(`• Content: ${order.utmParams.utm_content}`);
  }

  const message = [
    `*NEW COD ORDER - TWG SKINCARE PAKISTAN*`,
    `━━━━━━━━━━━━━━━━━━━━━━━`,
    `*Product:* TWG Dragon Blood Premium Skin Care Cream (50g)`,
    `*Quantity:* ${order.quantity} ${order.quantity === 1 ? 'Jar' : 'Jars'}`,
    `*Subtotal:* PKR ${order.subtotal.toLocaleString()}`,
    `*Delivery Charges:* ${order.deliveryFee === 0 ? 'FREE (Cash on Delivery)' : `PKR ${order.deliveryFee.toLocaleString()}`}`,
    `*Final Total:* PKR ${order.finalTotal.toLocaleString()}`,
    `*Payment Method:* Cash on Delivery (COD)`,
    ``,
    `*CUSTOMER DELIVERY DETAILS:*`,
    `• Name: ${order.fullName.trim()}`,
    `• Mobile: ${phoneDisplay}`,
    `• City: ${effectiveCity}`,
    `• Complete Address: ${order.address.trim()}`,
    order.instructions?.trim() ? `• Order Notes / Instructions: ${order.instructions.trim()}` : null,
    ``,
    utmLines.length > 0 ? `*TRACKING ATTRIBUTION:*\n${utmLines.join('\n')}\n` : null,
    `━━━━━━━━━━━━━━━━━━━━━━━`,
    `Assalam-o-Alaikum TWG team, please confirm dispatch details for this order. Thank you!`,
  ]
    .filter((line) => line !== null)
    .join('\n');

  return message;
}

/**
 * Generates the official click-to-chat WhatsApp URL (wa.me format).
 * Ensures phone number is clean international format and uses official business number.
 */
export function buildWhatsAppUrl(rawSellerPhone: string, message: string): string {
  // Strip non-digits
  let cleanNumber = (rawSellerPhone || '').replace(/\D/g, '');

  // If number is empty, default or has placeholder
  if (!cleanNumber || rawSellerPhone === 'REPLACE_WITH_MY_NUMBER' || cleanNumber === '923001234567') {
    cleanNumber = '923156323093';
  } else if (cleanNumber.startsWith('03')) {
    cleanNumber = '92' + cleanNumber.slice(1);
  } else if (cleanNumber.startsWith('0092')) {
    cleanNumber = '92' + cleanNumber.slice(4);
  }

  const encodedText = encodeURIComponent(message);
  return `https://wa.me/${cleanNumber}?text=${encodedText}`;
}
