<script setup lang="ts">
import { replaceRecipeText } from '@/helpers/replaceRecipeText';

interface IMealProps {
  category: string;
  label: string;
  img: string;
}

const props = defineProps<IMealProps>();

const { isLoaded } = useIsLoaded();

const mealItem = {
  category: props.category,
  label: props.label,
  img: props.img,
};
</script>

<template>
  <article class="flex shadow-lg p-6 flex-col relative cursor-pointer rounded-md">
    <div class="relative">
      <div class="relative overflow-hidden w-full max-w-[500px]">
        <img
          :src="props.img"
          :alt="props.label"
          class="rounded-lg transform transition-transform duration-300 hover:scale-105 object-cover w-full h-full"
        />
      </div>
      <p
        class="absolute bottom-2 left-2 px-2 py-1 text-sm font-semibold tracking-wide text-gray-100 bg-opacity-50 rounded-md"
        :style="{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }"
      >
        {{ props.category.charAt(0).toUpperCase() + props.category.slice(1) }}
      </p>
    </div>
    <div class="flex flex-col h-full">
      <h3 class="font-bold text-sm mt-1 flex-1">
        {{ replaceRecipeText(label) }}
      </h3>

      <div class="relative flex justify-between items-center mt-4">
        <div class="flex items-center gap-2 py-1 px-3 bg-amber-400 rounded-md">
          <font-awesome-icon
            v-if="isLoaded"
            :icon="['fas', 'fa-truck']"
            class="text-xs"
          />
          <p class="text-xs font-semibold">Free</p>
        </div>
        <div class="absolute right-0 z-50">
          <HeartBtn :mealItem="mealItem" />
        </div>
      </div>
    </div>
  </article>
</template>
