<script setup lang="ts">
const props = defineProps({
  product: Object,
});

// Calculate the number of full, half, and empty stars based on the rating
const fullStars = computed(() => Math.floor(props.product?.rating.rate)); // Full stars count
const halfStar = computed(() => props.product?.rating.rate % 1 >= 0.5); // Half // Empty stars count
</script>

<template>
  <article class="w-full shadow-lg cursor-pointer rounded-md">
    <div
      class="bg-white p-x-6 rounded-xl shadow-lg overflow-hidden flex flex-col items-center justify-center w-full h-full"
    >
      <div class="h-40 p-4 w-full">
        <img
          :src="product?.image"
          alt="Product image"
          class="mx-auto rounded-lg transform transition-transform duration-300 hover:scale-105 object-contain h-full"
        />
      </div>
      <div class="flex flex-col flex-grow p-6">
        <h3
          class="text-sm tracking-widest text-center font-bold text-gray-800 mb-8 flex-grow"
        >
          {{ product?.title }}
        </h3>

        <p class="text-center text-lg font-semibold text-green-800">
          {{ product?.price }} $
        </p>
        <div class="flex flex-col items-center mb-4">
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
          <p class="ml-2 text-sm text-gray-600">({{ product?.rating.count }} reviews)</p>
        </div>
        <div class="mt-auto w-full">
          <button
            class="w-full bg-green-500 inline text-white py-2 px-4 shadow-md hover:bg-green-600 transition duration-200"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  </article>
</template>
