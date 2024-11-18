import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { ref } from 'vue';
import type { ComponentInternalInstance } from 'vue';
import CartCounter from '@/components/counters/CartCounter/CartCounter.vue';

const mockCartProducts = ref(0);
vi.mock('@/composables/useCart', () => ({
  useCart: () => ({
    numberOfCartProducts: mockCartProducts,
  }),
}));

describe('CartCounter.vue', () => {
  it('renders the initial product count', () => {
    const wrapper = mount(CartCounter);

    expect(wrapper.find('span').text()).toBe('0');
  });

  it('updates the product count when numberOfCartProducts changes', async () => {
    const wrapper = mount(CartCounter);

    mockCartProducts.value = 5;

    await wrapper.vm.$nextTick();

    expect(wrapper.find('span').text()).toBe('5');
  });

  it('increments the numberKey when product count changes', async () => {
    const wrapper = mount(CartCounter);

    const vm = wrapper.vm.$ as ComponentInternalInstance;

    const numberKey = wrapper.vm.numberKey;

    expect(numberKey).toBe(0);

    mockCartProducts.value = 3;

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.numberKey).toBe(1);
  });
});
