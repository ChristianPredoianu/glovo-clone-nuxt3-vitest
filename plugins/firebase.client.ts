import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const firebaseConfig = {
    apiKey: 'AIzaSyArPI4RkedDOJk1aX0XunDxiqu4ONcngBs',
    authDomain: 'glovo-clone-new.firebaseapp.com',
    projectId: 'glovo-clone-new',
    databaseURL: 'https://glovo-clone-new-default-rtdb.firebaseio.com/',
    storageBucket: 'glovo-clone-new.firebasestorage.app',
    messagingSenderId: '405556089874',
    appId: '1:405556089874:web:c66a434bc84f9e2b2b74cb',
    measurementId: 'G-4ELCW1179D',
  };

  // Initialize Firebase app if not already initialized
  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

  // Initialize Firebase services
  const auth = getAuth(app);
  const database = getDatabase(app);

  nuxtApp.vueApp.provide('auth', auth);
  nuxtApp.provide('auth', auth);

  nuxtApp.vueApp.provide('database', database);
  nuxtApp.provide('database', database);
});
