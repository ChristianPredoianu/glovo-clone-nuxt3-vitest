import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import CartModalOverlay from '@/components/modals/CartModal/Overlay/CartModalOverlay.vue';

// Mock useCart composable
const mockUseCart = (numberOfCartProducts, updatedTotalPrice) => {
  vi.mock('@/composables/useCart', () => ({
    useCart: () => ({
      numberOfCartProducts: { value: numberOfCartProducts },
      updatedTotalPrice: { value: updatedTotalPrice },
    }),
  }));
};

describe('CartModalOverlay', () => {
  it('renders correctly when there are products in the cart', () => {
    mockUseCart(2, 50.0);
    const wrapper = mount(CartModalOverlay);

    expect(wrapper.find('section').exists()).toBe(true);

    expect(wrapper.find('h3').text()).toBe('Your order');
    expect(wrapper.findComponent({ name: 'CartModalList' }).exists()).toBe(true);

    const ctaBtn = wrapper.findComponent({ name: 'CtaBtn' });
    expect(ctaBtn.exists()).toBe(true);
    expect(ctaBtn.text()).toBe('Order 2 for 50 $');
  });

  /*   it('renders correctly when there are no products in the cart', () => {
    mockUseCart(0, 0.0);
    const wrapper = mount(CartModalOverlay);

    // Check if the empty cart message is visible
    expect(wrapper.find('h4').text()).toBe("You've not added any products yet. When you do, you'll see them here!");

    // Check if the empty cart image is visible
    expect(wrapper.find('img').attributes('src')).toBe('@/public/empty-cart.svg');
  }); */
});
