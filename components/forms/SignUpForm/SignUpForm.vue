<script setup lang="ts">
import { handleEnterKey } from '@/composables/helpers/handleEnterKey';
import {
  successMessage,
  errorMessage,
} from '@/composables/firebase/store/messagehandlerStore';

const userCredentials = reactive({
  email: '',
  password: '',
  repeatedPassword: '',
});

const { signUp, user } = useAuth();
const { validateEmail, validatePassword, validateRepeatedPassword, validateCredentials } =
  useAuthValidation();
const { emailError, passwordError, repeatedPasswordError } = useAuthValidation();
const { closeModal } = useModal();

async function handleSignUserUp(e: Event) {
  e.preventDefault();
  console.log('Sign up attempt with email:', userCredentials.email);
  console.log('Sign up attempt with email:', userCredentials.password);
  validateCredentials(userCredentials.email, userCredentials.password);
  await signUp(
    userCredentials.email,
    userCredentials.password,
    userCredentials.repeatedPassword
  ).then(() => {
    if (user.value !== null) closeModal();
  });
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
      v-model="userCredentials.email"
      placeholder="email@example.com"
      :errorMessage="emailError || undefined"
      autocomplete="email"
      @blur="validateEmail(userCredentials.email)"
    />

    <PasswordInput
      label="Password"
      name="password"
      v-model="userCredentials.password"
      placeholder="At least 6 characters"
      :errorMessage="passwordError || undefined"
      autocomplete="current-password"
      @blur="validatePassword(userCredentials.password)"
    />

    <PasswordInput
      label="Repeat Password"
      name="repeated-password"
      v-model="userCredentials.repeatedPassword"
      placeholder="At least 6 characters"
      :errorMessage="repeatedPasswordError || undefined"
      autocomplete="current-password"
      @blur="
        validateRepeatedPassword(
          userCredentials.password,
          userCredentials.repeatedPassword
        )
      "
    />

    <FormSubmitBtn>Sign up</FormSubmitBtn>
    <FormMessage
      :errorMessage="errorMessage || undefined"
      :successMessage="successMessage || undefined"
    />
  </form>
</template>
