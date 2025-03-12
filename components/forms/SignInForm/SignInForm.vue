<script setup lang="ts">
import { handleEnterKey } from '@/composables/helpers/handleEnterKey';
import {
  successMessage,
  errorMessage,
} from '@/composables/firebase/store/messagehandlerStore';

const emits = defineEmits(['emitSelected']);

const userCredentials = reactive({
  email: '',
  password: '',
});

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
  console.log('Sign in attempt with email:', userCredentials.email);
  console.log('Sign in attempt with email:', userCredentials.password);
  validateCredentials(userCredentials.email, userCredentials.password);

  signIn(userCredentials.email, userCredentials.password).then(() => {
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
    class="flex flex-col gap-6 w-full max-w-md mx-auto"
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
    <FormSubmitBtn>Sign In</FormSubmitBtn>
    <FormMessage
      :errorMessage="errorMessage || undefined"
      :successMessage="successMessage || undefined"
    />
  </form>
</template>
