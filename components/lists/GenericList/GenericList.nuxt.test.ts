/* import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import GenericList from '@/components/lists/GenericList/GenericList.vue';
import GenericListItem from '@/components/lists/GenericList/Item/GenericListItem.vue';

describe('GenericList', () => {
  const items = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
  ];
  const field = 'name';

  it('renders the list items correctly', () => {
    const wrapper = mount(GenericList, {
      props: { items, field },
      global: {
        components: { GenericListItem },
      },
    });

    const listItemComponents = wrapper.findAllComponents(GenericListItem);
    expect(listItemComponents).toHaveLength(1);

    const listItemProps = listItemComponents[0].props();
    expect(listItemProps.items).toEqual(items);
    expect(listItemProps.field).toBe(field);
  });
});
 */
