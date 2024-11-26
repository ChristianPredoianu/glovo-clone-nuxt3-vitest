import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import SignInModalOverlay from '@/components/modals/SignInModal/Overlay/SignInModalOverlay.vue';
import SignInForm from '@/components/forms/SignInForm/SignInForm.vue';
import SignUpForm from '@/components/forms/SignUpForm/SignUpForm.vue';

describe('SignInModalOverlay', () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = mount(SignInModalOverlay);
  });

  it('renders SignIn form by default', () => {
    expect(wrapper.findComponent(SignInForm).exists()).toBe(true);
    expect(wrapper.find('h3').text()).toBe('Sign In');
    expect(wrapper.find('h4').text()).toContain("Don't have an account?");
    expect(wrapper.find('span').text()).toBe('Sign up');
  });

  it('toggles to SignUp form when Sign up is clicked', async () => {
    await wrapper.find('span').trigger('click');

    expect(wrapper.findComponent(SignUpForm).exists()).toBe(true);
    expect(wrapper.find('h3').text()).toBe('Sign Up');
    expect(wrapper.find('h4').text()).toContain('Already have an account?');
    expect(wrapper.find('span').text()).toBe('Sign in');
  });

  it('toggles back to SignIn form when Sign in is clicked', async () => {
    await wrapper.find('span').trigger('click');

    await wrapper.find('span').trigger('click');

    expect(wrapper.findComponent(SignInForm).exists()).toBe(true);
    expect(wrapper.find('h3').text()).toBe('Sign In');
    expect(wrapper.find('h4').text()).toContain("Don't have an account?");
    expect(wrapper.find('span').text()).toBe('Sign up');
  });
});
