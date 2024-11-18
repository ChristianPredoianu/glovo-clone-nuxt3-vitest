import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import ProductCounter from '@/components/counters/ProductCounter/ProductCounter.vue';

// Mock the `useCart` composable to control `addToCart` and `removeFromCart`
vi.mock('@/composables/useCart', () => ({
  useCart: vi.fn().mockReturnValue({
    addToCart: vi.fn(),
    removeFromCart: vi.fn(),
  }),
}));

describe('QuantityControl.vue', () => {
  /*  const product = {
    id: 1,
    label: 'Sample Product',
    img: 'https://example.com/product.jpg',
    price: 29.99,
    quantity: 3, // Optional quantity to match the prop
  };

  it('renders the quantity correctly', () => {
    const wrapper = mount(ProductCounter, {
      props: {
        quantity: product.quantity, // Pass the quantity as a prop
        product: product, // Pass the full product object as a prop
      },
    });

    // Assert that the quantity is displayed correctly
    expect(wrapper.find('.border').text()).toBe('3'); // quantity is 3
  });
 */
  /* it('calls removeFromCart when "-" button is clicked', async () => {
    const { removeFromCart } = useCart();
    const wrapper = mount(ProductCounter, {
      props: {
        quantity: product.quantity, // Pass the quantity as a prop
        product: product,           // Pass the full product object as a prop
      },
    });

    // Find the "-" button and simulate a click
    await wrapper.find('.bg-gray-500').trigger('click');

    // Assert that the `removeFromCart` method is called with the correct product id
    expect(removeFromCart).toHaveBeenCalledWith(product.id); // product.id is 1
  });

  it('calls addToCart when "+" button is clicked', async () => {
    const { addToCart } = useCart();
    const wrapper = mount(QuantityControl, {
      props: {
        quantity: product.quantity, // Pass the quantity as a prop
        product: product,           // Pass the full product object as a prop
      },
    });

    // Find the "+" button and simulate a click
    await wrapper.find('.bg-gray-400').trigger('click');

    // Assert that the `addToCart` method is called with the correct product object
    expect(addToCart).toHaveBeenCalledWith(product); // Pass the whole product object
  }); */
});
