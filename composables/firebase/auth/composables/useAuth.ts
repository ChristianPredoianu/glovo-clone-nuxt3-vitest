import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import {
  successMessage,
  errorMessage,
  user,
  isAuthReady,
} from '@/composables/firebase/auth/store/authStore';
import { delay } from '@/composables/helpers/delay';
import { error } from 'happy-dom/lib/PropertySymbol.js';

const DELAY = 2000;

export function useAuth(redirect: string | null = null) {
  const { $auth } = useNuxtApp();
  const router = useRouter();
  const {
    setSuccessMessageWithTimeout,
    resetMessage,
    resetMessages,
    setErrorMessage,
    handleAuthError,
  } = useMessageHandler();

  const {
    validateRepeatedPassword,
    validateCredentials,
    emailError,
    repeatedPasswordError,
  } = useAuthValidation();

  watchEffect(() => {
    if ($auth) {
      onAuthStateChanged($auth, (currentUser) => {
        user.value = currentUser;
        isAuthReady.value = true;
      });
    }
  });

  async function signUp(email: string, password: string, repeatedPassword: string) {
    resetMessages();

    try {
      validateCredentials(email, password);

      if (!validateRepeatedPassword(password, repeatedPassword)) {
        throw new Error('Password and repeated password do not match');
      }

      const userCredential = await createUserWithEmailAndPassword($auth, email, password);
      const user = userCredential.user;

      setSuccessMessageWithTimeout('Successfully signed up!');

      await delay(DELAY);
      await router.push('/dashboard');
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        if (error.message === 'Firebase: Error (auth/email-already-in-use).') {
          setErrorMessage(
            'This email is already in use. Please sign in or try another email.'
          );
        }
      }
    }
  }

  async function signIn(email: string, password: string): Promise<void> {
    resetMessages();

    try {
      validateCredentials(email, password);

      const userCredential = await signInWithEmailAndPassword($auth, email, password);
      const user = userCredential.user;

      setSuccessMessageWithTimeout('Successfully signed in!');

      await delay(DELAY);

      const redirectTo = redirect || '/dashboard'; // Use existing redirect if available
      await router.push(redirectTo);
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        handleAuthError(error);
        resetMessage(errorMessage);
      } else {
        console.log('dsasda');
        setErrorMessage('An error occurred. Please try again later.');
      }
      throw error;
    }
  }

  async function signUserOut() {
    try {
      resetMessage(errorMessage);

      await signOut($auth);

      console.log('User signed out successfully.');
      user.value = null;
      router.push('/');
    } catch (error) {
      if (error instanceof FirebaseError) {
        setErrorMessage(error.message);
      } else {
        console.error('Unexpected error during sign-out:', error);
        setErrorMessage('An unexpected error occurred. Please try again later.');
      }
    }
  }

  //REMEMBER YOU NEED TO MANUALLY DELETE THE USERS DATA FROM THE DATABASE
  async function deleteUserWithReauthentication(email: string, password: string) {
    try {
      const user = $auth.currentUser;
      if (!user) {
        throw new Error('No user is currently signed in.');
      }

      const credential = EmailAuthProvider.credential(email, password);
      await reauthenticateWithCredential(user, credential);

      await user.delete();
      console.log('User reauthenticated and deleted successfully.');
    } catch (error: any) {
      console.error('Error reauthenticating or deleting user:', error.message);
    }
  }

  return {
    isAuthReady,
    user,
    signIn,
    signUp,
    signUserOut,
    emailError,
    repeatedPasswordError,
    successMessage,
    errorMessage,
  } as const;
}
