<script setup lang="ts">
import { handleKeyDown } from '@/helpers/helpers';

const userEmail = ref('');
const userPassword = ref('');

const emits = defineEmits(['emitSelected']);

const { signIn, user, successMessage, authErrorMessage } = useAuth();
const { emailError, passwordError, validateEmail, validatePassword } =
  useAuthValidation();
const { closeModal } = useModal();

async function handleSignIn(e: Event) {
  e.preventDefault();
  console.log('Sign in attempt with email:', userEmail.value);

  signIn(userEmail.value, userPassword.value).then(() => {
    console.log('Sign-in successful!');
    if (user.value !== null) {
      closeModal();
    }
  });
}

function onKeyDown(e: KeyboardEvent) {
  handleKeyDown(e, handleSignIn);
}
</script>

<template>
  <form
    @submit.prevent="handleSignIn"
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
      :errorMessage="passwordError"
      autocomplete="current-password"
      @blur="validatePassword(userPassword)"
    />

    <FormSubmitBtn>Sign In</FormSubmitBtn>
    <AuthMessage :authErrorMessage="authErrorMessage" :successMessage="successMessage" />
  </form>
</template>
