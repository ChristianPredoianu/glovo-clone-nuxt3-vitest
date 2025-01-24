<script setup lang="ts">
import { handleEnterKey } from '@/composables/helpers/handleEnterKey';
import {
  successMessage,
  errorMessage,
} from '@/composables/firebase/store/messagehandlerStore';
//CHANGE TO REACTIVE
const userEmail = ref('');
const userPassword = ref('');

const emits = defineEmits(['emitSelected']);

const { signIn, user } = useAuth();
const {
  emailError,
  passwordError,
  validateEmail,
  validatePassword,
  validateCredentials,
} = useAuthValidation();
const { closeModal } = useModal();

async function handleSignIn(e: Event) {
  e.preventDefault();
  console.log('Sign in attempt with email:', userEmail.value);
  validateCredentials(userEmail.value, userPassword.value);
  console.log(errorMessage.value);
  signIn(userEmail.value, userPassword.value).then(() => {
    console.log('Sign-in successful!');

    if (user.value !== null) closeModal();
  });
}

function onKeyDown(e: KeyboardEvent) {
  handleEnterKey(e, handleSignIn);
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
      :errorMessage="passwordError || undefined"
      autocomplete="current-password"
      @blur="validatePassword(userPassword)"
    />
    <FormSubmitBtn>Sign In</FormSubmitBtn>
    <FormMessage
      :errorMessage="errorMessage || undefined"
      :successMessage="successMessage || undefined"
    />
  </form>
</template>
