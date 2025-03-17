<script setup lang="ts">
import { capitalizeFirstLetter } from '@/composables/helpers/capitalizeFirstLetter';
import { replaceRecipeText } from '@/composables/helpers/replaceRecipeText';
import type { IMealCardProps } from '@/types';

const props = defineProps({
  index: Number,
  price: Number,
  meal: {
    type: Object as PropType<IMealCardProps>,
    required: true,
  },
});

const { isLoaded } = useIsLoaded();

const mealItem = {
  category: props.meal.recipe.cuisineType[0],
  label: props.meal.recipe.label,
  img: props.meal.recipe.image,
  price: props.price!,
};
</script>

<template>
  <article
    class="flex flex-col shadow-lg p-4 sm:p-6 relative cursor-pointer rounded-md bg-white w-full sm:max-w-[400px] md:max-w-[500px]"
  >
    <div class="relative">
      <div class="relative overflow-hidden w-full">
        <img
          :src="props.meal.recipe.image"
          :alt="replaceRecipeText(props.meal.recipe.label)"
          class="rounded-lg transform transition-transform duration-300 hover:scale-105 object-cover w-full sm:h-auto"
          loading="lazy"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>
      <p
        class="absolute bottom-2 left-2 px-2 py-1 text-xs sm:text-sm font-semibold tracking-wide text-gray-100 bg-opacity-50 rounded-md"
        :style="{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }"
      >
        {{ capitalizeFirstLetter(props.meal.recipe.cuisineType[0]) }}
      </p>
    </div>
    <div class="flex flex-col h-full mt-2 sm:mt-4">
      <h3 class="font-bold text-sm sm:text-base mt-1 flex-1 truncate">
        {{ replaceRecipeText(props.meal.recipe.label) }}
      </h3>

      <div class="relative flex justify-between items-center mt-4 sm:mt-5">
        <div class="flex items-center gap-2 py-1 px-3 bg-amber-400 rounded-md">
          <font-awesome-icon
            v-if="isLoaded"
            data-test="fa-icon"
            :icon="['fas', 'fa-truck']"
            class="text-xs sm:text-sm"
          />
          <p class="text-xs sm:text-sm font-semibold">Free</p>
        </div>
        <div class="absolute right-0 z-50">
          <HeartBtn :mealItem="mealItem" />
        </div>
      </div>

      <div class="flex justify-between mt-2 sm:mt-3">
        <p
          data-test="price"
          class="font-semibold text-green-600 mt-2 ml-1 text-lg sm:text-xl"
        >
          {{ props.price }} $
        </p>
      </div>
    </div>
  </article>
</template>
