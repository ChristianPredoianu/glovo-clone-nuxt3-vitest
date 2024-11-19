import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import SignInForm from '@/components/forms/SignInForm/SignInForm.vue';
import { useAuth } from '@/composables/auth/useAuth';
import { useAuthValidation } from '@/composables/auth/useAuthValidation';
import { useModal } from '@/composables/ui/useModal';

vi.mock('@/composables/auth/useAuth', () => ({
  useAuth: vi.fn(() => ({
    signIn: vi.fn().mockResolvedValue(null),
    user: { value: null },
    successMessage: '',
    authErrorMessage: '',
  })),
}));

vi.mock('@/composables/auth/useAuthValidation', () => ({
  useAuthValidation: vi.fn(() => ({
    emailError: '',
    passwordError: '',
    validateEmail: vi.fn(),
    validatePassword: vi.fn(),
  })),
}));

vi.mock('@/composables/ui/useModal', () => ({
  useModal: vi.fn(() => ({
    closeModal: vi.fn(),
  })),
}));

describe('SignInForm.vue', () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = mount(SignInForm);
  });

  it('renders the form correctly', () => {
    expect(wrapper.find('form').exists()).toBe(true);
    expect(wrapper.find('input[type="email"]').exists()).toBe(true);
    expect(wrapper.find('input[type="password"]').exists()).toBe(true);
  });

  it('calls signIn on form submit', async () => {
    const mockSignIn = vi.fn(() => Promise.resolve());
    const mockCloseModal = vi.fn();

    (useAuth as any).mockReturnValue({
      signIn: mockSignIn,
      user: { value: null },
      successMessage: '',
      authErrorMessage: '',
    });

    (useModal as any).mockReturnValue({
      closeModal: mockCloseModal,
    });

    wrapper = mount(SignInForm);

    await wrapper.find('input[type="email"]').setValue('test@example.com');
    await wrapper.find('input[type="password"]').setValue('password123');
    await wrapper.find('form').trigger('submit.prevent');

    expect(mockSignIn).toHaveBeenCalledWith('test@example.com', 'password123');
    expect(mockCloseModal).not.toHaveBeenCalled();
  });

  it('validates email and password on blur', async () => {
    const mockValidateEmail = vi.fn();
    const mockValidatePassword = vi.fn();

    (useAuthValidation as any).mockReturnValue({
      emailError: '',
      passwordError: '',
      validateEmail: mockValidateEmail,
      validatePassword: mockValidatePassword,
    });

    wrapper = mount(SignInForm);

    await wrapper.find('input[type="email"]').trigger('blur');
    await wrapper.find('input[type="password"]').trigger('blur');

    expect(mockValidateEmail).toHaveBeenCalled();
    expect(mockValidatePassword).toHaveBeenCalled();
  });

  it('displays error messages correctly', async () => {
    const mockAuthErrorMessage = 'Authentication failed';
    const mockEmailError = 'Invalid email';
    const mockPasswordError = 'Invalid password';

    (useAuth as any).mockReturnValue({
      signIn: vi.fn(),
      user: { value: null },
      successMessage: '',
      authErrorMessage: mockAuthErrorMessage,
    });

    (useAuthValidation as any).mockReturnValue({
      emailError: mockEmailError,
      passwordError: mockPasswordError,
      validateEmail: vi.fn(),
      validatePassword: vi.fn(),
    });

    wrapper = mount(SignInForm);

    const emailErrorElement = wrapper.findAll('p.text-red-600')[0];
    expect(emailErrorElement.text()).toBe(mockEmailError);

    const passwordErrorElement = wrapper.findAll('p.text-red-600')[1];
    expect(passwordErrorElement.text()).toBe(mockPasswordError);

    expect(wrapper.find('p.text-red-500').text()).toBe(mockAuthErrorMessage);
  });
});
