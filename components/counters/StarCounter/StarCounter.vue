<script setup lang="ts">
const props = defineProps({
  rate: Number,
  count: Number,
});

const { isLoaded } = useIsLoaded();

// Calculate the number of full, half, and empty stars based on the rating
const fullStars = computed(() => Math.floor(props.rate!)); // Full stars count
const halfStar = computed(() => props.rate! % 1 >= 0.5); // Half // Empty stars count
</script>

<template>
  <div
    v-if="isLoaded"
    data-test="star-counter-div"
    class="flex flex-col items-center mb-4"
  >
    <div class="flex text-yellow-500 mt-2 mb-2">
      <!-- Full Stars -->
      <font-awesome-icon
        v-for="n in fullStars"
        :key="'full-' + n"
        data-test="fa-full-stars"
        :icon="['fas', 'fa-star']"
        class="text-xl"
      />
      <!-- Half Star -->
      <font-awesome-icon
        v-if="halfStar"
        data-test="fa-half-stars"
        :icon="['fas', 'fa-star-half-stroke']"
        class="text-xl"
      />
      <!-- Empty Stars -->
      <font-awesome-icon
        v-for="n in 5 - fullStars - (halfStar ? 1 : 0)"
        :key="'empty-' + n"
        data-test="fa-empty-stars"
        :icon="['fas', 'fa-star']"
        class="text-xl text-gray-300"
      />
    </div>
    <p class="ml-2 text-sm text-gray-600">({{ props.count! }} reviews)</p>
  </div>
</template>
