const MIN_PASSWORD_LENGTH = 6;

export function useAuthValidation() {
  const emailError = ref<string | null>(null);
  const passwordError = ref<string | null>(null);
  const repeatedPasswordError = ref<string | null>(null);

  function validateEmail(email: string): boolean {
    if (!email || email === '') {
      emailError.value = 'Email is required';
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      emailError.value = 'Please enter a valid email';
      return false;
    }
    emailError.value = null;
    return true;
  }

  function validatePassword(password: string): boolean {
    if (!password || password === '') {
      passwordError.value = 'Password is required';
      return false;
    }
    if (password.length < MIN_PASSWORD_LENGTH) {
      passwordError.value = 'Password must be at least 6 characters long';
      return false;
    }
    passwordError.value = null;
    return true;
  }

  function validateRepeatedPassword(password: string, repeatedPassword: string): boolean {
    if (password !== repeatedPassword) {
      repeatedPasswordError.value = 'Password and repeated password do not match';
      return false;
    }
    repeatedPasswordError.value = null;
    return true;
  }

  return {
    emailError,
    passwordError,
    repeatedPasswordError,
    validateEmail,
    validatePassword,
    validateRepeatedPassword,
  } as const;
}
