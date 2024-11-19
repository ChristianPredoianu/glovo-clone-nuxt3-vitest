import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ref } from 'vue';
import AppHeader from '~/components/header/AppHeader/AppHeader.vue';

const mockIsNavOpen = ref(false);
vi.mock('@/composables/ui/useNav', () => ({
  useNav: () => ({
    isNavOpen: mockIsNavOpen,
    closeNav: vi.fn(),
  }),
}));

vi.mock('@/composables/ui/useBackdrop', () => ({
  useBackdrop: () => ({
    closeBackdrop: vi.fn(),
  }),
}));

vi.mock('@/composables/ui/useScreenWidth', () => ({
  useScreenWidth: () => ({
    screenWidth: ref(1024),
  }),
}));

const mockSignUserOut = vi.fn();
let mockUser = ref<null | { name: string }>(null);

vi.mock('@/composables/auth/useAuth', () => ({
  useAuth: () => ({
    user: mockUser,
    signUserOut: mockSignUserOut,
  }),
}));

vi.mock('@/composables/us/useModal', () => ({
  useModal: () => ({
    openModal: vi.fn(),
    closeModal: vi.fn(),
  }),
}));

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

describe('AppHeader', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mockUser.value = null;
    mockIsNavOpen.value = false;
  });

  it('renders AppHeader component', () => {
    const wrapper = mount(AppHeader);

    expect(wrapper.find('header').exists()).toBe(true);

    expect(wrapper.findComponent({ name: 'Logo' }).exists()).toBe(true);
  });

  it('toggles navigation display based on isNavOpen', async () => {
    const wrapper = mount(AppHeader);

    expect(wrapper.find('#nav-list-div').classes()).toContain('-translate-x-[50rem]');

    mockIsNavOpen.value = true;

    await wrapper.vm.$nextTick();

    expect(wrapper.find('#nav-list-div').classes()).toContain('translate-x-[0rem]');
  });

  it('shows sign-in button when user is not logged in', () => {
    mockUser.value = null;

    const wrapper = mount(AppHeader);

    const signInButton = wrapper.findComponent({ name: 'CtaBtn' });
    expect(signInButton.exists()).toBe(true);
    expect(signInButton.text()).toBe('Sign in');
  });

  it('shows sign-out button when user is logged in', async () => {
    mockUser.value = { name: 'Test User' };

    const wrapper = mount(AppHeader);
    await wrapper.vm.$nextTick();

    const signOutButton = wrapper.findComponent({ name: 'CtaBtn' });

    expect(signOutButton.exists()).toBe(true);
    expect(signOutButton.text()).toBe('Sign out');
  });
});
