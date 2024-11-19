import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ref } from 'vue';
import AppHeader from '@/components/header/AppHeader.vue';

// Mock the composables
vi.mock('@/composables/ui/useNav', () => ({
  useNav: () => ({
    isNavOpen: ref(false),
    closeNav: vi.fn(),
  }),
}));

const mockUseAuth = {
  user: ref<null | { name: string }>(null), // Define the correct type for `user`
  signUserOut: vi.fn(),
};

vi.mock('@/composables/ui/useBackdrop', () => ({
  useBackdrop: () => ({
    closeBackdrop: vi.fn(),
  }),
}));

vi.mock('@/composables/ui/useScreenWidth', () => ({
  useScreenWidth: () => ({
    screenWidth: ref(1024), // Mock screen width
  }),
}));

vi.mock('@/composables/auth/useAuth', () => ({
  useAuth: () => ({
    user: ref(null), // Mock user being null (not logged in)
    signUserOut: vi.fn(),
  }),
}));

vi.mock('@/composables/us/useModal', () => ({
  useModal: () => ({
    openModal: vi.fn(),
    closeModal: vi.fn(),
  }),
}));

// Mock child components
vi.mock('@/components/modals/Modal/Modal.vue', () => ({
  default: {
    name: 'Modal',
    props: ['modalName'],
    template: '<div><slot /></div>',
  },
}));

vi.mock('@/components/header/Logo.vue', () => ({
  default: {
    name: 'Logo',
    template: '<div>Logo</div>',
  },
}));

vi.mock('@/components/header/Backdrop.vue', () => ({
  default: {
    name: 'Backdrop',
    props: ['closeElement'],
    template: '<div>Backdrop</div>',
  },
}));

vi.mock('@/components/header/Hamburger.vue', () => ({
  default: {
    name: 'Hamburger',
    template: '<div>Hamburger</div>',
  },
}));

vi.mock('@/components/header/NavItems.vue', () => ({
  default: {
    name: 'NavItems',
    template: '<div>NavItems</div>',
  },
}));

vi.mock('@/components/shared/CtaBtn.vue', () => ({
  default: {
    name: 'CtaBtn',
    props: ['fontSize', 'textCol', 'paddingX'],
    template: '<button><slot /></button>',
  },
}));

vi.mock('@/components/shared/CartCounter.vue', () => ({
  default: {
    name: 'CartCounter',
    template: '<div>CartCounter</div>',
  },
}));

describe('AppHeader.vue', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('renders AppHeader component', () => {
    const wrapper = mount(AppHeader);

    // Check if the header element is rendered
    expect(wrapper.find('header').exists()).toBe(true);

    // Check for the logo component
    expect(wrapper.findComponent({ name: 'Logo' }).exists()).toBe(true);
  });

  it('toggles navigation display based on isNavOpen', async () => {
    const wrapper = mount(AppHeader);

    // Initially, the navigation should be hidden
    expect(wrapper.find('#nav-list-div').classes()).toContain('-translate-x-[50rem]');

    // Change isNavOpen to true to open the navigation
    wrapper.vm.isNavOpen = true;
    await wrapper.vm.$nextTick(); // Wait for the DOM update

    // Now, the navigation should be visible
    expect(wrapper.find('#nav-list-div').classes()).toContain('translate-x-[0rem]');
  });

  it('shows sign-in button when user is not logged in', () => {
    // Ensure mock user is null
    mockUseAuth.user.value = null;

    const wrapper = mount(AppHeader);

    // Expect the sign-in button to be rendered because user is null
    const signInButton = wrapper.findComponent({ name: 'CtaBtn' });
    expect(signInButton.exists()).toBe(true);
    expect(signInButton.text()).toBe('Sign in');
  });

  it('shows sign-out button when user is logged in', async () => {
    // Mock the user being logged in
    vi.mock('@/composables/auth/useAuth', () => ({
      useAuth: () => ({
        user: ref({ name: 'Test User' }), // User is logged in
        signUserOut: vi.fn(),
      }),
    }));

    const wrapper = mount(AppHeader);
    await wrapper.vm.$nextTick();
    // Check for the sign-out button
    const signOutButton = wrapper.findComponent({ name: 'CtaBtn' });

    expect(signOutButton.exists()).toBe(true); // Ensure it exists
    expect(signOutButton.text()).toBe('Sign out'); // Check the button text
  });
});
