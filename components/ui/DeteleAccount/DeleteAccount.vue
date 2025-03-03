<script setup lang="ts">
import { user } from '@/composables/firebase/auth/store/authStore';
import {
  successMessage,
  errorMessage,
} from '@/composables/firebase/store/messagehandlerStore';

const currentPassword = ref('');

const { $database } = useNuxtApp();
const { validatePassword, passwordError } = useAuthValidation();

const { deleteUserWithReauthentication } = useAuth();

function handleDeleteAccount() {
  if (!user.value?.email || !currentPassword.value) return;

  deleteUserWithReauthentication(user.value.email, currentPassword.value, $database);
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="">
      <h2 class="text-xl font-semibold text-gray-800 my-5">Delete account</h2>
      <p v-if="user">
        Are you sure you want to delete the account linked to
        <span class="font-bold">{{ user.email }}</span>
      </p>
      <p v-else class="font-semibold">No user is currently signed in.</p>
    </div>
    <TextInput
      label="Current Password"
      name="currentPassword"
      type="password"
      v-model="currentPassword"
      placeholder="Your current password"
      :errorMessage="passwordError || undefined"
      autocomplete="current-password"
      @blur="validatePassword(currentPassword)"
    />
    <CtaBtn
      class="w-fit"
      backCol="bg-red-500"
      textCol="text-gray-200"
      @click="handleDeleteAccount"
      >Delete</CtaBtn
    >
    <FormMessage
      :errorMessage="errorMessage || undefined"
      :successMessage="successMessage || undefined"
    />
  </div>
</template>
