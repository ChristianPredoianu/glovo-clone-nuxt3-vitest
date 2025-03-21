import { mount, VueWrapper } from '@vue/test-utils';
import { vi } from 'vitest';
import ProductCard from '@/components/cards/ProductCard/ProductCard.vue';

vi.mock('@/components/StarCounter.vue', () => ({
  name: 'StarCounter',
  props: ['rate', 'count'],
  template: '<div class="star-counter"></div>',
}));

describe('ProductCard', () => {
  const product = {
    id: 1,
    category: 'Electronics',
    image: 'https://example.com/product-image.jpg',
    title: 'Sample Product',
    price: 99.99,
    rating: {
      rate: 4.5,
      count: 150,
    },
  };

  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    wrapper = mount(ProductCard, {
      props: { product },
    });
  });

  it('renders the product image, title, and price correctly', () => {
    const img = wrapper.find('img');
    expect(img.exists()).toBe(true);
    expect(img.attributes('src')).toBe(product.image);
    expect(img.attributes('alt')).toBe('Product image');

    const title = wrapper.find('h3');
    expect(title.exists()).toBe(true);
    expect(title.text()).toBe(product.title);

    const price = wrapper.find('p.text-lg');
    expect(price.exists()).toBe(true);
    expect(price.text()).toBe(`${product.price} $`);
  });

  it('passes correct props to the StarCounter component', () => {
    const starCounter = wrapper.findComponent({ name: 'StarCounter' });
    expect(starCounter.exists()).toBe(true);
    expect(starCounter.props('rate')).toBe(product.rating.rate);
    expect(starCounter.props('count')).toBe(product.rating.count);
  });
});
