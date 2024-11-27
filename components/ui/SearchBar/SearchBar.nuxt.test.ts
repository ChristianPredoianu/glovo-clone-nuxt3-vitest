import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import SearchBar from '@/components/ui/SearchBar/SearchBar.vue';

vi.mock('@/composables/useIsLoaded', () => ({
  default: () => ({ isLoaded: ref(true) }),
}));

describe('SearchBar', () => {
  let wrapper: any;

  beforeEach(() => {
    vi.clearAllMocks();
    wrapper = mount(SearchBar);
  });

  it('renders the search icon when loaded', async () => {
    const iconElement = wrapper.find('[data-test="fa-search"]');

    expect(iconElement.exists()).toBe(true);
  });

  it('does not render the search icon when not loaded', async () => {
    vi.mock('@/composables/useIsLoaded', () => ({
      default: () => ({ isLoaded: ref(false) }),
    }));

    const iconElement = wrapper.find('[data-test="fa-search"]');

    expect(iconElement.exists()).toBe(false);
  });

  /*  it('renders an input element with the correct placeholder', async () => {
    const wrapper = mount(SearchBar);
    const inputElement = wrapper.find('input');

    expect(inputElement.exists()).toBe(true);
    expect(inputElement.attributes('placeholder')).toBe('Search...');
  }); */
});
