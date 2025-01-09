import {
  reauthenticateWithCredential,
  EmailAuthProvider,
  sendEmailVerification,
} from 'firebase/auth';
import { errorMessage, user } from '@/composables/firebase/auth/store/authStore';

export function useAuthActions() {
  const { setSuccessMessageWithTimeout, resetMessage, handleError, setErrorMessage } =
    useMessageHandler();

  async function reauthenticate(currentPassword: string) {
    resetMessage(errorMessage);

    if (!user.value) {
      setErrorMessage('User not found. Please sign in again.');
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
      handleError(error);
      return false;
    }
  }

  async function sendUserEmailVerification() {
    resetMessage(errorMessage);

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
      setErrorMessage(
        'Failed to send verification email to your new email address. Please try again.'
      );
    }
  }
  return { reauthenticate, sendUserEmailVerification };
}
