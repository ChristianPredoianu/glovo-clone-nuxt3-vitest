import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import FilterModalList from '@/components/modals/FilterModal/List/FilterModalList.vue';
import { useIsActive } from '@/composables/ui/useIsActive';

vi.mock('@/composables/ui/useIsActive', () => ({
  useIsActive: vi.fn().mockReturnValue({
    setActive: vi.fn(),
    isActive: vi.fn().mockReturnValue(true),
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
  it('renders the filters correctly', () => {
    const wrapper = mount(FilterModalList);

    expect(wrapper.findAll('li').length).toBe(2);
    expect(wrapper.find('p').text()).toBe('Category 1');
  });

  it('emits selectedFilter and activates filter on click', async () => {
    const wrapper = mount(FilterModalList);

    const firstFilterItem = wrapper.findAll('li').at(0);
    await firstFilterItem?.trigger('click');

    expect(useIsActive().setActive).toHaveBeenCalledWith('Category 1');

    expect(wrapper.emitted('selectedFilter')).toHaveLength(1);
    expect(wrapper.emitted('selectedFilter')![0]).toEqual([
      { id: 1, icon: 'icon1', name: 'Category 1' },
    ]);
  });

  it('removes the filter when the close icon is clicked', async () => {
    const wrapper = mount(FilterModalList);

    await wrapper.findAll('li').at(0)?.trigger('click');

    const closeIcon = wrapper.find('[data-test="fa-remove"]');

    await closeIcon.trigger('click');

    expect(useIsActive().setActive).toHaveBeenCalledWith('');

    expect(wrapper.emitted('selectedFilter')).toHaveLength(2);
    expect(wrapper.emitted('selectedFilter')![1]).toEqual(['']);
  });
});
