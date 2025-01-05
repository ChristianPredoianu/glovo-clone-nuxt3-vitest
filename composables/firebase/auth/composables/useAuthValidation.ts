import {
  emailError,
  passwordError,
  repeatedPasswordError,
  userNameError,
} from '@/composables/firebase/auth/store/authStore';

const MIN_PASSWORD_LENGTH = 6;

export function useAuthValidation() {
  function validateEmail(email: string): boolean {
    const isEmailInvalid = !email || email === '';

    if (isEmailInvalid) {
      emailError.value = 'Email is required';
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isInvalidFormat = !emailRegex.test(email);

    if (isInvalidFormat) {
      emailError.value = 'Please enter a valid email';
      return false;
    }
    emailError.value = null;
    return true;
  }

  function validatePassword(password: string): boolean {
    const isPasswordEmpty = !password || password === '';

    if (isPasswordEmpty) {
      passwordError.value = 'Password is required';
      return false;
    }
    const isPasswordTooShort = password.length < MIN_PASSWORD_LENGTH;

    if (isPasswordTooShort) {
      passwordError.value = 'Password must be at least 6 characters long';
      return false;
    }
    passwordError.value = null;
    return true;
  }

  function validateRepeatedPassword(password: string, repeatedPassword: string): boolean {
    const arePasswordsMismatched = password !== repeatedPassword;

    if (arePasswordsMismatched) {
      repeatedPasswordError.value = 'Password and repeated password do not match';
      return false;
    }
    repeatedPasswordError.value = null;
    return true;
  }

  function validateUserName(name: string): void {
    const isNameEmpty = !name.trim();

    if (isNameEmpty) {
      userNameError.value = 'Username is required.';
    } else if (name.length < 3) {
      userNameError.value = 'Username must be at least 3 characters.';
    } else if (!/^[a-zA-Z\s]+$/.test(name)) {
      userNameError.value = 'Username can only contain letters and spaces.';
    } else {
      userNameError.value = '';
    }
  }

  function validateCredentials(email: string, password: string): boolean {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid) throw new Error('Invalid email format');

    if (!isPasswordValid) throw new Error('Invalid password');

    return true;
  }

  return {
    emailError,
    passwordError,
    repeatedPasswordError,
    userNameError,
    validateUserName,
    validateEmail,
    validatePassword,
    validateRepeatedPassword,
    validateCredentials,
  } as const;
}
