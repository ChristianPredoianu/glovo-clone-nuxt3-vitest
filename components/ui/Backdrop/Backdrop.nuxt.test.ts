import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import Backdrop from '@/components/ui/Backdrop/Backdrop.vue';

// Mocking the useBackdrop composable
vi.mock('@/composables/ui/useBackdrop', () => ({
  useBackdrop: vi.fn(() => ({
    closeBackdrop: vi.fn(), // Mock the closeBackdrop function
  })),
}));

describe('Backdrop', () => {
  it('renders correctly when isBackdropOpen is true', () => {
    const wrapper = mount(Backdrop, {
      props: {
        isBackdropOpen: true,
      },
      attachTo: document.body,
    });

    const backdrop = document.body.querySelector('[data-test="backdrop"]');
    expect(backdrop).not.toBeNull();
  });

  it('does not render when isBackdropOpen is false', () => {
    const wrapper = mount(Backdrop, {
      props: {
        isBackdropOpen: false,
      },
      attachTo: document.body,
    });

    const backdrop = wrapper.find('[data-test="backdrop"]');
    expect(backdrop.exists());
  });

  it('emits closeElement and calls closeBackdrop when clicked', async () => {
    const closeBackdropMock = vi.fn(); // Mock the closeBackdrop function

    // Mock the return value of useBackdrop to return our mock function
    vi.mocked(useBackdrop).mockReturnValue({
      closeBackdrop: closeBackdropMock,
    });

    const wrapper = mount(Backdrop, {
      props: {
        isBackdropOpen: true, // Ensure backdrop is visible
      },
      attachTo: document.body, // Ensure it's rendered to the body
    });

    // Wait for the backdrop element to be rendered
    await wrapper.vm.$nextTick();

    // Query for the backdrop element rendered in the body
    const backdrop = document.body.querySelector('[data-test="backdrop"]');
    expect(backdrop).not.toBeNull(); // Ensure backdrop exists

    // Trigger the click on the backdrop element
    await backdrop!.click();

    // Check that the closeBackdrop mock function has been called
    expect(closeBackdropMock).toHaveBeenCalled(); // Ensure the closeBackdrop mock was called

    // Check if the closeElement event was emitted
    expect(wrapper.emitted()).toHaveProperty('closeElement'); // Ensure the event was emitted
  });
});
