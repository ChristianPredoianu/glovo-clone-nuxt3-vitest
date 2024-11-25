import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import FilterModalList from '@/components/modals/FilterModal/List/FilterModalList.vue';

// Mock composables globally
vi.mock('@/composables/useIsActive', () => ({
  useIsActive: () => ({
    setActive: vi.fn(),
    isActive: vi.fn().mockReturnValue(false), // Default mock return value for active state
  }),
}));

vi.mock('@/composables/useFilter', () => ({
  useFilter: () => ({
    filters: [
      { id: 1, icon: 'icon1', name: 'Category 1' },
      { id: 2, icon: 'icon2', name: 'Category 2' },
    ],
    getCategoryName: (category: any) => category.name,
  }),
}));

describe('FilterModalList', () => {
  let setActiveMock: ReturnType<typeof vi.fn>;
  let isActiveMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.resetAllMocks(); // Reset mocks before each test

    // Fresh mock setup for each test
    setActiveMock = vi.fn();
    isActiveMock = vi.fn().mockReturnValue(false);

    // Ensure the mock is returning the mocked functions for this test
    const { useIsActive } = require('@/composables/useIsActive');
    useIsActive.mockReturnValue({
      setActive: setActiveMock,
      isActive: isActiveMock,
    });
  });

  it('renders correctly with filters', () => {
    const wrapper = mount(FilterModalList);

    // Validate the number of filter items rendered
    expect(wrapper.findAll('li').length).toBe(2);
    expect(wrapper.findAll('[data-test="filter-icon"]').length).toBe(2);

    // Check the text content
    expect(wrapper.findAll('p').at(0)?.text()).toBe('Category 1');
    expect(wrapper.findAll('p').at(1)?.text()).toBe('Category 2');
  });

  it('emits selectedFilter and activates filter on click', async () => {
    const wrapper = mount(FilterModalList);

    // Simulate clicking the first filter item
    await wrapper.findAll('li').at(0)?.trigger('click');

    // Verify setActive was called with the correct argument
    expect(setActiveMock).toHaveBeenCalledWith('Category 1');

    // Check the emitted event
    expect(wrapper.emitted('selectedFilter')).toHaveLength(1);
    expect(wrapper.emitted('selectedFilter')![0]).toEqual([
      { id: 1, icon: 'icon1', name: 'Category 1' },
    ]);
  });

  it('deletes the filter on close icon click', async () => {
    // Mock active state to true for this test
    isActiveMock.mockReturnValue(true);

    const wrapper = mount(FilterModalList);

    // Click the first filter to set it active
    await wrapper.findAll('li').at(0)?.trigger('click');

    // Find and simulate clicking the close button
    const closeIcon = wrapper.find('.absolute.bottom-10.right-4');
    expect(closeIcon.exists()).toBe(true); // Ensure close icon is rendered
    await closeIcon.trigger('click');

    // Verify setActive was called to clear the active filter
    expect(setActiveMock).toHaveBeenCalledWith('');
    expect(wrapper.emitted('selectedFilter')).toHaveLength(2);
    expect(wrapper.emitted('selectedFilter')![1]).toEqual(['']);
  });
});
