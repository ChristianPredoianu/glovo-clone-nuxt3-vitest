<script setup lang="ts">
import type { IIngredient } from '@/interfaces/interfaces.interface.ts';

const props = defineProps({
  foodId: { type: String, required: true },
  text: { type: String, required: true },
  ingredients: {
    type: Array as () => IIngredient[],
  },
});
</script>

<template>
  <ul>
    <li v-for="ingredient in props.ingredients" :key="ingredient.foodId">
      {{ ingredient.text }}
    </li>
  </ul>
</template>
