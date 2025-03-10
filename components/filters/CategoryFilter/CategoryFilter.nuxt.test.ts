import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import CategoryFilter from '@/components/filters/CategoryFilter/CategoryFilter.vue';
import CategoryFilterList from '@/components/lists/CategoryFilterList/CategoryFilterList.vue';
import type { IFakeStoreCategories } from '@/types/products';
import type { ICuisineType } from '@/types/meals';

// Mock the CategoryFilterList component
vi.mock('@/components/CategoryFilterList.vue', () => ({
  default: {
    template: '<div />', // Mock the template
    emits: ['emitSelected'], // Mock the emits
  },
}));

describe('YourComponent', () => {
  it('renders correctly', () => {
    const wrapper = mount(CategoryFilter);

    expect(wrapper.exists()).toBe(true);

    expect(wrapper.findComponent(CategoryFilterList).exists()).toBe(true);
  });

  it('emits "emitSelected" event with the selected filter when handleEmitSelected is called', async () => {
    const wrapper = mount(CategoryFilter);

    const selectedFilter = { id: 1, name: 'Electronics' };

    await wrapper
      .findComponent(CategoryFilterList)
      .vm.$emit('emitSelected', selectedFilter);

    expect(wrapper.emitted('emitSelected')).toBeTruthy();
    expect(wrapper.emitted('emitSelected')?.[0]).toEqual([selectedFilter]);
  });
});
