<script setup lang="ts">
const { user } = useAuth();
const { isLoaded } = useIsLoaded();
</script>

<template>
  <div class="inline-flex py-4 flex-col items-center md:flex-row gap-x-10 w-auto">
    <div
      class="flex items-center justify-center bg-gray-200 rounded-full w-12 h-12 lg:w-16 lg:h-16"
    >
      <font-awesome-icon
        data-test="fa-user"
        v-if="isLoaded"
        :icon="['fa', 'fa-user']"
        class="text-xl lg:text-2xl"
      />
    </div>
    <div class="flex flex-col gap-y-1 mt-4">
      <p v-if="user?.email" data-test="email-element" class="font-semibold text-sm">
        {{ user.email }}
      </p>
      <p class="text-xs">Admin</p>
    </div>
  </div>
</template>
