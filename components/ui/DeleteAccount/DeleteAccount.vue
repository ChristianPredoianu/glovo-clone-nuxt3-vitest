<script setup lang="ts">
import { user } from '@/composables/firebase/auth/store/authStore';
import {
  successMessage,
  errorMessage,
} from '@/composables/firebase/store/messagehandlerStore';

const currentPassword = ref('');

const { $database } = useNuxtApp();
const { validatePassword, passwordError } = useAuthValidation();
const { deleteUserWithReauthentication, isLoading } = useAuth();

async function handleDeleteAccount() {
  if (!user.value?.email) return;

  passwordError.value = null; // Clear previous error

  // ✅ Store validation result in a variable
  const isValid = validatePassword(currentPassword.value);

  if (!isValid) return; // ✅ Prevent function from proceeding if invalid

  try {
    await deleteUserWithReauthentication(
      user.value.email,
      currentPassword.value,
      $database
    );

    if (successMessage.value) {
      navigateTo('/');
    }
  } catch (error) {
    console.error('Error deleting account:', error);
  }
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <h2 class="text-xl font-semibold text-gray-800 my-5">Delete Account</h2>

    <p v-if="user">
      Are you sure you want to delete the account linked to
      <span class="font-bold">{{ user.email }}</span> ?
    </p>
    <p v-else class="font-semibold">No user is currently signed in.</p>

    <form @submit.prevent="handleDeleteAccount" class="flex flex-col gap-4">
      <TextInput
        label="Current Password"
        name="currentPassword"
        type="password"
        v-model="currentPassword"
        placeholder="Your current password"
        :errorMessage="passwordError || undefined"
        autocomplete="current-password"
      />
      <FormMessage
        :errorMessage="errorMessage || undefined"
        :successMessage="successMessage || undefined"
      />

      <FormSubmitBtn v-if="!isLoading" class="w-fit" bgColor="bg-red-500"
        >Delete Account</FormSubmitBtn
      >
      <p v-else class="font-bold">Deleting account.......</p>
    </form>
  </div>
</template>
