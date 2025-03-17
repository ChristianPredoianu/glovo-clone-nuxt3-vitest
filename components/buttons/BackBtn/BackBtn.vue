<script setup lang="ts">
//Import for testing purposes
import { useRouter } from 'vue-router';

const props = defineProps({
  page: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['clicked']);

const router = useRouter();
const { isLoaded } = useIsLoaded();

function goToPage() {
  router.push(`${props.page}`);
}
</script>

<template>
  <button
    class="bg-green-700 text-white py-4 px-10 rounded-xl font-semibold cursor-pointer hover:bg-green-600"
    @click="goToPage"
  >
    <div class="flex items-center gap-x-2">
      <font-awesome-icon
        v-if="isLoaded"
        :icon="['fas', 'fa-chevron-left']"
        class="text-sm"
      />
      <span class="leading-none">Back</span>
    </div>
  </button>
</template>
