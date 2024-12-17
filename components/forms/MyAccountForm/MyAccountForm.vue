<script setup lang="ts">
import { handleKeyDown } from '@/helpers/helpers';

const userName = ref('');
const userEmail = ref('');

const { validateEmail, emailError, validateUserName, userNameError } =
  useAuthValidation();

function handleUpdatePersonal(e: Event) {
  e.preventDefault();
  if (validateForm()) {
    console.log('Form Submitted:', {
      userName: userName.value,
      userEmail: userEmail.value,
    });
  }
}

function validateForm(): boolean {
  validateUserName(userName.value);
  validateEmail(userEmail.value);

  return !userNameError.value && !emailError.value;
}

function onKeyDown(e: KeyboardEvent) {
  handleKeyDown(e, handleUpdatePersonal);
}
</script>

<template>
  <form
    @submit.prevent="handleUpdatePersonal"
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
      :errorMessage="emailError"
      autocomplete="username"
      @blur="validateEmail(userEmail)"
    />

    <FormSubmitBtn>Update</FormSubmitBtn>
  </form>
</template>
