import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import AppHeader from '@/components/header/AppHeader/AppHeader.vue';
import Hamburger from '@/components/header/Hamburger/Hamburger.vue';
import Logo from '@/components/header/Logo.vue';
import NavItems from '@/components/header/NavItems/NavItems.vue';
import CtaBtn from '@/components/buttons/CtaBtn/CtaBtn.vue';

describe('AppHeader.vue', () => {
  const mountAppHeader = (dataOverrides = {}) => {
    return mount(AppHeader, {
      data() {
        return {
          screenWidth: 800,
          user: null,
          ...dataOverrides,
        };
      },
      global: {
        components: {
          Hamburger,
          Logo,
          NavItems,
          CtaBtn,
        },
      },
    });
  };

  it('renders the component', () => {
    const wrapper = mountAppHeader();
    expect(wrapper.exists()).toBe(true);
  });

  it('contains the correct title', () => {
    const wrapper = mountAppHeader();
    const title = wrapper.find('h1');
    expect(title.text()).toBe('Connect | New Account');
  });

  it('renders the Hamburger component', () => {
    const wrapper = mountAppHeader();
    const hamburger = wrapper.findComponent(Hamburger);
    expect(hamburger.exists()).toBe(true);
  });

  it('renders the Logo component', () => {
    const wrapper = mountAppHeader();
    const logo = wrapper.findComponent(Logo);
    expect(logo.exists()).toBe(true);
  });

  it('renders the NavItems component', () => {
    const wrapper = mountAppHeader();
    const navItems = wrapper.findComponent(NavItems);
    expect(navItems.exists()).toBe(true);
  });

  it('shows Sign in button when user is null', () => {
    const wrapper = mountAppHeader();
    const signInBtn = wrapper.findComponent({
      name: 'CtaBtn',
      props: { text: 'Sign in' },
    });
    expect(signInBtn.exists()).toBe(true);
  });

  it('shows Sign out button when user is not null', () => {
    const wrapper = mountAppHeader({ user: { name: 'Test User' } });
    const signOutBtn = wrapper.findComponent({
      name: 'CtaBtn',
      props: { text: 'Sign out' },
    });
    expect(signOutBtn.exists()).toBe(true);
  });
});
