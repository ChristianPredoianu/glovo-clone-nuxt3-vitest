import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import InfoCard from '@/components/cards/InfoCard/InfoCard.vue';

describe('Info card', () => {
  it('renders correctly with props', async () => {
    const propsData = {
      icon: 'fa-coffee',
      heading: 'Coffee Time',
      paragraph: 'Enjoy a cup of coffee with friends or colleagues.',
      span: 'Coffee Break',
    };

    const wrapper = mount(InfoCard, {
      props: propsData,
    });

    expect(wrapper.find('font-awesome-icon').element.getAttribute('icon')).toBe(
      'fas,fa-coffee'
    );
    expect(wrapper.find('h3').text()).toBe('Coffee Time');
    expect(wrapper.find('p').text()).toContain(
      'Enjoy a cup of coffee with friends or colleagues.'
    );
    expect(wrapper.find('.bg-orange-400').text()).toBe('Coffee Break');
  });
});
