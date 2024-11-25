import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import CartModalOverlay from '@/components/modals/CartModal/Overlay/CartModalOverlay.vue';

// Mock the useCart composable globally
vi.mock('@/composables/useCart', () => ({
  useCart: vi.fn(), // We'll customize it in each test using vi.mocked
}));

// Import the mocked composable function
import { useCart } from '@/composables/useCart';

describe('CartModalOverlay', () => {
  beforeEach(() => {
    vi.resetAllMocks(); // Reset all mocks before each test
  });

  it('renders correctly when there are products in the cart', () => {
    // Set up mock values for this specific test
    useCart.mockReturnValue({
      numberOfCartProducts: { value: 2 },
      updatedTotalPrice: { value: 50.0 },
    });

    const wrapper = mount(CartModalOverlay);

    expect(wrapper.find('section').exists()).toBe(true);
    expect(wrapper.find('h3').text()).toBe('Your order');
    expect(wrapper.findComponent({ name: 'CartModalList' }).exists()).toBe(true);

    const ctaBtn = wrapper.findComponent({ name: 'CtaBtn' });
    expect(ctaBtn.exists()).toBe(true);
    expect(ctaBtn.text()).toBe('Order 2 for 50 $');
  });

  it('renders correctly when there are no products in the cart', () => {
    // Set up mock values for an empty cart
    useCart.mockReturnValue({
      numberOfCartProducts: ref(0),
      updatedTotalPrice: ref(0),
    });

    const wrapper = mount(CartModalOverlay);

    // Print the rendered HTML to debug
    console.log(wrapper.html());

    // Use find with additional checks or findComponent for accuracy
    const emptyCartMessage = wrapper.find('h4');
    expect(emptyCartMessage.exists()).toBe(true); // Ensure the element exists
    expect(emptyCartMessage.text().trim()).toBe(
      "You've not added any products yet. When you do, you'll see them here!"
    );
  });
});
