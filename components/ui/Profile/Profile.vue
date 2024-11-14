<script setup lang="ts">
const { user } = useAuth();
const { isLoaded } = useIsLoaded();

const userEmail = computed(() => user.value?.email ?? ''); // Fallback to an empty string if user is null
</script>

<template>
  <div class="inline-flex flex-col items-center justify-end md:flex-row gap-x-10 w-auto">
    <div class="flex flex-col gap-y-1">
      <p class="font-semibold text-sm">{{ userEmail }}</p>
      <p class="text-xs">Admin</p>
    </div>
    <div
      class="flex items-center justify-center bg-gray-200 rounded-full w-12 h-12 lg:w-16 lg:h-16"
    >
      <font-awesome-icon
        v-if="isLoaded"
        :icon="['fa', 'fa-user']"
        class="text-xl lg:text-2xl"
      />
    </div>
  </div>
</template>
