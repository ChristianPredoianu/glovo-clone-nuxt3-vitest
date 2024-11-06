import { describe, it, vi, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import MealCategoryFilterList from './MealCategoryFilterList.vue';
import MealCategoryFilterListItem from './MealCategoryFilterListItem.vue';
import type {
  IFakeStoreCategories,
  ICuisineType,
} from '@/interfaces/interfaces.interface';

vi.mock('@/composables/useFilter', () => ({
  useFilter: () => ({
    filters: [
      { id: 1, icon: 'fa-burger', cuisineType: 'American' },
      { id: 2, icon: 'fa-pizza', cuisineType: 'Pizza' },
    ],
    getCategoryName: (category: IFakeStoreCategories | ICuisineType) => {
      return 'cuisineType' in category ? category.cuisineType : category.category;
    },
  }),
}));

describe('MealCategoryFilterList', () => {
  it('renders the correct number of MealCategoryFilterListItem components', () => {
    const wrapper = mount(MealCategoryFilterList, {
      global: {
        components: {
          MealCategoryFilterListItem,
        },
      },
    });

    const listItems = wrapper.findAllComponents(MealCategoryFilterListItem);

    expect(listItems).toHaveLength(2);
  });

  it('emits the emitSelected event when a MealCategoryFilterListItem emits it', async () => {
    const wrapper = mount(MealCategoryFilterList, {
      global: {
        components: {
          MealCategoryFilterListItem,
        },
      },
    });

    const listItem = wrapper.findComponent(MealCategoryFilterListItem);
    await listItem.vm.$emit('emitSelected', 'American');

    expect(wrapper.emitted('emitSelected')).toBeTruthy();
    expect(wrapper.emitted('emitSelected')![0]).toEqual(['American']);
  });
});
