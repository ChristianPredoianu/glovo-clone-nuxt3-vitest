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
      :errorMessage="emailError"
      autocomplete="email"
      @blur="validateEmail(userEmail)"
    />

    <div class="flex flex-col">
      <label for="password" class="text-sm font-medium text-gray-700">Password</label>
      <input
        v-model="userPassword"
        data-testid="password"
        type="password"
        name="password"
        autocomplete="current-password"
        required
        class="w-full border-0 border-b-2 border-gray-300 py-2 px-1 mt-1"
        placeholder="At least 6 characters"
        @blur="validatePassword(userPassword)"
      />
      <p class="text-red-600 text-xs mt-1 h-4" :class="{ invisible: !passwordError }">
        {{ passwordError || '' }}
      </p>
    </div>

    <FormSubmitBtn>Sign In</FormSubmitBtn>
    <p
      class="mt-2 text-sm font-semibold"
      :class="authErrorMessage ? 'text-red-500' : 'text-green-500'"
    >
      {{ authErrorMessage ? authErrorMessage : successMessage }}
    </p>
  </form>
</template>
