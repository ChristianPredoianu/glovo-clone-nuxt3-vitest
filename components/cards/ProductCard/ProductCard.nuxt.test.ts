import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ProductCard from './ProductCard.vue';

const product = {
  image: 'path/to/image.jpg',
  rating: { rate: 4.5, count: 120 },
  title: 'Sample Product',
  category: 'Category Name',
};

describe('ProductCard', () => {
  it('renders product details correctly', () => {
    const wrapper = mount(ProductCard, {
      props: { product },
    });

    // Check if the image is rendered correctly
    const img = wrapper.find('img');
    expect(img.attributes('src')).toBe(product.image);

    // Check if the rating is rendered correctly
    const rate = wrapper.find('.text-sm.font-bold');
    expect(rate.text()).toBe(product.rating.rate.toString());

    const count = wrapper.find('.text-xs');
    expect(count.text()).toContain(product.rating.count.toString());

    // Check if the title is rendered correctly
    const title = wrapper.find('h3');
    expect(title.text()).toBe(product.title);

    // Check if the category is rendered correctly
    const category = wrapper.find('.flex.justify-between .text-xs:last-of-type');
    expect(category.text()).toBe(product.category);
  });
});
