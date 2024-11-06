import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const firebaseConfig = {
    apiKey: config.firebase.apiKey,
    authDomain: config.firebase.authDomain,
    projectId: config.firebase.projectId,
    databaseURL: config.firebase.databaseURL,
    storageBucket: config.firebase.storageBucket,
    messagingSenderId: config.firebase.messagingSenderId,
    appId: config.firebase.appId,
    measurementId: config.firebase.measurementId,
  };

  // Initialize Firebase app if not already initialized
  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

  const auth = getAuth(app);
  const database = getDatabase(app);

  nuxtApp.vueApp.provide('auth', auth);
  nuxtApp.provide('auth', auth);

  nuxtApp.vueApp.provide('database', database);
  nuxtApp.provide('database', database);
});
