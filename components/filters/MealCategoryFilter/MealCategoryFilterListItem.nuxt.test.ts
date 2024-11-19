import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import MealCategoryFilterListItem from '@/components/filters/MealCategoryFilter/MealCategoryFilterListItem.vue';

vi.mock('@/composables/useIsActive', () => ({
  useIsActive: () => ({
    setActive: vi.fn(),
    isActive: vi.fn().mockReturnValue(false),
  }),
}));

vi.mock('@/composables/useFilter', () => ({
  useFilter: () => ({
    getCategoryName: vi.fn((category) => category.cuisineType || category.category),
  }),
}));

vi.mock('@fortawesome/vue-fontawesome', () => ({
  FontAwesomeIcon: {
    name: 'FontAwesomeIcon',
    props: ['icon'],
    template: '<span></span>',
  },
}));

const sampleCuisineType = {
  id: 1,
  cuisineType: 'Italian',
  icon: 'italian-icon',
};

const sampleCuisineTypes = [
  { id: 1, cuisineType: 'Italian', icon: 'italian-icon' },
  { id: 2, cuisineType: 'Mexican', icon: 'mexican-icon' },
];

const sampleFakeStoreCategory = {
  id: 1,
  category: 'Electronics',
  icon: 'electronics-icon',
};

describe('MealCategoryFilterListItem', () => {
  it('renders cuisineType prop correctly', () => {
    const wrapper = mount(MealCategoryFilterListItem, {
      props: {
        category: sampleCuisineType,
      },
    });

    expect(wrapper.find('[data-test="category"]').text()).toBe('Italian');
    expect(wrapper.find('[data-test="icon"]').attributes('icon')).toBe(
      'fas,italian-icon'
    );
  });

  it('renders fakeStoreCategory prop correctly', () => {
    const wrapper = mount(MealCategoryFilterListItem, {
      props: {
        category: sampleFakeStoreCategory,
      },
    });

    expect(wrapper.find('[data-test="category"]').text()).toBe('Electronics');
    expect(wrapper.find('[data-test="icon"]').attributes('icon')).toBe(
      'fas,electronics-icon'
    );
  });

  it('emits the correct event when clicked', async () => {
    const wrapper = mount(MealCategoryFilterListItem, {
      props: {
        category: sampleCuisineType,
      },
    });

    await wrapper.find('li').trigger('click');

    const emitted = wrapper.emitted('emitSelected');
    expect(emitted).toHaveLength(1);
    expect(emitted![0]).toEqual([sampleCuisineType]);
  });

  it('applies active background to the icon when active', async () => {
    const mockIsActive = vi.fn().mockReturnValue(true);
    const wrapper = mount(MealCategoryFilterListItem, {
      props: {
        category: sampleCuisineType,
      },
      global: {
        mocks: {
          useIsActive: () => ({
            setActive: vi.fn(),
            isActive: mockIsActive,
          }),
        },
      },
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.find('[data-test="icon"]').classes()).toContain('bg-orange-300');
  });

  it('adds active class (font-semibold) to clicked li and not to others', async () => {
    const wrapper = mount(MealCategoryFilterListItem, {
      props: {
        category: sampleCuisineTypes[0],
      },
    });

    await wrapper.find('li').trigger('click');

    expect(wrapper.find('[data-test="category"]').classes()).toContain('font-semibold');

    // Now, check if clicking another 'li' will remove the font-semibold from the first one
    // Mount the second item (simulate the other category)
    const secondWrapper = mount(MealCategoryFilterListItem, {
      props: {
        category: sampleCuisineTypes[1],
      },
    });

    await secondWrapper.find('li').trigger('click');

    // Check that the font-semibold class is now on the second clicked element
    expect(secondWrapper.find('[data-test="category"]').classes()).toContain(
      'font-semibold'
    );

    // Ensure that the first item no longer has the font-semibold class
    expect(wrapper.find('[data-test="category"]').classes()).not.toContain(
      'font-semibold'
    );
  });
});
