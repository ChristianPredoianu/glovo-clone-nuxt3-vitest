import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import ProductModalList from '@/components/modals/ProductModal/List/ProductModalList.vue';

const mockIngredients = [
  { foodId: '1', text: 'Tomato' },
  { foodId: '2', text: 'Cheese' },
  { foodId: '3', text: 'Basil' },
];

describe('ProductModalList.vue', () => {
  it('renders a list of ingredients', () => {
    const wrapper = mount(ProductModalList, {
      props: {
        foodId: 'test-food',
        text: 'Test Food',
        ingredients: mockIngredients,
      },
    });

    const items = wrapper.findAll('li');
    expect(items.length).toBe(mockIngredients.length);
    items.forEach((item, index) => {
      expect(item.text()).toBe(mockIngredients[index].text);
    });
  });

  it('renders correctly with no ingredients', () => {
    const wrapper = mount(ProductModalList, {
      props: {
        foodId: 'test-food',
        text: 'Test Food',
        ingredients: [],
      },
    });

    expect(wrapper.findAll('li').length).toBe(0);
  });
});
