import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import BackBtn from '@/components/buttons/BackBtn/BackBtn.vue';
import { createRouter, createMemoryHistory } from 'vue-router';

describe('BackBtn.vue', () => {
  it('renders correctly and calls router.push on click', async () => {
    const mockRouter = createRouter({
      history: createMemoryHistory(),
      routes: [],
    });

    const routerPushSpy = vi.spyOn(mockRouter, 'push');

    const wrapper = mount(BackBtn, {
      global: {
        plugins: [mockRouter],
      },
      props: {
        page: '/next-page',
      },
    });

    const button = wrapper.find('button');
    expect(button.exists()).toBe(true);

    await button.trigger('click');
    expect(routerPushSpy).toHaveBeenCalledWith('/next-page');
  });
});
