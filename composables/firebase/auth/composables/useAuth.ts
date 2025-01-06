import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import {
  successMessage,
  authErrorMessage,
  user,
  isAuthReady,
} from '@/composables/firebase/auth/store/authStore';
import { delay } from '@/composables/helpers/delay';

const DELAY = 2000;

export function useAuth(redirect: string | null = null) {
  const { $auth } = useNuxtApp();
  const router = useRouter();
  const { setSuccessMessageWithTimeout, resetMessage, setErrorMessage, handleAuthError } =
    useMessageHandler();

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
    successMessage.value = null;
    authErrorMessage.value = null;

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
    successMessage.value = null;
    authErrorMessage.value = null;

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
        resetMessage(authErrorMessage);
      } else {
        console.log('dsasda');
        setErrorMessage('An error occurred. Please try again later.');
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
        setErrorMessage(error.message);
      });
  }

  //Check this function !!!!!!!
  /*   async function deleteUser() {
    if (!user.value) return;

    try {
      await user.value.delete();
      console.log('User deleted:', user.value.email);
      setSuccessMessageWithTimeout('Your account has been successfully deleted.');
    } catch (error: any) {
      handleAuthError(error.code);
    }
  } */

  return {
    isAuthReady,
    user,
    signIn,
    signUp,
    signUserOut,
    emailError,
    repeatedPasswordError,
    successMessage,
    authErrorMessage,
  } as const;
}
