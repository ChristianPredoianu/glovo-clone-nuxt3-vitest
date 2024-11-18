import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import BackBtn from '@/components/buttons/BackBtn.vue';

vi.mock('vue-router', () => ({
  useRouter: vi.fn().mockReturnValue({
    push: vi.fn(),
  }),
}));

vi.mock('@/composables/useIsLoaded', () => ({
  default: () => ({
    isLoaded: true,
  }),
}));

describe('BackBtn.vue', () => {
  it('renders correctly', () => {
    const wrapper = mount(BackBtn, {
      props: {
        page: '/',
      },
      global: {
        stubs: {
          FontAwesomeIcon: true,
        },
      },
    });

    expect(wrapper.find('button').exists()).toBe(true);

    expect(wrapper.find('span').text()).toBe('Back');
  });
});
