import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import NavList from '@/components/header/links/NavList.vue';
import { navLinks } from '@/data/navLinks';

// Mock the NavLink component
vi.mock('@/components/header/links/NavLink.vue', () => ({
  default: {
    name: 'NavLink',
    props: ['title', 'link', 'icon'],
    template: '<div>{{ title }}</div>',
  },
}));

describe('NavList', () => {
  it('renders a list of navigation links', () => {
    const wrapper = mount(NavList);

    const navLinkComponents = wrapper.findAllComponents({ name: 'NavLink' });
    expect(navLinkComponents).toHaveLength(navLinks.length);

    navLinks.forEach((navLink, index) => {
      const navLinkComponent = navLinkComponents[index];
      expect(navLinkComponent.props()).toMatchObject(navLink);
    });
  });
});
