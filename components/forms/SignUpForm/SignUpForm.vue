<script setup lang="ts">
import {
  successMessage,
  errorMessage,
} from '@/composables/firebase/auth/store/authStore';
import { handleEnterKey } from '@/composables/helpers/handleEnterKey';
//CHANGE TO REACTIVE
const userEmail = ref('');
const userPassword = ref('');
const repeatedUserPassword = ref('');

const { signUp, user } = useAuth();
const { validateEmail, validatePassword, validateRepeatedPassword, validateCredentials } =
  useAuthValidation();
const { emailError, passwordError, repeatedPasswordError } = useAuthValidation();
const { closeModal } = useModal();

async function handleSignUserUp(e: Event) {
  e.preventDefault();
  validateCredentials(userEmail.value, userPassword.value);
  await signUp(userEmail.value, userPassword.value, repeatedUserPassword.value).then(
    () => {
      if (user.value !== null) {
        closeModal();
      }
    }
  );
}

function onKeyDown(e: KeyboardEvent) {
  handleEnterKey(e, handleSignUserUp);
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
    <FormMessage
      :errorMessage="errorMessage || undefined"
      :successMessage="successMessage || undefined"
    />
  </form>
</template>
