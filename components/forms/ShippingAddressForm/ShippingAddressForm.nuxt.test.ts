import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import ShippingForm from '@/components/forms/ShippingAddressForm/ShippingAddressForm.vue'; // Adjust the path
import { ref } from 'vue';

vi.mock('@/composables/firebase/auth/useAuth', () => ({
  useAuth: () => ({
    user: ref({
      uid: 'test-uid',
    }),
    isAuthReady: ref(true),
  }),
}));

vi.mock('@/composables/form-validations/useShippingFormValidation', () => ({
  default: () => ({
    validateStreetAndHouseNumber: vi.fn(),
    validateEuropeanZipCode: vi.fn(),
    validateCityOrCountry: vi.fn(),
    validateAllFields: vi.fn(() => true),
    errors: ref({
      streetAndHouseNumber: '',
      zipCode: '',
      city: '',
      country: '',
    }),
  }),
}));

vi.mock('@/composables/firebase/useFirebaseAddressActions', () => ({
  fetchAddressInfo: vi.fn(),
}));

vi.mock('#imports', () => ({
  useNuxtApp: () => ({
    $database: {},
  }),
}));

describe('ShippingForm', () => {
  let wrapper: any;

  beforeEach(async () => {
    wrapper = mount(ShippingForm, {});

    await flushPromises();
  });

  it('renders the form with input fields', () => {
    expect(wrapper.find('form').exists()).toBe(true);

    expect(wrapper.find('input[name="street"]').exists()).toBe(true);
    expect(wrapper.find('input[name="zip code"]').exists()).toBe(true);
    expect(wrapper.find('input[name="city"]').exists()).toBe(true);
    expect(wrapper.find('input[name="country"]').exists()).toBe(true);
  });

  it('emits submitForm event when the form is submitted', async () => {
    await wrapper.find('form').trigger('submit.prevent');

    expect(wrapper.emitted('submitForm')).toBeTruthy();
    expect(wrapper.emitted('submitForm')[0]).toEqual([
      {
        streetAndHouseNumber: '',
        zipCode: '',
        city: '',
        country: '',
      },
    ]);
  });

  it('emits emitFields event when the form fields are empty', async () => {
    expect(wrapper.emitted('emitFields')).toBeTruthy();
    expect(wrapper.emitted('emitFields')[0]).toEqual([true]);
  });

  it('displays validation errors for invalid input fields', async () => {
    wrapper.vm.errors.streetAndHouseNumber = 'Street and house number is required';
    wrapper.vm.errors.zipCode = 'Invalid zip code';
    wrapper.vm.errors.city = 'City is required';
    wrapper.vm.errors.country = 'Country is required';

    await wrapper.vm.$nextTick();

    expect(wrapper.find('.text-red-600').text()).toBe(
      'Street and house number is required'
    );
    expect(wrapper.findAll('.text-red-600')[1].text()).toBe('Invalid zip code');
    expect(wrapper.findAll('.text-red-600')[2].text()).toBe('City is required');
    expect(wrapper.findAll('.text-red-600')[3].text()).toBe('Country is required');
  });
});
