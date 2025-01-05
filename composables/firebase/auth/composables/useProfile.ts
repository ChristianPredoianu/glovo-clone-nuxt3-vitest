import { updateProfile, updateEmail } from 'firebase/auth';
import {
  successMessage,
  authErrorMessage,
  user,
} from '@/composables/firebase/auth/store/authStore';

const DELAY = 2000;

export function useProfile() {
  const { reauthenticate, sendUserEmailVerification } = useAuthActions();
  const {
    setProfileUpdateSuccessMessage,
    setSuccessMessageWithTimeout,
    handleAuthError,
    setErrorMessage,
  } = useMessageHandler();

  async function updateUserProfile(
    userName: string,
    userEmail: string,
    currentPassword: string
  ) {
    authErrorMessage.value = null;
    successMessage.value = null;

    if (!validateCurrentPassword(currentPassword)) return;
    if (!user.value) return;

    try {
      const isEmailChanged = hasEmailChanged(userEmail, user.value.email);
      const isDisplayNameChanged = hasDisplayNameChanged(
        userName,
        user.value.displayName
      );

      await handleUpdate(
        isEmailChanged,
        () => handleEmailChange(userEmail, currentPassword),
        reauthenticate,
        currentPassword,
        'Failed to update email. Please try again later.'
      );

      await handleUpdate(
        isDisplayNameChanged,
        () => updateUserName(userName),
        reauthenticate,
        currentPassword,
        'Failed to update display name. Please try again later.'
      );

      setProfileUpdateSuccessMessage(isEmailChanged, isDisplayNameChanged);
    } catch (error: any) {
      handleAuthError(error.code);
    }
  }

  function validateCurrentPassword(currentPassword: string): boolean {
    if (!currentPassword.trim()) {
      setErrorMessage('Please enter your current password to proceed.');
      return false;
    }
    return true;
  }

  async function reauthenticateUser(currentPassword: string) {
    await reauthenticate(currentPassword);
  }

  async function handleUpdate(
    isChanged: boolean,
    updateFn: () => Promise<void>,
    reauthenticateFn: (password: string) => Promise<boolean>,
    currentPassword: string,
    errorMsg: string
  ) {
    if (isChanged) {
      const isReauthenticated = await reauthenticateFn(currentPassword);
      isReauthenticated ? await updateFn() : setErrorMessage(errorMsg);
    }
  }

  function hasEmailChanged(newEmail: string, currentEmail: string | null): boolean {
    return newEmail !== currentEmail;
  }

  function hasDisplayNameChanged(newName: string, currentName: string | null): boolean {
    return newName.trim().toLowerCase() !== (currentName?.trim().toLowerCase() || '');
  }

  async function handleEmailChange(newEmail: string, currentPassword: string) {
    if (!currentPassword)
      throw new Error('Please enter your current password to update your email.');

    await reauthenticate(currentPassword);
    await updateUserEmail(newEmail);
    await sendUserEmailVerification();
  }

  async function updateUserEmail(userEmail: string) {
    if (user.value) {
      try {
        await updateEmail(user.value, userEmail);
        console.log('Email updated:', userEmail);
        setSuccessMessageWithTimeout('Your email has been successfully updated!');
      } catch (error) {
        console.error('Error updating email:', error);
        authErrorMessage.value =
          'Failed to update email. Please ensure the new email is valid and try again.';
        return;
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

  return { updateUserProfile };
}
