import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import MealCategoryFilterList from '@/components/filters/MealCategoryFilter/MealCategoryFilterList.vue';
import { useFilter } from '@/composables/useFilter';

// Mock the useFilter composable
vi.mock('@/composables/useFilter', () => ({
  useFilter: vi.fn(),
}));

describe('MealCategoryFilterList.vue', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    vi.resetAllMocks();
  });

  it('renders a list of filters', () => {
    // Mock the filters data
    const mockFilters = [
      { id: 1, name: 'Category 1' },
      { id: 2, name: 'Category 2' },
    ];

    // Mock the return value of useFilter
    (useFilter as ReturnType<typeof vi.fn>).mockReturnValue({ filters: mockFilters });

    const wrapper = mount(MealCategoryFilterList);

    // Check if the correct number of filter items is rendered
    const filterItems = wrapper.findAllComponents({ name: 'MealCategoryFilterListItem' });
    expect(filterItems).toHaveLength(mockFilters.length);
  });

  it('emits "emitSelected" event when a filter is selected', async () => {
    // Mock the filters data
    const mockFilters = [
      { id: 1, name: 'Category 1' },
      { id: 2, name: 'Category 2' },
    ];

    // Mock the return value of useFilter
    (useFilter as ReturnType<typeof vi.fn>).mockReturnValue({ filters: mockFilters });

    const wrapper = mount(MealCategoryFilterList);

    // Find the first filter item component and trigger the emitSelected event
    const firstFilterItem = wrapper.findComponent({ name: 'MealCategoryFilterListItem' });
    await firstFilterItem.vm.$emit('emitSelected', 'Category 1');

    // Check if the emitSelected event was emitted
    expect(wrapper.emitted().emitSelected).toBeTruthy();
    expect(wrapper.emitted().emitSelected[0]).toEqual(['Category 1']);
  });
});
