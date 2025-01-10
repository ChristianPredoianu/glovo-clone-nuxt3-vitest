<script setup lang="ts">
import { handleEnterKey } from '@/composables/helpers/handleEnterKey';
import { errorMessage } from '@/composables/firebase/auth/store/authStore';

const emit = defineEmits(['handleForm']);

//CHANGE TO RREACTIVE
const userName = ref('');
const userEmail = ref('');
const currentPassword = ref('');

const { user, isAuthReady, successMessage } = useAuth();
const { updateUserProfile } = useProfile();
const {
  validateEmail,
  emailError,
  validateUserName,
  validatePassword,
  passwordError,
  userNameError,
} = useAuthValidation();

async function handleUpdateProfile(e: Event) {
  e.preventDefault();

  if (validateForm()) {
    updateUserProfile(userName.value, userEmail.value, currentPassword.value);
  }
}

watch(
  () => user.value,
  (newUser) => {
    if (newUser && isAuthReady) {
      userName.value = newUser.displayName || '';
      userEmail.value = newUser.email || '';
    }
  },
  { immediate: true }
);

function validateForm(): boolean {
  validateUserName(userName.value);
  validateEmail(userEmail.value);

  return !userNameError.value && !emailError.value;
}

function onKeyDown(e: KeyboardEvent) {
  handleEnterKey(e, handleUpdateProfile);
}
</script>

<template>
  <h1 class="text-2xl font-semibold text-gray-800 my-5">Personal info</h1>
  <form
    @submit.prevent="handleUpdateProfile"
    @keydown="onKeyDown"
    class="flex flex-col gap-2"
  >
    <TextInput
      label="User Name"
      name="userName"
      v-model="userName"
      placeholder="Your Full name"
      :errorMessage="userNameError"
      autocomplete="username"
      @blur="validateUserName(userName)"
    />

    <TextInput
      label="Email"
      name="email"
      type="email"
      v-model="userEmail"
      placeholder="email@example.com"
      :errorMessage="emailError || undefined"
      autocomplete="username"
      @blur="validateEmail(userEmail)"
    />

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

    <FormSubmitBtn class="mt-10">Update</FormSubmitBtn>
  </form>
  <div class="mt-4 min-h-[60px]">
    <FormMessage
      :errorMessage="errorMessage || undefined"
      :successMessage="successMessage || undefined"
    />
  </div>
</template>
