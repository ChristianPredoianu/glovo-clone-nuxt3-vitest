<script setup lang="ts">
import type { IIngredient } from '@/types/meals';

const props = defineProps({
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
