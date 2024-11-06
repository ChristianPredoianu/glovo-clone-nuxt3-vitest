<script setup lang="ts">
const props = defineProps({
  product: Object,
});
</script>
<template>
  <article class="flex flex-col gap-y-4 p-4 shadow-sm rounded-md cursor-pointer">
    <div class="relative">
      <img :src="product?.image" alt="Product image" class="mx-auto md:h-52" />
      <div
        class="absolute bottom-1 px-2 right-1 flex items-center justify-center gap-x-2 bg-gray-200 rounded-md"
      >
        <font-awesome-icon :icon="['fas', 'fa-thumbs-up']" />
        <p class="text-sm font-bold">{{ product?.rating.rate }}</p>
        <p class="text-xs">{{ product?.rating.count }}</p>
      </div>
    </div>

    <div class="flex justify-between">
      <h3 class="text-sm w-1/2">{{ product?.title }}</h3>
      <p class="text-xs">{{ product?.category }}</p>
    </div>
    <div class="flex items-center gap-x-1 justify-self-end mt-auto">
      <font-awesome-icon :icon="['fas', 'fa-bicycle']" class="text-amber-600" />
      <p class="text-amber-700 font-semibold">Free</p>
      <p>10-20min</p>
    </div>
  </article>
</template>
