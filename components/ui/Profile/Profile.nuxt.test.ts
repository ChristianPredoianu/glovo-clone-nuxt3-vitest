import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import Profile from '@/components/ui/Profile/Profile.vue';

vi.mock('@/composables/useAuth', () => ({
  useAuth: () => ({ user: { value: { email: 'test@example.com' } } }),
}));

vi.mock('@/composables/useIsLoaded', () => ({
  default: () => ({ isLoaded: true }),
}));

describe('Profile', () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = mount(Profile);
  });

  it('renders user email correctly', () => {
    const emailElement = wrapper.find('[data-test="email-element"]');
    expect(emailElement.text()).toBe('test@example.com');
  });

  /*  it('renders Admin text', () => {
    const adminElement = wrapper.find('p.text-xs');
    expect(adminElement.text()).toBe('Admin');
  }); */

  /*  it('renders the font-awesome icon when loaded', () => {
    const iconElement = wrapper.find('[data-test="fa-user"]');
    expect(iconElement.exists()).toBe(true);
  }); */

  /*  it('does not render the font-awesome icon when not loaded', async () => {
    vi.mock('@/composables/useIsLoaded', () => ({
      useIsLoaded: () => ({ isLoaded: false }),
    }));

    wrapper = mount(Profile);
    const iconElement = wrapper.find('[data-test="fa-user"]');
    expect(iconElement.exists()).toBe(false);
  }); */
});
