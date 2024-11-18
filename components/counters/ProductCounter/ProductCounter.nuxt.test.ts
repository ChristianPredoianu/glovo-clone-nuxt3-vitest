import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import ProductCounter from '@/components/counters/ProductCounter/ProductCounter.vue';
import { useCart } from '@/composables/useCart';

vi.mock('@/composables/useCart', () => ({
  useCart: vi.fn().mockReturnValue({
    addToCart: vi.fn(),
    removeFromCart: vi.fn(),
  }),
}));

describe('ProductCounter', () => {
  const mockProduct = {
    id: '123',
    label: 'Test Product',
    img: 'https://example.com/product.jpg',
    price: 100,
    quantity: 2,
  };

  it('renders the correct quantity', () => {
    const wrapper = mount(ProductCounter, {
      props: {
        quantity: 5,
        product: mockProduct,
      },
    });

    const quantityElement = wrapper.find('[data-test="quantity"]');
    expect(quantityElement.exists()).toBe(true);
    expect(quantityElement.text()).toBe('5');
  });

  it('calls removeFromCart when "-" button is clicked', async () => {
    const { removeFromCart } = useCart();
    const wrapper = mount(ProductCounter, {
      props: {
        quantity: 5,
        product: mockProduct,
      },
    });

    const removeButton = wrapper.find('[data-test="remove-btn"]');
    await removeButton.trigger('click');

    expect(removeFromCart).toHaveBeenCalledWith(mockProduct.id);
  });

  it('calls addToCart when "+" button is clicked', async () => {
    const { addToCart } = useCart();
    const wrapper = mount(ProductCounter, {
      props: {
        quantity: 5,
        product: mockProduct,
      },
    });

    const addButton = wrapper.find('[data-test="add-btn"]');
    await addButton.trigger('click');

    expect(addToCart).toHaveBeenCalledWith(mockProduct);
  });
});
