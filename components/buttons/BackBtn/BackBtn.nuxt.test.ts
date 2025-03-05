/* import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import BackBtn from '@/components/buttons/BackBtn/BackBtn.vue';

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

describe('BackBtn', () => {
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
 */

// ButtonComponent.spec.ts
// components/buttons/BackBtn/BackBtn.nuxt.test.ts
// components/buttons/BackBtn/BackBtn.nuxt.test.ts
// components/buttons/BackBtn/BackBtn.nuxt.test.ts
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import BackBtn from '@/components/buttons/BackBtn/BackBtn.vue';

const push = vi.fn();

vi.mock('vue-router', () => ({
  useRouter: () => ({
    push,
  }),
}));

vi.mock('@/composables/useIsLoaded', () => ({
  default: () => ({
    isLoaded: true,
  }),
}));

describe('BackBtn', () => {
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

  it('navigates to the correct page when clicked', async () => {
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

    await wrapper.find('button').trigger('click');

    await wrapper.vm.$nextTick();
    console.log(push);
    expect(push).toHaveBeenCalled();
  });
});
