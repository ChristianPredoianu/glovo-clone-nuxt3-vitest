<script setup lang="ts">
const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalItems: {
    type: Number,
    required: true,
  },
  itemsPerPage: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits<{
  (event: 'pageChanged', newPage: number): void;
}>();

const totalPages = computed(() => Math.ceil(props.totalItems / props.itemsPerPage));

const currentPage = ref(props.currentPage);

const { isLoaded } = useIsLoaded();

function goToPage(page: number) {
  if (page < 1 || page > totalPages.value) return;
  currentPage.value = page;

  emit('pageChanged', currentPage.value);
}
</script>

<template>
  <div class="flex items-center justify-center space-x-2 mt-4">
    <button
      @click="goToPage(currentPage - 1)"
      :disabled="currentPage === 1"
      class="px-2 py-1 md:px-4 md:py-2 text-white bg-green-600 rounded hover:bg-green-700 disabled:opacity-50"
    >
      <font-awesome-icon v-if="isLoaded" :icon="['fa', 'fa-chevron-left']" />
    </button>

    <span v-for="page in totalPages" :key="page">
      <button
        @click="goToPage(page)"
        :class="[
          'px-2 py-1 md:px-4 md:py-2 border rounded',
          {
            'bg-green-600 text-white': page === currentPage,
            'bg-white text-green-600 border-green-600 hover:bg-green-100':
              page !== currentPage,
          },
        ]"
      >
        {{ page }}
      </button>
    </span>

    <button
      @click="goToPage(currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="px-2 py-1 md:px-4 md:py-2 text-white bg-green-600 rounded hover:bg-green-700 disabled:opacity-50"
    >
      <font-awesome-icon v-if="isLoaded" :icon="['fa', 'fa-chevron-right']" />
    </button>
  </div>
</template>
