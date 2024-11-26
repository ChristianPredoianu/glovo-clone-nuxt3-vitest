import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import GenericListItem from '@/components/ui/GenericList/GenericListItem/GenericListItem.vue';
import { capitalizeFirstLetter } from '@/helpers/capitalizeFirstLetter';

vi.mock('@/helpers/capitalizeFirstLetter', () => ({
  capitalizeFirstLetter: vi.fn(
    (str: string) => str.charAt(0).toUpperCase() + str.slice(1)
  ),
}));

describe('GenericListItem', () => {
  const items = [
    { id: 1, name: 'item 1' },
    { id: 2, name: 'item 2' },
  ];
  const field = 'name';

  it('renders list items correctly', () => {
    const wrapper = mount(GenericListItem, {
      props: { items, field },
    });

    const listItems = wrapper.findAll('li');
    expect(listItems).toHaveLength(items.length);
    listItems.forEach((listItem, index) => {
      expect(listItem.text()).toBe(capitalizeFirstLetter(items[index].name));
    });
  });

  it('handles nested fields correctly', () => {
    const nestedItems = [
      { id: 1, details: { name: 'nested item 1' } },
      { id: 2, details: { name: 'nested item 2' } },
    ];
    const nestedField = 'details.name';

    const wrapper = mount(GenericListItem, {
      props: { items: nestedItems, field: nestedField },
    });

    const listItems = wrapper.findAll('li');
    expect(listItems).toHaveLength(nestedItems.length);
    listItems.forEach((listItem, index) => {
      expect(listItem.text()).toBe(
        capitalizeFirstLetter(nestedItems[index].details.name)
      );
    });
  });

  it('returns an empty string for missing fields', () => {
    const wrapper = mount(GenericListItem, {
      props: { items, field: 'nonexistent' },
    });

    const listItems = wrapper.findAll('li');
    expect(listItems).toHaveLength(items.length);
    listItems.forEach((listItem) => {
      expect(listItem.text()).toBe('');
    });
  });
});
