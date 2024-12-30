<script setup lang="ts">
import { capitalizeFirstLetter } from '@/composables/helpers/capitalizeFirstLetter';
import { replaceRecipeText } from '@/composables/helpers/replaceRecipeText';

interface IMealCardProps {
  recipe: {
    cuisineType: string[];
    label: string;
    image: string;
    category?: string;
  };
  price: number;
}

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
  <article class="flex shadow-lg p-6 flex-col relative cursor-pointer rounded-md">
    <div class="relative">
      <div class="relative overflow-hidden w-full max-w-[500px]">
        <NuxtImg
          :src="props.meal.recipe.image"
          :alt="replaceRecipeText(props.meal.recipe.label)"
          class="rounded-lg transform transition-transform duration-300 hover:scale-105 object-cover w-full h-full"
          format="webp"
          loading="lazy"
          height="auto"
          fit="cover"
        />
      </div>
      <p
        class="absolute bottom-2 left-2 px-2 py-1 text-sm font-semibold tracking-wide text-gray-100 bg-opacity-50 rounded-md"
        :style="{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }"
      >
        {{ capitalizeFirstLetter(props.meal.recipe.cuisineType[0]) }}
      </p>
    </div>
    <div class="flex flex-col h-full">
      <h3 class="font-bold text-sm mt-1 flex-1">
        {{ replaceRecipeText(props.meal.recipe.label) }}
      </h3>

      <div class="relative flex justify-between items-center mt-4">
        <div class="flex items-center gap-2 py-1 px-3 bg-amber-400 rounded-md">
          <font-awesome-icon
            v-if="isLoaded"
            data-test="fa-icon"
            :icon="['fas', 'fa-truck']"
            class="text-xs"
          />
          <p class="text-xs font-semibold">Free</p>
        </div>
        <div class="absolute right-0 z-50">
          <HeartBtn :mealItem="mealItem" />
        </div>
      </div>
      <p>{{ props.price }} $</p>
    </div>
  </article>
</template>
