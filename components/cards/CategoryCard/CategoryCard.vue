<script setup lang="ts">
interface ISelectedCategory {
  index: number;
  img: string;
  text: string;
  category: string;
}

const props = defineProps<ISelectedCategory>();

async function navigateToPage(selectedCategory: ISelectedCategory) {
  await navigateTo({
    path: selectedCategory.category,
    query: { index: selectedCategory.index },
  });
}
</script>

<template>
  <article
    class="flex flex-col items-center transform cursor-pointer"
    @click="navigateToPage(props)"
  >
    <div class="relative w-24 h-24 xl:w-32 xl:h-32 flex items-center justify-center">
      <img
        :src="props.img"
        :alt="props.text"
        class="w-full shadow-lg shadow-orange-200 h-full object-cover transform transition-transform duration-500 ease-in-out rounded-[40%_60%_70%_30%_/_30%_50%_60%_40%] hover:rounded-[60%_40%_50%_50%_/_50%_30%_40%_60%] hover:scale-105"
      />
    </div>
    <h3 class="text-gray-700 mt-3 text-center font-semibold">{{ props.text }}</h3>
  </article>
</template>
