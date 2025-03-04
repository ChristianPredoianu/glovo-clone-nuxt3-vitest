import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import MealCard from '@/components/cards/MealCard/MealCard.vue';
import type { IMealCardProps } from '@/types/meals/IMealCardProps';

describe('MealCard.vue', () => {
  const meal: IMealCardProps = {
    recipe: {
      cuisineType: ['Italian'],
      label: 'Pizza Margherita',
      image: 'https://example.com/pizza.jpg',
    },
    price: 10,
  };

  const props = {
    index: 0,
    price: 10,
    meal: meal,
  };

  it('renders the meal image with correct src and alt attributes', () => {
    const wrapper = mount(MealCard, {
      props,
    });

    const img = wrapper.find('img');
    expect(img.attributes('src')).toBe(meal.recipe.image);
    expect(img.attributes('alt')).toBe('Pizza Margherita');
  });

  it('renders the meal label correctly', () => {
    const wrapper = mount(MealCard, {
      props,
    });

    const label = wrapper.find('h3');
    expect(label.text()).toBe('Pizza Margherita');
  });

  it('renders the cuisine type correctly', () => {
    const wrapper = mount(MealCard, {
      props,
    });

    const cuisineType = wrapper.find('p').text();
    expect(cuisineType).toBe('Italian');
  });

  it('renders the price correctly', () => {
    const wrapper = mount(MealCard, {
      props,
    });

    const price = wrapper.find('[data-test="price"]').text();
    expect(price).toContain('10 $');
  });

  it('renders the HeartBtn component', () => {
    const wrapper = mount(MealCard, {
      props,
    });

    const heartBtn = wrapper.findComponent({ name: 'HeartBtn' });
    expect(heartBtn.exists()).toBe(true);
  });
});
