import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import SearchLocationDropdown from '@/components/ui/Dropdown/SearchLocationDropdown/SearchLocationDropdown.vue';
import { nextTick } from 'vue';

vi.mock('@/composables/ui/useClickOutside', () => ({ useClickOutside: vi.fn() }));
vi.mock('@/composables/ui/useCloseElementOnEscape', () => ({
  useCloseElementOnEscape: vi.fn(),
}));
vi.mock('@/composables/ui/useKeyDown', () => ({
  useKeyDown: vi.fn(() => ({ selectedIndex: 0 })),
}));

describe('SearchLocationDropdown', () => {
  const options = [
    { id: '1', text: 'Option 1' },
    { id: '2', text: 'Option 2' },
    { id: '3', text: 'Option 3' },
  ];

  it('renders correctly when isOpen is true', async () => {
    const wrapper = mount(SearchLocationDropdown, {
      props: {
        options,
        idKey: 'id',
        textKey: 'text',
      },
      global: {
        provide: {
          isOpen: true,
        },
      },
    });

    await nextTick();

    const dropdown = wrapper.find('[data-test="dropdown"]');
    const dropdownMenu = wrapper.find('.absolute');

    expect(dropdown.exists()).toBe(true);
    expect(dropdownMenu.exists()).toBe(true);
  });

  it('does not render when isOpen is false', async () => {
    const wrapper = mount(SearchLocationDropdown, {
      props: {
        options,
        idKey: 'id',
        textKey: 'text',
      },
      global: {
        provide: {
          isOpen: false,
        },
      },
    });

    await nextTick();

    const dropdownMenu = wrapper.find('.absolute');
    expect(dropdownMenu.exists()).toBe(true);

    await wrapper.find('.relative').trigger('click');

    await nextTick();

    const closedDropdownMenu = wrapper.find('.absolute');
    expect(closedDropdownMenu.exists()).toBe(false);
  });

  it('toggles dropdown visibility when clicked', async () => {
    const wrapper = mount(SearchLocationDropdown, {
      props: {
        options,
        idKey: 'id',
        textKey: 'text',
      },
    });

    await nextTick();
    const dropdownMenu = wrapper.find('.absolute');
    expect(dropdownMenu.exists()).toBe(true);

    await wrapper.find('.relative').trigger('click');

    await nextTick();

    const closedDropdownMenu = wrapper.find('.absolute');
    expect(closedDropdownMenu.exists()).toBe(false);

    await wrapper.find('.relative').trigger('click');

    await nextTick();

    const openedDropdownMenu = wrapper.find('.absolute');
    expect(openedDropdownMenu.exists()).toBe(true);
  });

  it('emits emitOption and clearInput when an option is selected', async () => {
    const wrapper = mount(SearchLocationDropdown, {
      props: {
        options,
        idKey: 'id',
        textKey: 'text',
      },
    });

    await nextTick();

    const optionElements = wrapper.findAll('li');
    const firstOption = optionElements[0];

    await firstOption.trigger('click');

    expect(wrapper.emitted().emitOption).toBeTruthy();
    expect(wrapper.emitted().emitOption[0]).toEqual([options[0]]);
    expect(wrapper.emitted().clearInput).toBeTruthy();
  });
});
