import type { User, Auth } from 'firebase/auth';

declare module '#app' {
  interface NuxtApp {
    $auth: Auth;
  }
}

export const user = ref<User | null>(null);
export const isAuthReady = ref(false);
export const userNameError = ref('');
export const emailError = ref<string | null>(null);
export const passwordError = ref<string | null>(null);
export const repeatedPasswordError = ref<string | null>(null);
