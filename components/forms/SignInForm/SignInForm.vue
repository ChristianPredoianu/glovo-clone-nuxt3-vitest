<script setup lang="ts">
import { handleKeyDown } from '@/helpers/keyDown';

const userEmail = ref('');
const userPassword = ref('');

const emits = defineEmits(['emitSelected']);

const { signIn, user, successMessage, authErrorMessage } = useAuth();
const { emailError, passwordError, validateEmail, validatePassword } =
  useAuthValidation();
const { closeModal } = useModal();
const router = useRouter();
const route = useRoute();

async function handleSignIn(e: Event) {
  e.preventDefault(); // Prevent default form submission
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
    <div class="flex flex-col">
      <label for="email" class="text-sm font-medium text-gray-700">Email</label>
      <input
        v-model="userEmail"
        type="email"
        name="email"
        autocomplete="username"
        required
        class="w-full border-0 border-b-2 border-gray-300 py-2 px-1 mt-1"
        placeholder="email@example.com"
        @blur="validateEmail(userEmail)"
      />
      <p class="text-red-600 text-xs mt-1 h-4" :class="{ invisible: !emailError }">
        {{ emailError || '' }}
      </p>
    </div>

    <div class="flex flex-col">
      <label for="password" class="text-sm font-medium text-gray-700">Password</label>
      <input
        v-model="userPassword"
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
    <div class="w-full">
      <button
        type="submit"
        class="w-full bg-green-600 text-gray-100 py-2 px-4 rounded-md hover:bg-green-700 transition-colors duration-300 ease-in-out transform hover:scale-105"
      >
        Sign In
      </button>
      <p
        class="mt-2 text-sm font-semibold"
        :class="authErrorMessage ? 'text-red-500' : 'text-green-500'"
      >
        {{ authErrorMessage ? authErrorMessage : successMessage }}
      </p>
    </div>
  </form>
</template>
