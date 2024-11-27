import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import MealCategoryFilterList from '@/components/filters/MealCategoryFilter/MealCategoryFilterList.vue';
import MealCategoryFilterListItem from '@/components/filters/MealCategoryFilter/MealCategoryFilterListItem.vue';
import type {
  IFakeStoreCategories,
  ICuisineType,
} from '@/interfaces/interfaces.interface';

vi.mock('@/composables/useFilter', () => ({
  useFilter: () => ({
    filters: [
      { id: 1, category: 'breakfast' },
      { id: 2, cuisineType: 'Italian' },
    ],
    getCategoryName: (category: IFakeStoreCategories | ICuisineType) => {
      return 'category' in category
        ? category.category.charAt(0).toUpperCase() + category.category.slice(1)
        : category.cuisineType;
    },
  }),
}));

describe('MealCategoryFilterList', () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = mount(MealCategoryFilterList);
  });

  it('renders a list of filters', () => {
    const items = wrapper.findAllComponents(MealCategoryFilterListItem);
    expect(items).toHaveLength(2);
  });

  it('emits "emitSelected" event when a filter is selected', () => {
    const firstItem = wrapper.findComponent(MealCategoryFilterListItem);

    firstItem.vm.$emit('emitSelected', { id: 1, category: 'breakfast' });

    const emittedEvents = wrapper.emitted('emitSelected');
    expect(emittedEvents).toBeDefined();
    if (emittedEvents) {
      expect(emittedEvents[0]).toEqual([{ id: 1, category: 'breakfast' }]);
    }
  });
});
