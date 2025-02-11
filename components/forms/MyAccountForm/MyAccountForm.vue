<script setup lang="ts">
import { handleEnterKey } from '@/composables/helpers/handleEnterKey';
import { errorMessage } from '@/composables/firebase/store/messagehandlerStore';

const emit = defineEmits(['handleForm']);

const userCredentials = reactive({
  name: '',
  email: '',
  currentPassword: '',
});

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
    updateUserProfile(
      userCredentials.name,
      userCredentials.email,
      userCredentials.currentPassword
    );
  }
}

function validateForm(): boolean {
  validateUserName(userCredentials.name);
  validateEmail(userCredentials.email);

  return !userNameError.value && !emailError.value;
}

function onKeyDown(e: KeyboardEvent) {
  handleEnterKey(e, handleUpdateProfile);
}

watch(
  () => user.value,
  (newUser) => {
    if (newUser && isAuthReady) {
      userCredentials.name = newUser.displayName || '';
      userCredentials.email = newUser.email || '';
    }
  },
  { immediate: true }
);
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
      v-model="userCredentials.name"
      placeholder="Your Full name"
      :errorMessage="userNameError"
      autocomplete="username"
      @blur="validateUserName(userCredentials.name)"
    />

    <TextInput
      label="Email"
      name="email"
      type="email"
      v-model="userCredentials.email"
      placeholder="email@example.com"
      :errorMessage="emailError || undefined"
      autocomplete="username"
      @blur="validateEmail(userCredentials.email)"
    />

    <TextInput
      label="Current Password"
      name="currentPassword"
      type="password"
      v-model="userCredentials.currentPassword"
      placeholder="Your current password"
      :errorMessage="passwordError || undefined"
      autocomplete="current-password"
      @blur="validatePassword(userCredentials.currentPassword)"
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
