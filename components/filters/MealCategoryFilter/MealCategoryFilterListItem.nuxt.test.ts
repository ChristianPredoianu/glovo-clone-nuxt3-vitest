import { describe, it, vi, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import MealCategoryFilterListItem from '@/components/filters/MealCategoryFilter/MealCategoryFilterListItem.vue';
import type { IFakeStoreCategories } from '@/interfaces/interfaces.interface';
import type { ICuisineType } from '@/interfaces/interfaces.interface';

function useIsActive() {
  return {
    setActive: vi.fn(),
    isActive: vi.fn((name: string) => name === 'American'), // Mock to simulate 'American' category as active
  };
}

function useFilter() {
  return {
    getCategoryName: vi.fn(
      (category: IFakeStoreCategories | ICuisineType) => category.cuisineType
    ),
  };
}

describe('MealCategoryFilterListItem', () => {
  const category: ICuisineType | IFakeStoreCategories = {
    id: 1,
    icon: 'fa-burger',
    cuisineType: 'American',
  };

  it('renders the category item correctly', () => {
    const wrapper = mount(MealCategoryFilterListItem, {
      props: { category },
      global: {
        mocks: {
          useIsActive: useIsActive(),
          useFilter: useFilter(),
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

    // Check if the component renders the correct icon and text
    const icon = wrapper.find('[data-test="icon"]');
    expect(icon.exists()).toBe(true);

    const iconClass = icon.attributes('class');
    expect(iconClass).toContain('fa-burger');

    const text = wrapper.find('p');
    expect(text.text()).toBe('American');
  });

  it('emits emitSelected event with the correct payload when clicked', async () => {
    const wrapper = mount(MealCategoryFilterListItem, {
      props: { category },
      global: {
        mocks: {
          useIsActive: useIsActive(),
          useFilter: useFilter(),
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

    // Simulate clicking the list item
    await wrapper.find('li').trigger('click');

    // Check if emitSelected event was emitted with the correct payload
    expect(wrapper.emitted('emitSelected')).toBeTruthy();
    expect(wrapper.emitted('emitSelected')![0]).toEqual([category]);
  });

  it('applies the active class correctly based on isActive', async () => {
    const wrapper = mount(MealCategoryFilterListItem, {
      props: { category },
      global: {
        mocks: {
          useIsActive: useIsActive(),
          useFilter: useFilter(),
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

    // Ensure the DOM updates after setting isActive
    await wrapper.vm.$nextTick();

    // Check if the active class is applied correctly
    const activeClassIcon = wrapper.find('[data-test="icon"].bg-orange-300');
    expect(activeClassIcon.exists()).toBe(true);

    const activeText = wrapper.find('p.font-semibold');
    expect(activeText.exists()).toBe(true);
  });
});
