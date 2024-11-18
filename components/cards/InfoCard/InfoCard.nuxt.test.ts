import { mount } from '@vue/test-utils';
import InfoCard from '@/components/cards/InfoCard/InfoCard.vue'; // Replace with actual component path

describe('ComponentName', () => {
  it('renders the icon, heading, paragraph, and span with correct values', async () => {
    const wrapper = mount(InfoCard, {
      props: {
        icon: 'coffee',
        heading: 'Heading',
        paragraph: 'This is a paragraph',
        span: 'Extra Info',
      },
    });
    expect(wrapper.find('font-awesome-icon').exists()).toBe(false);

    await wrapper.vm.$nextTick();

    const icon = wrapper.find('[data-test="fa-icon"]');
    expect(icon.exists()).toBe(true);
    expect(icon.classes()).toContain('text-7xl');
    expect(icon.classes()).toContain('text-orange-400');

    const heading = wrapper.find('h3');
    expect(heading.text()).toBe('Heading');

    const paragraph = wrapper.find('p');
    expect(paragraph.text()).toContain('This is a paragraph');

    const span = paragraph.find('span');
    expect(span.text()).toBe('Extra Info');
    expect(span.classes()).toContain('bg-orange-400');
  });
});
