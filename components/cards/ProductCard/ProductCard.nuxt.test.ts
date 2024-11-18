import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import ProductCard from '@/components/cards/ProductCard/ProductCard.vue';

describe('ProductCard', () => {
  const mockProduct = {
    title: 'Awesome Product',
    image: 'path/to/image.jpg',
    price: 99.99,
    rating: {
      rate: 4.5,
      count: 120,
    },
  };

  it('renders product details correctly', () => {
    const wrapper = mount(ProductCard, {
      props: {
        product: mockProduct,
      },
    });
    // Test that the product image is rendered
    const image = wrapper.find('img');
    expect(image.exists()).toBe(true);
    expect(image.attributes('src')).toBe(mockProduct.image);
    expect(image.attributes('alt')).toBe('Product image');

    // Test that the product title is rendered
    const title = wrapper.find('h3');
    expect(title.text()).toBe(mockProduct.title);

    // Test that the product price is rendered
    const price = wrapper.find('p.text-lg');
    expect(price.text()).toBe(`${mockProduct.price} $`);

    // Test the number of full stars
    const fullStars = wrapper.findAll('[data-test="fa-full-stars"]');
    expect(fullStars.length).toBe(4);

    // Test for half star
    const halfStar = wrapper.find('[data-test="fa-half-stars"]');
    expect(halfStar.exists()).toBe(true);

    // Test the number of empty stars
    const emptyStars = wrapper.findAll('[data-test="fa-empty-stars"]');
    expect(emptyStars.length).toBe(0);

    // Test the number of reviews
    const reviewCount = wrapper.find('p.ml-2');
    expect(reviewCount.text()).toBe(`(${mockProduct.rating.count} reviews)`);

    // Test the 'Add to cart' button exists
    const addToCartButton = wrapper.find('button');
    expect(addToCartButton.exists()).toBe(true);
    expect(addToCartButton.text()).toBe('Add to cart');
  });

  it('handles button click', async () => {
    const wrapper = mount(ProductCard, {
      props: {
        product: mockProduct,
      },
    });

    const addToCartButton = wrapper.find('button');

    const addToCartSpy = vi.fn();
    addToCartButton.element.addEventListener('click', addToCartSpy);

    await addToCartButton.trigger('click');

    expect(addToCartSpy).toHaveBeenCalledTimes(1);
  });
});
