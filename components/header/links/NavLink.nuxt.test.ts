import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import NavLink from '@/components/header/links/NavLink.vue'; // Adjust path as needed
import { useModal } from '@/composables/ui/useModal';
import { useNav } from '@/composables/ui/useNav';

vi.mock('@/composables/ui/useModal', () => ({
  useModal: () => ({
    openModal: vi.fn(),
  }),
}));

vi.mock('@/composables/ui/useNav', () => ({
  useNav: () => ({
    closeNav: vi.fn(),
  }),
}));

describe('NavLink.vue', () => {
  it('calls openModal and closeNav when modal link is clicked', async () => {
    const wrapper = mount(NavLink, {
      props: {
        title: 'Sign in',
      },
    });

    await wrapper.find('[data-testid="modal-link"]').trigger('click');
    await nextTick();

    expect(useModal().openModal).toHaveBeenCalled();
    expect(useNav().closeNav).toHaveBeenCalled();
  });
});
