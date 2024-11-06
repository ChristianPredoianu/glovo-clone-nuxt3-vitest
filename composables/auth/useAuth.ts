const DELAY = 2000;

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import type { User, Auth } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { delay } from '@/helpers/delay';

declare module '#app' {
  interface NuxtApp {
    $auth: Auth;
  }
}

export function useAuth() {
  const { $auth } = useNuxtApp();

  const successMessage = ref<string | null>(null);
  const authErrorMessage = ref<string | null>(null);
  const user = ref<User | null>(null);

  const router = useRouter();

  const {
    validateEmail,
    validatePassword,
    validateRepeatedPassword,
    emailError,
    repeatedPasswordError,
  } = useAuthValidation();

  function validateCredentials(email: string, password: string): boolean {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid) {
      throw new Error('Invalid email format');
    }

    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    return true;
  }

  function setSuccessMessageWithTimeout(message: string, duration: number) {
    successMessage.value = message;

    setTimeout(() => {
      successMessage.value = null;
    }, duration);
  }

  async function signUp(email: string, password: string, repeatedPassword: string) {
    successMessage.value = null;
    authErrorMessage.value = null;

    try {
      // Validate email and password
      validateCredentials(email, password);

      // Validate repeated password
      if (!validateRepeatedPassword(password, repeatedPassword)) {
        throw new Error('Password and repeated password do not match');
      }

      // If all validations pass, create the user
      const userCredential = await createUserWithEmailAndPassword($auth, email, password);
      const user = userCredential.user;

      setSuccessMessageWithTimeout('Successfully signed up!', DELAY);

      await delay(DELAY);

      await router.push('/dashboard');
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        if (error.message === 'Firebase: Error (auth/email-already-in-use).') {
          authErrorMessage.value =
            'This email is already in use. Please sign in instead.';
        }
      }
      console.log('Sign up failed:', authErrorMessage.value);
    }
  }

  async function signIn(email: string, password: string): Promise<void> {
    successMessage.value = null;
    authErrorMessage.value = null;

    try {
      validateCredentials(email, password);

      const userCredential = await signInWithEmailAndPassword($auth, email, password);
      const user = userCredential.user;
      console.log(user);
      setSuccessMessageWithTimeout('Successfully signed in!', DELAY);

      await delay(DELAY);

      await router.push('/dashboard');
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        if (error.message === 'Firebase: Error (auth/invalid-credential).') {
          authErrorMessage.value =
            'Invalid login credentials. Please check your email and password and try again.';
        }
      }
      throw error;
    }
  }

  function signUserOut() {
    authErrorMessage.value = null;
    signOut($auth)
      .then(() => {
        console.log('User signed out successfully.');
        user.value = null;
        router.push('/');
      })
      .catch((error) => {
        authErrorMessage.value = error.message;
      });
  }

  onMounted(() => {
    onAuthStateChanged($auth, (currentUser) => {
      if (currentUser) {
        user.value = currentUser;
        console.log('User is signed in:', user.value);
      } else {
        user.value = null;
        console.log('No user is signed in.');
      }
    });
  });

  return {
    emailError,
    repeatedPasswordError,
    signIn,
    signUp,
    signUserOut,
    user,
    successMessage,
    authErrorMessage,
  } as const;
}
