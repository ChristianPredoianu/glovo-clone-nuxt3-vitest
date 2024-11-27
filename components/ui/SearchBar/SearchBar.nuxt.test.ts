import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import SearchBar from '@/components/ui/SearchBar/SearchBar.vue';

describe('SearchBar', () => {
  it('renders an input element with the correct placeholder', async () => {
    const wrapper = mount(SearchBar);
    const inputElement = wrapper.find('input');

    expect(inputElement.exists()).toBe(true);
    expect(inputElement.attributes('placeholder')).toBe('Search...');
  });
});
