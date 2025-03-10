import { mount, VueWrapper } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import CartModalList from '@/components/modals/CartModal/List/CartModalList.vue';

const cartProducts = [
  { id: 1, img: '/glovo.jpg', quantity: 2, label: 'Product 1', price: 10.0 },
  { id: 2, img: '/glovo.jpg', quantity: 1, label: 'Product 2', price: 20.0 },
];

const removeFromCartMock = vi.fn();
vi.mock('@/composables/useCart', () => ({
  useCart: () => ({
    cartProducts: [
      { id: 1, img: '/glovo.jpg', quantity: 2, label: 'Product 1', price: 10.0 },
      { id: 2, img: '/glovo.jpg', quantity: 1, label: 'Product 2', price: 20.0 },
    ],
    removeFromCart: removeFromCartMock,
  }),
}));

describe('CartModalList', () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = mount(CartModalList);
  });

  it('renders cart products correctly', () => {
    const items = wrapper.findAll('[data-test="product-li"]');
    expect(items).toHaveLength(2);

    items.forEach((item: VueWrapper, index: number) => {
      const product = cartProducts[index];
      expect(item.find('img').attributes('src')).toBe(product.img);
      expect(item.find('.text-lg').text()).toBe(`${product.quantity}x`);
      expect(item.find('.text-sm').text()).toBe(product.label);
      expect(item.find('.font-semibold').text()).toBe(`${product.price.toFixed(2)} $`);
    });
  });

  it('calls removeFromCart when clicking the remove button', async () => {
    await wrapper.find('[data-test="product-li"] p:last-child').trigger('click');
    expect(removeFromCartMock).toHaveBeenCalledWith(1);
  });
});
