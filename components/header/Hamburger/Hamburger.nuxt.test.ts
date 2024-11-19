import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import Hamburger from '@/components/header/Hamburger/Hamburger.vue';

// Mock the composables
const mockOpenNav = vi.fn();
const mockOpenBackdrop = vi.fn();

vi.mock('@/composables/ui/useNav', () => ({
  useNav: () => ({
    openNav: mockOpenNav,
  }),
}));

vi.mock('@/composables/ui/useBackdrop', () => ({
  useBackdrop: () => ({
    openBackdrop: mockOpenBackdrop,
  }),
}));

describe('Hamburger.vue', () => {
  it('renders the Hamburger component', () => {
    const wrapper = mount(Hamburger);

    // Check if the button is rendered
    expect(wrapper.find('button').exists()).toBe(true);
  });

  it('calls openNav and openBackdrop when button is clicked', async () => {
    const wrapper = mount(Hamburger);

    // Simulate a click on the button
    await wrapper.find('button').trigger('click');

    // Check if the mocked functions were called
    expect(mockOpenNav).toHaveBeenCalled();
    expect(mockOpenBackdrop).toHaveBeenCalled();
  });
});
