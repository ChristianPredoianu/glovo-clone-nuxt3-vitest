import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ref } from 'vue';
import NavLink from '@/components/header/links/NavLink.vue';

const mockScreenWidth = ref(500);
vi.mock('@/composables/useScreenWidth', () => ({
  useScreenWidth: () => ({
    screenWidth: mockScreenWidth,
  }),
}));

const mockNumberOfCartProducts = ref(3);
vi.mock('@/composables/useCart', () => ({
  useCart: () => ({
    numberOfCartProducts: mockNumberOfCartProducts,
  }),
}));

describe('NavLink', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('renders the NavLink component correctly', () => {
    const wrapper = mount(NavLink, {
      props: {
        title: 'Home',
        link: '/',
        icon: ['fas', 'home'],
      },
    });

    expect(wrapper.text()).toContain('Home');
  });

  it('hides Cart link on large screens', () => {
    mockScreenWidth.value = 800;

    const wrapper = mount(NavLink, {
      props: {
        title: 'Cart',
        link: '/cart',
        icon: ['fas', 'shopping-cart'],
      },
    });

    expect(wrapper.html()).not.toContain('Cart');
  });

  it('hides Sign in link on small screens', () => {
    mockScreenWidth.value = 500;

    const wrapper = mount(NavLink, {
      props: {
        title: 'Sign in',
        link: '/signin',
        icon: ['fas', 'sign-in-alt'],
      },
    });

    expect(wrapper.html()).not.toContain('Sign in');
  });
});
