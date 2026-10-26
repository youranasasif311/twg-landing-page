import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateSubtotal,
  calculateFinalTotal,
  getDeliveryFee,
  validatePakistanPhone,
  validateOrderForm,
  parseUtmParams,
  generateWhatsAppOrderMessage,
  buildWhatsAppUrl,
  UNIT_PRICE,
} from './order.ts';

test('Order calculations: unit price and subtotals', () => {
  assert.equal(UNIT_PRICE, 2000);
  assert.equal(calculateSubtotal(1), 2000);
  assert.equal(calculateSubtotal(2), 4000);
  assert.equal(calculateSubtotal(3), 6000);

  // Delivery fee is transparent and 0 for nationwide COD
  assert.equal(getDeliveryFee(), 0);
  assert.equal(calculateFinalTotal(1, 0), 2000);
  assert.equal(calculateFinalTotal(2, 0), 4000);
  assert.equal(calculateFinalTotal(3, 0), 6000);
});

test('Pakistani phone validation: handles 03XX, spaces, dashes and +92 correctly', () => {
  // Standard 11-digit local format
  const res1 = validatePakistanPhone('03001234567');
  assert.equal(res1.isValid, true);
  assert.equal(res1.international, '923001234567');
  assert.equal(res1.display, '0300 1234567');

  // Formatted with space or hyphen
  const res2 = validatePakistanPhone('0321-7654321');
  assert.equal(res2.isValid, true);
  assert.equal(res2.international, '923217654321');

  // International format +92
  const res3 = validatePakistanPhone('+92 333 5551234');
  assert.equal(res3.isValid, true);
  assert.equal(res3.international, '923335551234');

  // 10 digits without leading 0 (common user shortcut: 3001234567)
  const res4 = validatePakistanPhone('3001234567');
  assert.equal(res4.isValid, true);
  assert.equal(res4.international, '923001234567');

  // Invalid numbers
  assert.equal(validatePakistanPhone('').isValid, false);
  assert.equal(validatePakistanPhone('12345').isValid, false);
  assert.equal(validatePakistanPhone('04231234567').isValid, false); // Landline
  assert.equal(validatePakistanPhone('0300abcd123').isValid, false);
});

test('Form validation: validates all required fields with clear feedback', () => {
  // Missing all fields
  const emptyRes = validateOrderForm({
    fullName: '',
    phone: '',
    city: '',
    address: '',
    quantity: 1,
  });
  assert.equal(emptyRes.isValid, false);
  assert.ok(emptyRes.errors.fullName);
  assert.ok(emptyRes.errors.phone);
  assert.ok(emptyRes.errors.city);
  assert.ok(emptyRes.errors.address);

  // Valid order form
  const validRes = validateOrderForm({
    fullName: 'Fatima Tariq',
    phone: '0301 9876543',
    city: 'Lahore',
    address: 'House 45, Street 8, Phase 5 DHA',
    quantity: 2,
    instructions: 'Ring bell on arrival',
  });
  assert.equal(validRes.isValid, true);
  assert.equal(Object.keys(validRes.errors).length, 0);

  // Custom city validation
  const customCityRes = validateOrderForm({
    fullName: 'Fatima Tariq',
    phone: '0301 9876543',
    city: 'Other / Not in list',
    customCity: '',
    address: 'Main Bazar near Post Office',
    quantity: 1,
  });
  assert.equal(customCityRes.isValid, false);
  assert.ok(customCityRes.errors.city);
});

test('UTM Parameter parsing: extracts source, medium, campaign correctly', () => {
  const search = '?utm_source=tiktok&utm_medium=video&utm_campaign=glow_season&ref=skip';
  const utm = parseUtmParams(search);
  assert.equal(utm.utm_source, 'tiktok');
  assert.equal(utm.utm_medium, 'video');
  assert.equal(utm.utm_campaign, 'glow_season');
  assert.equal(utm.utm_term, undefined);
});

test('WhatsApp message generation & wa.me URL creation', () => {
  const message = generateWhatsAppOrderMessage({
    fullName: 'Zainab Bibi',
    phone: '03001234567',
    city: 'Islamabad',
    address: 'Flat 4B, Beverly Center, Blue Area',
    quantity: 2,
    subtotal: 4000,
    deliveryFee: 0,
    finalTotal: 4000,
    instructions: 'Call before delivery',
    utmParams: {
      utm_source: 'instagram',
      utm_campaign: 'skincare_pakistan',
    },
  });

  assert.ok(message.includes('TWG Dragon Blood Premium Skin Care Cream (50g)'));
  assert.ok(message.includes('2 Jars'));
  assert.ok(message.includes('PKR 4,000'));
  assert.ok(message.includes('Cash on Delivery (COD)'));
  assert.ok(message.includes('Zainab Bibi'));
  assert.ok(message.includes('Islamabad'));
  assert.ok(message.includes('instagram'));

  // Test URL generator replaces placeholder with valid business number +923156323093
  const urlWithPlaceholder = buildWhatsAppUrl('REPLACE_WITH_MY_NUMBER', message);
  assert.ok(!urlWithPlaceholder.includes('REPLACE_WITH_MY_NUMBER'));
  assert.ok(urlWithPlaceholder.startsWith('https://wa.me/923156323093?text='));

  // Test with user's business number +923156323093
  const urlBusiness = buildWhatsAppUrl('+923156323093', message);
  assert.ok(urlBusiness.startsWith('https://wa.me/923156323093?text='));

  // Test with custom Pakistani seller number
  const urlCustom = buildWhatsAppUrl('0333 1234567', message);
  assert.ok(urlCustom.startsWith('https://wa.me/923331234567?text='));
});
