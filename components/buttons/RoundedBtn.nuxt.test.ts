import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import RoundedBtn from '@/components/buttons/RoundedBtn.vue';

describe('RoundedBtn.vue', () => {
  it('renders the correct icon and text based on props', () => {
    const wrapper = mount(RoundedBtn, {
      props: {
        text: 'Test Text',
        icon: 'fa-check',
        backCol: 'bg-red-500',
      },
      global: {
        stubs: {
          FontAwesomeIcon: {
            template: '<div :class="[$attrs.class]" :data-icon="icon"></div>',
          }, // Custom stub for FontAwesomeIcon
        },
      },
    });

    expect(wrapper.find('p').text()).toBe('Test Text');

    const icon = wrapper.findComponent({ name: 'FontAwesomeIcon' });
    expect(icon.exists()).toBe(true);
    expect(icon.props('icon')).toEqual(['fas', 'fa-check']);

    expect(icon.classes()).toContain('bg-red-500');
  });
});
