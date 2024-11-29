import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import SignUpForm from '@/components/forms/SignUpForm/SignUpForm.vue';
import { useAuth } from '@/composables/auth/useAuth';
import { useAuthValidation } from '@/composables/auth/useAuthValidation';
import { useModal } from '@/composables/ui/useModal';

vi.mock('@/composables/auth/useAuth', () => ({
  useAuth: vi.fn(() => ({
    signUp: vi.fn().mockResolvedValue(null),
    user: { value: null },
    successMessage: '',
    authErrorMessage: '',
  })),
}));

vi.mock('@/composables/auth/useAuthValidation', () => ({
  useAuthValidation: vi.fn(() => ({
    emailError: '',
    passwordError: '',
    repeatedPasswordError: '',
    validateEmail: vi.fn(),
    validatePassword: vi.fn(),
    validateRepeatedPassword: vi.fn(),
  })),
}));

vi.mock('@/composables/ui/useModal', () => ({
  useModal: vi.fn(() => ({
    closeModal: vi.fn(),
  })),
}));

describe('SignUpForm', () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = mount(SignUpForm);
  });

  it('renders the form correctly', () => {
    expect(wrapper.find('form').exists()).toBe(true);
    expect(wrapper.find('input[type="email"]').exists()).toBe(true);
    expect(wrapper.find('input[type="password"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="repeat-password"]').exists()).toBe(true);
  });

  it('calls signUp on form submit', async () => {
    const mockSignUp = vi.fn(() => Promise.resolve());
    const mockCloseModal = vi.fn();

    (useAuth as any).mockReturnValue({
      signUp: mockSignUp,
      user: { value: null },
      successMessage: '',
      authErrorMessage: '',
    });

    (useModal as any).mockReturnValue({
      closeModal: mockCloseModal,
    });

    wrapper = mount(SignUpForm);

    await wrapper.find('input[type="email"]').setValue('test@example.com');
    await wrapper.find('input[type="password"]').setValue('password123');
    await wrapper.find('[data-test="repeat-password"]').setValue('password123');
    await wrapper.find('form').trigger('submit.prevent');

    expect(mockSignUp).toHaveBeenCalledWith(
      'test@example.com',
      'password123',
      'password123'
    );
    expect(mockCloseModal).not.toHaveBeenCalled();
  });

  it('validates email, password, and repeated password on blur', async () => {
    const mockValidateEmail = vi.fn();
    const mockValidatePassword = vi.fn();
    const mockValidateRepeatedPassword = vi.fn();

    (useAuthValidation as any).mockReturnValue({
      emailError: '',
      passwordError: '',
      repeatedPasswordError: '',
      validateEmail: mockValidateEmail,
      validatePassword: mockValidatePassword,
      validateRepeatedPassword: mockValidateRepeatedPassword,
    });

    wrapper = mount(SignUpForm);

    await wrapper.find('input[type="email"]').trigger('blur');
    await wrapper.find('input[type="password"]').trigger('blur');
    await wrapper.find('[data-test="repeat-password"]').trigger('blur');

    expect(mockValidateEmail).toHaveBeenCalled();
    expect(mockValidatePassword).toHaveBeenCalled();
    expect(mockValidateRepeatedPassword).toHaveBeenCalled();
  });

  it('displays error messages correctly', async () => {
    const mockAuthErrorMessage = 'Authentication failed';
    const mockEmailError = 'Invalid email';
    const mockPasswordError = 'Invalid password';
    const mockRepeatedPasswordError = 'Passwords do not match';

    (useAuth as any).mockReturnValue({
      signUp: vi.fn(),
      user: { value: null },
      successMessage: '',
      authErrorMessage: mockAuthErrorMessage,
    });

    (useAuthValidation as any).mockReturnValue({
      emailError: mockEmailError,
      passwordError: mockPasswordError,
      repeatedPasswordError: mockRepeatedPasswordError,
      validateEmail: vi.fn(),
      validatePassword: vi.fn(),
      validateRepeatedPassword: vi.fn(),
    });

    wrapper = mount(SignUpForm);

    // Check email error message
    const emailErrorElement = wrapper.findAll('p.text-red-600')[0];
    expect(emailErrorElement.text()).toBe(mockEmailError);

    // Check password error message
    const passwordErrorElement = wrapper.findAll('p.text-red-600')[1];
    expect(passwordErrorElement.text()).toBe(mockPasswordError);

    // Check repeated password error message
    const repeatedPasswordErrorElement = wrapper.findAll('p.text-red-600')[2];
    expect(repeatedPasswordErrorElement.text()).toBe(mockRepeatedPasswordError);

    // Check authentication error message
    expect(wrapper.find('p.text-red-500').text()).toBe(mockAuthErrorMessage);
  });
});
