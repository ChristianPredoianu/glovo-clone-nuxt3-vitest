import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import Modal from '@/components/modals/Modal/Modal.vue';

import Backdrop from '@/components/ui/Backdrop/Backdrop.vue';
import CloseIcon from '@/components/ui/CloseIcon/CloseIcon.vue';

vi.mock('@/composables/ui/useModal', () => ({
  useModal: vi.fn(() => ({
    isModalOpen: vi.fn(() => true),
    closeModal: vi.fn(),
  })),
}));

describe('Modal', () => {
  it('renders correctly when the modal is open', () => {
    const wrapper = mount(Modal, {
      props: { modalName: 'testModal' },
      global: {
        components: {
          Backdrop,
          CloseIcon,
        },
      },
    });

    expect(document.body.querySelector('.fixed')).not.toBeNull();
  });

  it('closes the modal when the close button is clicked', async () => {
    const wrapper = mount(Modal, {
      props: { modalName: 'testModal' },
      global: {
        components: {
          Backdrop,
          CloseIcon,
        },
      },
      attachTo: document.body,
    });

    await wrapper.vm.$nextTick();

    const closeButton = document.body.querySelector('button');
    expect(closeButton).not.toBeNull(); // Ensure button exists
    await wrapper.vm.$nextTick();
    // Trigger the button click
    closeButton!.click(); // Trigger the click on the button
    await wrapper.vm.$nextTick();
    // Ensure the closeModal function is called once
    expect(useModal().closeModal).toHaveBeenCalledTimes(1); // Ensure the button exists

    /*  expect(useModal().closeModal).toHaveBeenCalledTimes(1); */
    /*  await closeButton.trigger('click');
    console.log(wrapper.html()); */

    /*  expect(useModal().closeModal).toHaveBeenCalledTimes(1); */
  });

  /*   it('closes the modal on escape key press', async () => {
    const wrapper = mount(Modal, {
      props: { modalName: 'testModal' },
      global: {
        components: {
          Backdrop,
          CloseIcon,
        },
      },
    });

    await wrapper.trigger('keydown.esc');

    expect(useModal().closeModal).toHaveBeenCalled();
  }); */

  /* it('teleports the modal to the body', () => {
    const wrapper = mount(Modal, {
      props: { modalName: 'testModal' },
      attachTo: document.body,
      global: {
        components: {
          Backdrop,
          CloseIcon,
        },
      },
    });

    expect(document.body.querySelector('.fixed')).not.toBeNull();
  }); */
});
