import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import GenericList from '@/components/ui/GenericList/GenericList.vue';

describe('GenericList', () => {
  it('renders list items correctly', () => {
    const items = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
      { id: 3, name: 'Item 3' },
    ];

    const field = 'name';

    const wrapper = mount(GenericList, {
      props: {
        items,
        field,
      },
    });

    const listItems = wrapper.findAll('li');

    expect(listItems.length).toBe(items.length);

    listItems.forEach((listItem, index) => {
      const itemText = listItem.text();

      expect(itemText).toContain(items[index][field]);
    });
  });
});
