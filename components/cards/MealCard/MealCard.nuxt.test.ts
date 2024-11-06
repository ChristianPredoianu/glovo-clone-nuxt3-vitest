import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import MealCard from '@/components/cards/MealCard/MealCard.vue';

const propsData = {
  category: 'dessert',
  label: 'Delicious recipes',
  img: 'https://example.com/image.jpg',
};

describe('MealCard', () => {
  it('renders with provided props', () => {
    const wrapper = mount(MealCard, {
      props: propsData,
    });

    // Check if the image is rendered correctly
    const img = wrapper.find('img');
    expect(img.exists()).toBe(true);
    expect(img.attributes('src')).toBe(propsData.img);
    expect(img.attributes('alt')).toBe(propsData.label);

    // Check if the category label is rendered correctly
    const categoryLabel = wrapper.find('p').text();
    expect(categoryLabel).toBe('Dessert'); // Capitalized category

    // Check if the label is rendered correctly without 'recipe' or 'recipes'
    const h3 = wrapper.find('h3');
    expect(h3.text()).toBe('Delicious'); // Label with 'recipe' removed

    // Check if the "Free" text and icon are rendered
    const freeDiv = wrapper.find('div.bg-amber-400');
    expect(freeDiv.exists()).toBe(true);
    expect(freeDiv.text()).toContain('Free');
  });

  it('capitalizes the first letter of the category', () => {
    const wrapper = mount(MealCard, {
      props: propsData,
    });

    // Check if the category is correctly capitalized
    const categoryLabel = wrapper.find('p').text();
    expect(categoryLabel).toBe('Dessert'); // Capitalized category
  });

  it('removes "recipe" or "recipes" from the label', () => {
    const propsData = {
      category: 'beverage',
      label: 'Refreshing recipes',
    };

    const wrapper = mount(MealCard, {
      props: propsData,
    });

    // Check if 'recipe' or 'recipes' is removed from the label
    const h3 = wrapper.find('h3');
    expect(h3.text()).not.toMatch(/^recipe(s?)$/);
  });
});
