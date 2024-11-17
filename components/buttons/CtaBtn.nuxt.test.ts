import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import CtaBtn from '@/components/buttons/CtaBtn.vue';

describe('CtaBtn.vue', () => {
  it('renders with the correct classes based on props', () => {
    const wrapper = mount(CtaBtn, {
      props: {
        fontSize: 'text-lg',
        backCol: 'bg-red-500',
        textCol: 'text-white',
        borderCol: 'border-black',
        borderWidth: 'border-2',
        paddingX: 'px-4',
      },
    });

    const button = wrapper.find('button');

    expect(button.exists()).toBe(true);

    expect(button.classes()).toContain('text-lg');
    expect(button.classes()).toContain('bg-red-500');
    expect(button.classes()).toContain('text-white');
    expect(button.classes()).toContain('border-black');
    expect(button.classes()).toContain('border-2');
    expect(button.classes()).toContain('px-4');
  });

  it('emits the "clicked" event when clicked', async () => {
    const wrapper = mount(CtaBtn);

    const button = wrapper.find('button');

    await button.trigger('click');

    expect(wrapper.emitted()).toHaveProperty('clicked');
    expect(wrapper.emitted('clicked')).toHaveLength(1);
  });

  it('renders slot content correctly', () => {
    const wrapper = mount(CtaBtn, {
      slots: {
        default: '<span>Click Me</span>',
      },
    });

    expect(wrapper.find('span').text()).toBe('Click Me');
  });
});
