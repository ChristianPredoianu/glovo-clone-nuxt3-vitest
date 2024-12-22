import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const firebaseConfig = {
    apiKey: config.public.firebase.apiKey,
    authDomain: config.public.firebase.authDomain,
    databaseURL: config.public.firebase.databaseURL,
    projectId: config.public.firebase.projectId,
    storageBucket: config.public.firebase.storageBucket,
    messagingSenderId: config.public.firebase.messagingSenderId,
    appId: config.public.firebase.appId,
    measurementId: config.public.firebase.measurementId,
  };

  // Initialize Firebase app if not already initialized
  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

  const auth = getAuth(app);
  const database = getDatabase(app);

  nuxtApp.provide('auth', auth);
  nuxtApp.provide('database', database);
});
