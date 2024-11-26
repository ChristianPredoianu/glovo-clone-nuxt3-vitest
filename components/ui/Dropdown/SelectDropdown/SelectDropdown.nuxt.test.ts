import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import SelectDropdown from '@/components/ui/Dropdown/SelectDropdown/SelectDropdown.vue';

describe('SelectDropdown', () => {
  const options = [
    { id: 1, name: 'Option 1', category: 'A' },
    { id: 2, name: 'Option 2', category: 'B' },
  ];

  const displayKey = 'name';

  it('renders default option text', () => {
    const wrapper = mount(SelectDropdown, {
      props: {
        options,
        displayKey,
        defaultOptionText: 'Select an option',
      },
    });

    expect(wrapper.text()).toContain('Select an option');
  });

  it('toggles dropdown visibility on button click', async () => {
    const wrapper = mount(SelectDropdown, {
      props: {
        options,
        displayKey,
      },
    });

    const button = wrapper.find('button');
    await button.trigger('click');
    expect(wrapper.find('.absolute').exists()).toBe(true);

    await button.trigger('click');
    expect(wrapper.find('.absolute').exists()).toBe(false);
  });

  it('renders options when dropdown is open', async () => {
    const wrapper = mount(SelectDropdown, {
      props: {
        options,
        displayKey,
      },
    });

    await wrapper.find('button').trigger('click');
    const optionElements = wrapper.findAll('a');
    expect(optionElements).toHaveLength(options.length);
    expect(optionElements[0].text()).toBe('Option 1');
    expect(optionElements[1].text()).toBe('Option 2');
  });

  it('emits selected option on click', async () => {
    const wrapper = mount(SelectDropdown, {
      props: {
        options,
        displayKey,
      },
    });

    await wrapper.find('button').trigger('click');
    const optionElement = wrapper.find('a');
    await optionElement.trigger('click');

    expect(wrapper.emitted().emitSelected).toBeTruthy();
    expect(wrapper.emitted().emitSelected[0]).toEqual(['A']);
  });
});
