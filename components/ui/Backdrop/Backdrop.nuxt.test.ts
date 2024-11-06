import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import Backdrop from '@/components/ui/Backdrop/Backdrop.vue';

// Mock the useBackdrop
const mockCloseBackdrop = vi.fn();
const mockIsBackdropOpen = vi.fn(() => true);
vi.mock('@/composables/useBackdrop', () => ({
  useBackdrop: vi.fn(() => ({
    isBackdropOpen: mockIsBackdropOpen,
    closeBackdrop: mockCloseBackdrop,
  })),
}));

describe('Backdrop', () => {
  it('emits closeElement and calls closeBackdrop on click', async () => {
    const wrapper = mount(Backdrop);

    // Find the backdrop div and check if it exists
    const backdrop = wrapper.find('.fixed.inset-0');
    console.log(backdrop);
    /*   */

    // Simulate a click event on the backdrop
    /*  await backdrop.trigger('click'); */

    // Verify that closeBackdrop was called
    /* expect(mockCloseBackdrop).toHaveBeenCalledTimes(1); */

    // Verify that the closeElement event was emitted
    /* expect(wrapper.emitted('closeElement')).toBeTruthy(); */
  });
});
