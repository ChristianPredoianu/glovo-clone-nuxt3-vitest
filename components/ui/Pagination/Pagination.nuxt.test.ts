import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import Pagination from '@/components/ui/Pagination/Pagination.vue';

describe('Pagination.vue', () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = mount(Pagination, {
      props: {
        currentPage: 1,
        totalItems: 100,
        itemsPerPage: 10,
      },
    });
  });

  it('renders the correct number of pages', () => {
    const pageButtons = wrapper.findAll('button');
    expect(pageButtons.length).toBe(12); // 10 pages + 2 navigation buttons
  });

  it('disables the previous button on the first page', async () => {
    const prevButton = wrapper.find('button:disabled');
    expect(prevButton.exists()).toBe(true);
  });

  it('emits "pageChanged" event with correct page number on page click', async () => {
    const pageButton = wrapper.findAll('button').at(2); // Page 1 is the 3rd button
    await pageButton.trigger('click');
    expect(wrapper.emitted().pageChanged[0]).toEqual([1]);
  });

  /*  it('changes to the next page on next button click', async () => {
    const nextButton = wrapper.findAll('button').at(wrapper.findAll('button').length - 1);
    await nextButton.trigger('click');
    expect(wrapper.emitted().pageChanged[0]).toEqual([2]);
  }); */

  /*  it('changes to the previous page on previous button click', async () => {
    await wrapper.setProps({ currentPage: 2 });
    const prevButton = wrapper.findAll('button').at(0);
    await prevButton.trigger('click');
    expect(wrapper.emitted().pageChanged[0]).toEqual([1]);
  }); */

  /* it('disables the next button on the last page', async () => {
    await wrapper.setProps({ currentPage: 10 });
    const nextButton = wrapper.findAll('button').at(wrapper.findAll('button').length - 1);
    expect(nextButton.attributes().disabled).toBe('disabled');
  }); */
});
