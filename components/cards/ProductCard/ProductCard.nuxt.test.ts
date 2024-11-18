import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import ProductCard from '@/components/cards/ProductCard/ProductCard.vue';

vi.mock('@/components/StarCounter.vue', () => ({
  name: 'StarCounter',
  props: ['rate', 'count'],
  template: '<div class="star-counter"></div>', // A mock template to ensure it renders
}));

describe('ProductCard', () => {
  const product = {
    image: 'https://example.com/product-image.jpg',
    title: 'Sample Product',
    price: 99.99,
    rating: {
      rate: 4.5,
      count: 150,
    },
  };

  it('renders the product image, title, and price correctly', () => {
    const wrapper = mount(ProductCard, {
      props: {
        product,
      },
    });

    // Test the product image rendering
    const img = wrapper.find('img');
    expect(img.exists()).toBe(true);
    expect(img.attributes('src')).toBe(product.image);
    expect(img.attributes('alt')).toBe('Product image'); // Test alt attribute

    // Test the product title rendering
    const title = wrapper.find('h3');
    expect(title.exists()).toBe(true);
    expect(title.text()).toBe(product.title);

    // Test the product price rendering
    const price = wrapper.find('p.text-lg');
    expect(price.exists()).toBe(true);
    expect(price.text()).toBe(`${product.price} $`);
  });

  it('passes correct props to the StarCounter component', () => {
    const wrapper = mount(ProductCard, {
      props: {
        product,
      },
    });

    const starCounter = wrapper.findComponent({ name: 'StarCounter' });

    // Ensure StarCounter receives the correct `rate` and `count` props
    expect(starCounter.exists()).toBe(true);
    expect(starCounter.props('rate')).toBe(product.rating.rate);
    expect(starCounter.props('count')).toBe(product.rating.count);
  });

  it('renders the "Add to cart" button', () => {
    const wrapper = mount(ProductCard, {
      props: {
        product,
      },
    });

    const button = wrapper.find('button');
    expect(button.exists()).toBe(true);
    expect(button.text()).toBe('Add to cart');
  });
});
