import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import MyComponent from './FilterModalList.vue';
import type {
  IFakeStoreCategories,
  ICuisineType,
} from '@/interfaces/interfaces.interface';

// Mock implementations for composables
function useIsActive() {
  return {
    setActive: vi.fn(),
    isActive: vi.fn((name: string) => name === 'ActiveCategory'),
  };
}

function useFilter() {
  return {
    filters: [{ id: 1, icon: 'fa-burger', cuisineType: 'American' }],
    getCategoryName: vi.fn((category: ICuisineType) => category.cuisineType),
  };
}

describe('MyComponent', () => {
  it('renders the list of filters correctly', () => {
    const wrapper = mount(MyComponent, {
      global: {
        mocks: {
          useIsActive,
          useFilter,
        },
        components: {
          'font-awesome-icon': {
            name: 'font-awesome-icon',
            props: ['icon'],
            template: '<span :class="icon" />',
          },
        },
      },
    });

    // Check if the component renders filter items correctly
    const filterItems = wrapper.findAll('li');
    expect(filterItems).toHaveLength(17);

    const icons = wrapper.findAll('[data-test="filter-icon"]');
    expect(icons[0].attributes('class')).toContain('fa-burger');

    const labels = wrapper.findAll('p.text-gray-800');
    expect(labels[0].text()).toBe('American');
  });

  it('emits selectedFilter event with the correct payload when a filter is clicked', async () => {
    const wrapper = mount(MyComponent, {
      global: {
        mocks: {
          useIsActive,
          useFilter,
        },
        components: {
          'font-awesome-icon': {
            name: 'font-awesome-icon',
            props: ['icon'],
            template: '<span :class="icon" />',
          },
        },
      },
    });

    // Simulate clicking the first filter item
    await wrapper.findAll('li')[0].trigger('click');

    // Check if selectedFilter event was emitted with the correct payload
    expect(wrapper.emitted('selectedFilter')).toBeTruthy();
    expect(wrapper.emitted('selectedFilter')![0]).toEqual([
      { id: 1, icon: 'fa-burger', cuisineType: 'American' },
    ]);
  });

  it('emits selectedFilter event with an empty string when the delete button is clicked', async () => {
    const wrapper = mount(MyComponent, {
      global: {
        mocks: {
          useIsActive,
          useFilter,
        },
        components: {
          'font-awesome-icon': {
            name: 'font-awesome-icon',
            props: ['icon'],
            template: '<span :class="icon" />',
          },
        },
      },
    });

    // Ensure the component is in a state where the delete button is visible
    await wrapper.vm.$nextTick();

    // Simulate clicking the delete button on the first filter item
    const deleteButton = wrapper.find('p.text-xs.bg-gray-600');
    if (deleteButton.exists()) {
      await deleteButton.trigger('click');
    } else {
      throw new Error('Delete button was not found');
    }

    // Check if selectedFilter event was emitted with an empty string
    expect(wrapper.emitted('selectedFilter')).toBeTruthy();
    expect(wrapper.emitted('selectedFilter')![0]).toEqual(['']);
  });
  it('applies the active class correctly to the active filter', async () => {
    // Arrange: Create a wrapper with the component mounted
    const wrapper = mount(MyComponent, {
      global: {
        mocks: {
          useIsActive,
          useFilter,
        },
        components: {
          'font-awesome-icon': {
            name: 'font-awesome-icon',
            props: ['icon'],
            template: '<span :class="icon" />',
          },
        },
      },
    });

    // Act: Set the active category to match one of the filters
    const activeCategoryName = 'American';
    useIsActive().isActive.mockImplementation(
      (name: string) => name === activeCategoryName
    );
    useIsActive().setActive(activeCategoryName);

    await wrapper.vm.$nextTick(); // Ensure the DOM updates

    // Assert: Check if the active class is applied correctly
    await wrapper.findAll('li')[0].trigger('click');

    const activeIcon = wrapper.find('li:nth-child(1) .bg-orange-200');

    expect(activeIcon.exists()).toBe(true);

    const inactiveIcon = wrapper.find('li:nth-child(2) .bg-orange-200');
    expect(inactiveIcon.exists()).toBe(false);
  });
});
