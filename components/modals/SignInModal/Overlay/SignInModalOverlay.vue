<script setup lang="ts">
import SignInForm from '@/components/forms/SignInForm/SignInForm.vue';
import SignUpForm from '@/components/forms/SignUpForm/SignUpForm.vue';

const currentComponent = ref<typeof SignInForm | typeof SignUpForm>(markRaw(SignInForm));
const isSignIn = ref<boolean>(true);

function toggleForm() {
  isSignIn.value
    ? (currentComponent.value = markRaw(SignUpForm))
    : (currentComponent.value = markRaw(SignInForm));

  isSignIn.value = !isSignIn.value;
}

function resetComponent() {
  currentComponent.value = SignInForm;
}

defineExpose({
  resetComponent,
});
</script>

<template>
  <section class="relative z-40 container mx-auto px-4">
    <div class="flex flex-col gap-7 p-4 md:p-10 w-full">
      <h3 class="text-center text-3xl font-bold pb-8">
        {{ isSignIn ? 'Sign In' : 'Sign Up' }}
      </h3>
      <img src="@/public/sign-in.svg" alt="sign in" class="mx-auto mb-8 w-24 h-24" />
      <component :is="currentComponent" @reset-component="" />
      <h4 class="-mt-10 ml-4">
        {{ isSignIn ? "Don't have an account?" : 'Already have an account?' }}
        <span class="text-yellow-600 font-semibold cursor-pointer" @click="toggleForm">{{
          isSignIn ? 'Sign up' : 'Sign in'
        }}</span>
      </h4>
    </div>
  </section>
</template>
