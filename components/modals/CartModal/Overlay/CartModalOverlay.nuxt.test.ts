import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import CartModalOverlay from '@/components/modals/CartModal/Overlay/CartModalOverlay.vue';

const mockNumberOfCartProducts = ref(2);
const mockUpdatedTotalPrice = ref(50.0);

vi.mock('@/composables/useCart', () => ({
  useCart: () => ({
    numberOfCartProducts: mockNumberOfCartProducts,
    updatedTotalPrice: mockUpdatedTotalPrice,
  }),
}));

describe('CartModalOverlay', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('renders correctly when there are products in the cart', () => {
    mockNumberOfCartProducts.value = 2;
    mockUpdatedTotalPrice.value = 50.0;

    const wrapper = mount(CartModalOverlay);

    expect(wrapper.find('section').exists()).toBe(true);
    expect(wrapper.find('h3').text()).toBe('Your order');
    expect(wrapper.findComponent({ name: 'CartModalList' }).exists()).toBe(true);

    const ctaBtn = wrapper.findComponent({ name: 'CtaBtn' });
    expect(ctaBtn.exists()).toBe(true);
    expect(ctaBtn.text()).toBe('Order 2 for 50 $');
  });

  it('renders correctly when there are no products in the cart', () => {
    mockNumberOfCartProducts.value = 0;
    mockUpdatedTotalPrice.value = 0;

    const wrapper = mount(CartModalOverlay);

    const emptyCartMessage = wrapper.find('h4');
    expect(emptyCartMessage.exists()).toBe(true);
    expect(emptyCartMessage.text().trim()).toBe(
      "You've not added any products yet. When you do, you'll see them here!"
    );
  });
});
