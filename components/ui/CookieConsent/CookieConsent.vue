<script setup lang="ts">
const cookieConsent = useCookie('cookieConsent');

function acceptCookies() {
  cookieConsent.value = 'accepted';
}

function declineCookies() {
  cookieConsent.value = 'declined';
}
</script>

<template>
  <div
    v-if="!cookieConsent"
    class="fixed z-50 bottom-4 left-4 right-4 bg-white shadow-lg p-4 rounded-lg flex justify-between items-center"
  >
    <p class="text-sm">
      We use cookies to improve your experience. By accepting, you agree to our use of
      cookies.
    </p>
    <div class="space-x-2">
      <button @click="acceptCookies" class="bg-green-600 text-white px-4 py-2 rounded">
        Accept
      </button>
      <button @click="declineCookies" class="bg-gray-500 text-white px-4 py-2 rounded">
        Decline
      </button>
    </div>
  </div>
</template>
