import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import CategoryCard from './CategoryCard.vue';

describe('Category card', () => {
  it('renders correctly with props', async () => {
    const propsData = {
      index: 1,
      img: 'example.jpg',
      text: 'Example',
      category: 'example-category',
    };

    const wrapper = mount(CategoryCard, {
      props: propsData,
    });

    expect(wrapper.find('img').attributes('src')).toBe(propsData.img);
    expect(wrapper.find('img').attributes('alt')).toBe(propsData.text);

    expect(wrapper.find('h3').text()).toBe(propsData.text);
  });
});
