import { mount, VueWrapper } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ProductCounter from '@/components/counters/ProductCounter/ProductCounter.vue';

// Initialize mocks outside the vi.mock call
const mockAddToCart = vi.fn();
const mockRemoveFromCart = vi.fn();

vi.mock('@/composables/useCart', () => ({
  useCart: () => ({
    addToCart: mockAddToCart,
    removeFromCart: mockRemoveFromCart,
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

  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    wrapper = mount(ProductCounter, {
      props: {
        quantity: 5,
        product: mockProduct,
      },
    });
  });

  it('renders the correct quantity', () => {
    const quantityElement = wrapper.find('[data-test="quantity"]');
    expect(quantityElement.exists()).toBe(true);
    expect(quantityElement.text()).toBe('5');
  });

  it('calls removeFromCart when "-" button is clicked', async () => {
    const removeButton = wrapper.find('[data-test="remove-btn"]');
    await removeButton.trigger('click');
    expect(mockRemoveFromCart).toHaveBeenCalledWith(mockProduct.id);
  });

  it('calls addToCart when "+" button is clicked', async () => {
    const addButton = wrapper.find('[data-test="add-btn"]');
    await addButton.trigger('click');
    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct);
  });
});
