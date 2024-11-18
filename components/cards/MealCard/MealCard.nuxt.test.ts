import { mount } from '@vue/test-utils';
import MealCard from '@/components/cards/MealCard/MealCard.vue';
import { vi } from 'vitest';

vi.mock('@/helpers/replaceRecipeText', () => ({
  replaceRecipeText: vi.fn((text: string) =>
    text.replace(/\brecipe\b|\brecipes\b/gi, '').trim()
  ),
}));

describe('MealCard', () => {
  it('renders meal details correctly', async () => {
    const wrapper = mount(MealCard, {
      props: {
        category: 'dessert',
        label: 'Chocolate Cake recipe',
        img: 'path/to/image.jpg',
      },
    });

    const image = wrapper.find('img');
    expect(image.exists()).toBe(true);
    expect(image.attributes('src')).toBe('path/to/image.jpg');

    expect(image.attributes('alt')).toBe('Chocolate Cake');

    const category = wrapper.find('p');
    expect(category.text()).toBe('Dessert');

    const label = wrapper.find('h3');
    expect(label.text()).toBe('Chocolate Cake');

    expect(wrapper.find('[data-test="fa-icon"]').exists()).toBe(false);

    await wrapper.vm.$nextTick();

    const heartBtn = wrapper.findComponent({ name: 'HeartBtn' });
    expect(heartBtn.exists()).toBe(true);
    expect(heartBtn.props('mealItem')).toEqual({
      category: 'dessert',
      label: 'Chocolate Cake recipe',
      img: 'path/to/image.jpg',
    });
  });
});
