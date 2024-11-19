import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import NavItems from '@/components/header/NavItems/NavItems.vue';

const mockCloseNav = vi.fn();
const mockCloseBackdrop = vi.fn();
const mockScreenWidth = ref(1024);

vi.mock('@/composables/ui/useNav', () => ({
  useNav: () => ({
    closeNav: mockCloseNav,
  }),
}));

vi.mock('@/composables/ui/useBackdrop', () => ({
  useBackdrop: () => ({
    closeBackdrop: mockCloseBackdrop,
  }),
}));

vi.mock('@/composables/ui/useScreenWidth', () => ({
  useScreenWidth: () => ({
    screenWidth: mockScreenWidth,
  }),
}));

describe('NavItems.vue', () => {
  it('renders NavItems component', () => {
    const wrapper = mount(NavItems);

    expect(wrapper.find('div').exists()).toBe(true);
  });

  it('calls closeNavigationDialog when arrow icon is clicked on small screens', async () => {
    mockScreenWidth.value = 500;
    const wrapper = mount(NavItems);

    await wrapper.find('[data-test="fa-arrow-left"]').trigger('click');

    expect(mockCloseNav).toHaveBeenCalled();
    expect(mockCloseBackdrop).toHaveBeenCalled();
  });

  it('displays Connect | New Account on small screens', () => {
    mockScreenWidth.value = 500;
    const wrapper = mount(NavItems);

    const header = wrapper.find('h1');
    expect(header.exists()).toBe(true);
    expect(header.text()).toBe('Connect | New Account');
  });

  it('does not display Connect | New Account on large screens', () => {
    mockScreenWidth.value = 1024;
    const wrapper = mount(NavItems);

    const header = wrapper.find('h1');
    expect(header.exists()).toBe(false);
  });
});
