import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ref } from 'vue';
import NavLink from '@/components/header/links/NavLink.vue';

// Mock the useScreenWidth composable
const mockScreenWidth = ref(500);
vi.mock('@/composables/useScreenWidth', () => ({
  useScreenWidth: () => ({
    screenWidth: mockScreenWidth,
  }),
}));

// Mock the useCart composable
const mockNumberOfCartProducts = ref(3);
vi.mock('@/composables/useCart', () => ({
  useCart: () => ({
    numberOfCartProducts: mockNumberOfCartProducts,
  }),
}));

describe('NavLink', () => {
  beforeEach(() => {
    // Reset all mocks before each test
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

    // Check if the title is rendered
    expect(wrapper.text()).toContain('Home');
  });

  it('hides Cart link on large screens', () => {
    // Set the screenWidth to a large value
    mockScreenWidth.value = 800;

    const wrapper = mount(NavLink, {
      props: {
        title: 'Cart',
        link: '/cart',
        icon: ['fas', 'shopping-cart'],
      },
    });

    // Check if the Cart link is not rendered on large screens
    expect(wrapper.html()).not.toContain('Cart');
  });

  it('hides Sign in link on small screens', () => {
    // Set the screenWidth to a small value
    mockScreenWidth.value = 500;

    const wrapper = mount(NavLink, {
      props: {
        title: 'Sign in',
        link: '/signin',
        icon: ['fas', 'sign-in-alt'],
      },
    });

    // Check if the Sign in link is not rendered on small screens
    expect(wrapper.html()).not.toContain('Sign in');
  });
});
