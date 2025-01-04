import {
  reauthenticateWithCredential,
  EmailAuthProvider,
  sendEmailVerification,
} from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { user } from '@/composables/firebase/auth/store/authStore';

export function useAuthActions() {
  const {
    setSuccessMessageWithTimeout,
    handleAuthError,
    setVerificationMessageError,
    setErrorMessage,
  } = useMessageHandler();

  async function reauthenticate(currentPassword: string) {
    if (!user.value) {
      setErrorMessage('User not found. Please log in again.');
      return false;
    }
    // Reauthenticate the user using their current password
    const credential = EmailAuthProvider.credential(
      user.value?.email as string,
      currentPassword
    );
    try {
      await reauthenticateWithCredential(user.value, credential);
      console.log('Reauthentication successful');
      return true;
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        handleAuthError(error);
      } else {
        console.error('Unknown error during reauthentication:', error);
        setErrorMessage('An unexpected error occurred during reauthentication.');
      }
      return false;
    }
  }

  async function sendUserEmailVerification() {
    if (!user.value) return;

    if (user.value.emailVerified) {
      setSuccessMessageWithTimeout('Your email is already verified.');
      return;
    }

    try {
      await sendEmailVerification(user.value);
      setSuccessMessageWithTimeout(
        'A verification email has been sent to your new email address. Please verify it to complete the update.'
      );
    } catch (error: any) {
      setVerificationMessageError(error);
    }
  }
  return { reauthenticate, sendUserEmailVerification };
}
