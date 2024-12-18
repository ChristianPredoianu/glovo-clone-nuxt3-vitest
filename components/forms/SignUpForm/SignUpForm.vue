<script setup lang="ts">
import { handleKeyDown } from '@/helpers/helpers';

const userEmail = ref('');
const userPassword = ref('');
const repeatedUserPassword = ref('');

const { signUp, successMessage, user, authErrorMessage } = useAuth();
const {
  emailError,
  passwordError,
  repeatedPasswordError,
  validateEmail,
  validatePassword,
  validateRepeatedPassword,
} = useAuthValidation();
const { closeModal } = useModal();

async function handleSignUserUp(e: Event) {
  e.preventDefault();
  await signUp(userEmail.value, userPassword.value, repeatedUserPassword.value).then(
    () => {
      if (user.value !== null) {
        closeModal();
      }
    }
  );
}

function onKeyDown(e: KeyboardEvent) {
  handleKeyDown(e, handleSignUserUp);
}
</script>

<template>
  <form
    @submit.prevent="handleSignUserUp"
    @keydown="onKeyDown"
    class="flex flex-col gap-7 p-4"
  >
    <TextInput
      label="Email"
      name="email"
      type="email"
      v-model="userEmail"
      placeholder="email@example.com"
      :errorMessage="emailError || undefined"
      autocomplete="email"
      @blur="validateEmail(userEmail)"
    />

    <PasswordInput
      label="Password"
      name="password"
      v-model="userPassword"
      placeholder="At least 6 characters"
      :errorMessage="passwordError || undefined"
      autocomplete="current-password"
      @blur="validatePassword(userPassword)"
    />

    <PasswordInput
      label="Repeat Password"
      name="repeated-password"
      v-model="repeatedUserPassword"
      placeholder="At least 6 characters"
      :errorMessage="repeatedPasswordError || undefined"
      autocomplete="current-password"
      @blur="validateRepeatedPassword(userPassword, repeatedUserPassword)"
    />

    <FormSubmitBtn>Sign up</FormSubmitBtn>
    <AuthMessage
      :authErrorMessage="authErrorMessage || undefined"
      :successMessage="successMessage || undefined"
    />
  </form>
</template>
