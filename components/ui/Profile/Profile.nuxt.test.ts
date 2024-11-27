import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { nextTick } from 'vue';
import Profile from '@/components/ui/Profile/Profile.vue';

vi.mock('@/composables/auth/useAuth', () => ({
  useAuth: () => ({
    user: ref({ email: 'test@example.com' }),
  }),
}));

vi.mock('@/composables/useIsLoaded', () => ({
  default: () => ({ isLoaded: ref(true) }),
}));

describe('Profile', () => {
  let wrapper: any;

  beforeEach(() => {
    vi.clearAllMocks();
    wrapper = mount(Profile);
  });

  it('renders user email correctly', async () => {
    const emailElement = wrapper.find('[data-test="email-element"]');
    expect(emailElement.exists()).toBe(true);
    expect(emailElement.text()).toBe('test@example.com');
  });

  it('renders Admin text', async () => {
    await nextTick();
    const adminElement = wrapper.find('p.text-xs');
    expect(adminElement.text()).toBe('Admin');
  });

  it('renders the font-awesome icon when loaded', async () => {
    await nextTick();
    const iconElement = wrapper.find('[data-test="fa-user"]');
    expect(iconElement.exists()).toBe(true);
  });
});
