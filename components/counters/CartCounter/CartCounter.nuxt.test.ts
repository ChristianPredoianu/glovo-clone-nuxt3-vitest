import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import CartCounter from '@/components/counters/CartCounter/CartCounter.vue';
import { useCart } from '@/composables/useCart';
import { ref } from 'vue';

// Mock the useCart composable
const mockNumberOfCartProducts = ref(0);
vi.mock('@/composables/useCart', () => ({
  useCart: () => ({
    numberOfCartProducts: mockNumberOfCartProducts,
  }),
}));

describe('CartCounter.vue', () => {
  let wrapper: any;

  beforeEach(() => {
    // Create a fresh wrapper for each test
    wrapper = mount(CartCounter);
  });

  it('renders the initial count', () => {
    expect(wrapper.text()).toContain('0');
  });

  it('updates the count when numberOfCartProducts changes', async () => {
    mockNumberOfCartProducts.value = 5;
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toContain('5');

    mockNumberOfCartProducts.value = 10;
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toContain('10');
  });
});
