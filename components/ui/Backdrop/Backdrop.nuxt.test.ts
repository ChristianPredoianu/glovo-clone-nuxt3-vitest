import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import Backdrop from '@/components/ui/Backdrop/Backdrop.vue';

const closeBackdropMock = vi.fn();
vi.mock('@/composables/ui/useBackdrop', () => ({
  useBackdrop: vi.fn(() => ({
    closeBackdrop: closeBackdropMock,
  })),
}));

describe('Backdrop', async () => {
  it('renders correctly when isBackdropOpen is true', () => {
    const wrapper = mount(Backdrop, {
      props: {
        isBackdropOpen: true,
      },
      attachTo: document.body,
    });

    wrapper.vm.$nextTick();

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
    document.body.innerHTML = '<div id="teleport-target"></div>';

    const wrapper = mount(Backdrop, {
      props: {
        isBackdropOpen: true,
      },
      attachTo: '#teleport-target',
    });

    await wrapper.vm.$nextTick();

    const backdrop = document.body.querySelector('[data-test="backdrop"]');
    expect(backdrop).not.toBeNull();

    backdrop!.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(closeBackdropMock).toHaveBeenCalled();

    expect(wrapper.emitted()).toHaveProperty('closeElement');
  });
});
