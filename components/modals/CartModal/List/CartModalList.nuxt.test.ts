import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import CartModalList from '@/components/modals/CartModal/List/CartModalList.vue';

// Mock useCart
vi.mock('@/composables/useCart', () => ({
  useCart: () => ({
    cartProducts: [
      { id: 1, img: 'image1.jpg', quantity: 2, label: 'Product 1', price: 10.0 },
      { id: 2, img: 'image2.jpg', quantity: 1, label: 'Product 2', price: 20.0 },
    ],
    removeFromCart: vi.fn(),
  }),
}));

describe('CartModalList.vue', () => {
  it('renders cart products correctly', () => {
    const wrapper = mount(CartModalList);

    const items = wrapper.findAll('[data-test="product-li"]');
    expect(items).toHaveLength(2);

    items.forEach((item, index) => {
      const product = wrapper.vm.cartProducts[index];
      expect(item.find('img').attributes('src')).toBe(product.img);
      expect(item.find('.text-lg').text()).toBe(`${product.quantity}x`);
      expect(item.find('.text-sm').text()).toBe(product.label);
      expect(item.find('.font-semibold').text()).toBe(`${product.price.toFixed(2)} $`);
    });
  });

  it('calls removeFromCart when clicking the remove button', async () => {
    const wrapper = mount(CartModalList);
    const removeFromCart = wrapper.vm.removeFromCart;

    await wrapper.find('[data-test="product-li"] p:last-child').trigger('click');
    expect(removeFromCart).toHaveBeenCalledWith(1);
  });
});
