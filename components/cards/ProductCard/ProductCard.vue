<script setup lang="ts">
import type { IProduct } from '@/types/products';

const props = defineProps({
  product: {
    type: Object as PropType<IProduct>,
    required: true,
  },
});

console.log(props.product);
</script>

<template>
  <article class="w-full shadow-lg cursor-pointer rounded-md">
    <div
      class="bg-white p-x-6 rounded-xl shadow-lg overflow-hidden flex flex-col items-center justify-center w-full h-full"
    >
      <div class="h-40 p-4 w-full">
        <NuxtImg
          :src="product?.image"
          alt="Product image"
          class="mx-auto rounded-lg transform transition-transform duration-300 hover:scale-105 object-contain h-full"
          format="webp"
          loading="lazy"
          fit="contain"
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
        <StarCounter :rate="props.product!.rating.rate" :count="product?.rating.count" />
      </div>
    </div>
  </article>
</template>
