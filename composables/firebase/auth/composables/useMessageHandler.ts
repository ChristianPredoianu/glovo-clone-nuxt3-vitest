import {
  successMessage,
  errorMessage,
} from '@/composables/firebase/auth/store/authStore';
import { FirebaseError } from 'firebase/app';

const DELAY = 2000;

export function useMessageHandler() {
  function resetSuccessMessageWithTimeout(messageRef: { value: string | null }) {
    setTimeout(() => {
      messageRef.value = null;
    }, DELAY);
  }

  resetMessage(errorMessage);

  function resetMessage(message: globalThis.Ref<string | null, string | null>) {
    message.value = null;
  }

  function resetMessages() {
    successMessage.value = null;
    errorMessage.value = null;
  }

  function setSuccessMessageWithTimeout(message: string) {
    successMessage.value = message;
    resetSuccessMessageWithTimeout(successMessage);
  }

  function setErrorMessage(error: string) {
    errorMessage.value = error;
  }

  function setProfileUpdateSuccessMessage(
    isEmailChanged: boolean,
    isDisplayNameChanged: boolean
  ) {
    const message =
      !isEmailChanged && !isDisplayNameChanged
        ? 'No changes were made to your profile.'
        : 'Profile updated successfully!';

    successMessage.value = message;
    resetSuccessMessageWithTimeout(successMessage);
  }

  function setVerificationMessageError(error: any) {
    console.error('Error sending email verification:', error);

    const errMessage =
      error.message === 'Firebase: Error (auth/too-many-requests).'
        ? ' Too many requests'
        : '';

    errorMessage.value = `Failed to send verification email to your new email address. Please try again.${errMessage}`;
  }

  function handleAuthError(error: FirebaseError) {
    switch (error.code) {
      case 'auth/email-already-in-use':
        setErrorMessage('The email address is already in use by another account.');
        break;

      case 'auth/invalid-credential':
        setErrorMessage(
          'Invalid login credentials. Please check your email and password and try again.'
        );
        break;

      case 'auth/too-many-requests':
        setErrorMessage('Too many requests. Please try again later.');
        break;

      case 'auth/weak-password':
        setErrorMessage('The password is too weak. Please choose a stronger password.');
        break;

      case 'auth/user-not-found':
        setErrorMessage(
          'No user found with this email. Please check your email and try again.'
        );
        break;

      case 'auth/wrong-password':
        setErrorMessage('Incorrect password. Please check your password and try again.');
        break;

      case 'auth/account-exists-with-different-credential':
        setErrorMessage(
          'An account already exists with this email address, but with a different sign-in method.'
        );
        break;

      case 'auth/invalid-email':
        setErrorMessage(
          'The email address is not valid. Please provide a valid email address.'
        );
        break;

      case 'auth/timeout':
        setErrorMessage('The request timed out. Please try again later.');
        break;

      default:
        setErrorMessage('An unknown error occurred. Please try again later.');
        break;
    }
  }

  return {
    resetMessage,
    resetMessages,
    setSuccessMessageWithTimeout,
    handleAuthError,
    setErrorMessage,
    setProfileUpdateSuccessMessage,
    setVerificationMessageError,
  };
}
