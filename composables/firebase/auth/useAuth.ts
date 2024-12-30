const DELAY = 2000;

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  updateEmail,
  reauthenticateWithCredential,
  EmailAuthProvider,
  sendEmailVerification,
} from 'firebase/auth';
import type { User, Auth } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { delay } from '@/composables/helpers/delay';

declare module '#app' {
  interface NuxtApp {
    $auth: Auth;
  }
}

export function useAuth(redirect: string | null = null) {
  const { $auth } = useNuxtApp();

  const successMessage = ref<string | null>(null);
  const authErrorMessage = ref<string | null>(null);
  const user = ref<User | null>(null);
  const isAuthReady = ref(false);

  const router = useRouter();

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
      validateCredentials(email, password);

      if (!validateRepeatedPassword(password, repeatedPassword)) {
        throw new Error('Password and repeated password do not match');
      }

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
    }
  }

  async function signIn(email: string, password: string): Promise<void> {
    successMessage.value = null;
    authErrorMessage.value = null;

    try {
      validateCredentials(email, password);

      const userCredential = await signInWithEmailAndPassword($auth, email, password);
      const user = userCredential.user;

      setSuccessMessageWithTimeout('Successfully signed in!', DELAY);
      await delay(DELAY);

      const redirectTo = redirect || '/dashboard';
      await router.push(redirectTo as string);
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

  async function updateUserProfile(
    userName: string,
    userEmail: string,
    currentPassword: string
  ) {
    authErrorMessage.value = null;
    successMessage.value = null;

    try {
      if (user.value) {
        const needsReauthentication = userEmail !== user.value.email;

        //  Reauthentication if the email is changing
        if (needsReauthentication) {
          if (!currentPassword) {
            authErrorMessage.value =
              'Please enter your current password to update your email.';
            return;
          }
          await reauthenticate(currentPassword);
        }

        await updateUserEmail(userEmail);
        await sendUserEmailVerification();

        if (userName !== user.value.displayName) {
          await updateUserName(userName);
        }

        successMessage.value = successMessage.value || 'Profile updated successfully!';
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      authErrorMessage.value =
        'An error occurred while updating your profile. Please try again later.';
    }
  }

  async function reauthenticate(currentPassword: string) {
    // Reauthenticate the user using their current password
    const credential = EmailAuthProvider.credential(
      user.value?.email as string,
      currentPassword
    );
    if (user.value) {
      try {
        await reauthenticateWithCredential(user.value, credential);
        console.log('Reauthentication successful');
      } catch (error) {
        console.error('Error during reauthentication:', error);
        authErrorMessage.value =
          'Wrong password. Please check your current password and try again.';
        return;
      }
    }
  }

  async function updateUserEmail(userEmail: string) {
    if (user.value) {
      try {
        await updateEmail(user.value, userEmail);
        console.log('Email updated:', userEmail);

        successMessage.value = 'Your email has been successfully updated!';

        await delay(DELAY);
      } catch (error) {
        console.error('Error updating email:', error);
        authErrorMessage.value =
          'Failed to update email. Please ensure the new email is valid and try again.';
        return;
      }
    }
  }

  async function sendUserEmailVerification() {
    if (user.value) {
      if (user.value.emailVerified) {
        successMessage.value =
          'Your email is already verified. No need to send a verification email again.';
        return;
      } else {
        try {
          await sendEmailVerification(user.value);
          console.log('Verification email sent to new address.');

          successMessage.value =
            'A verification email has been sent to your new email address. Please verify it to complete the update.';

          await delay(DELAY);
        } catch (error: any) {
          console.error('Error sending email verification:', error);
          console.log(error.message);
          authErrorMessage.value = `Failed to send verification email to your new email address. Please try again.${
            error.message === 'Firebase: Error (auth/too-many-requests).'
              ? ' Too many requests'
              : ''
          }`;
          return;
        }
      }
    }
  }

  async function updateUserName(userName: string) {
    if (user.value) {
      try {
        await updateProfile(user.value, { displayName: userName });
        console.log('Display name updated:', userName);
        successMessage.value = 'Your display name has been successfully updated!';

        await delay(DELAY);
      } catch (error) {
        console.error('Error updating display name:', error);
        authErrorMessage.value = 'Failed to update display name. Please try again later.';
        return;
      }
    }
  }

  return {
    isAuthReady,
    user,
    signIn,
    signUp,
    signUserOut,
    updateUserProfile,
    emailError,
    repeatedPasswordError,
    successMessage,
    authErrorMessage,
  } as const;
}
