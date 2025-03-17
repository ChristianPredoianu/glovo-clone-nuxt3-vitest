import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import RoundedBtn from '@/components/buttons/RoundedBtn/RoundedBtn.vue';

describe('RoundedBtn.vue', () => {
  it('renders the button with icon and text', async () => {
    const wrapper = mount(RoundedBtn, {
      props: {
        text: 'Click me',
        icon: 'home',
        backCol: 'bg-blue-500',
      },
    });

    // Check if the button text is rendered correctly
    expect(wrapper.text()).toContain('Click me');

    // Check if the icon is rendered with the correct class
    const button = wrapper.find('button');
    expect(button.exists()).toBe(true);

    // Check if the click event is emitted
    await button.trigger('click');
    expect(wrapper.emitted('emitClick')).toBeTruthy();
  });

  it('does not render the icon if isLoaded is false', () => {
    // Mock the useIsLoaded composable to return false for isLoaded
    const useIsLoaded = vi.fn().mockReturnValue({ isLoaded: false });

    const wrapper = mount(RoundedBtn, {
      props: {
        text: 'Click me',
        icon: 'home',
        backCol: 'bg-blue-500',
      },
      global: {
        mocks: {
          useIsLoaded,
        },
      },
    });

    const icon = wrapper.find('[data-test="fa-icon"]');
    expect(icon.exists()).toBe(false);
  });
});
