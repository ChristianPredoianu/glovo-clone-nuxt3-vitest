import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import RoundedBtn from '@/components/buttons/RoundedBtn/RoundedBtn.vue';

describe('RoundedBtn', () => {
  it('renders the correct icon and text based on props', () => {
    const wrapper = mount(RoundedBtn, {
      props: {
        text: 'Click Me',
        icon: 'home',
        backCol: 'bg-red-500',
      },
    });

    expect(wrapper.text()).toContain('Click Me');

    const icon = wrapper.find('[data-test="fa-icon"]');
    expect(icon.exists()).toBe(true);
    expect(icon.classes()).toContain('bg-red-500');
  });

  it('emits "emitClick" when the icon is clicked', async () => {
    const emitClickMock = vi.fn();

    const wrapper = mount(RoundedBtn, {
      props: {
        text: 'Click Me',
        icon: 'home',
        backCol: 'bg-red-500',
      },

      attrs: {
        onEmitClick: emitClickMock,
      },
    });

    const icon = wrapper.find('[data-test="fa-icon"]');
    await icon.trigger('click');

    expect(wrapper.emitted('emitClick')).toHaveLength(1);
  });

  it('renders correctly without props', () => {
    const wrapper = mount(RoundedBtn);

    const button = wrapper.find('button');
    expect(button.exists()).toBe(true);
  });
});
