<script setup lang="ts">
interface Ingredient {
  foodId: string;
  text: string;
}

const props = defineProps<{
  ingredients: Ingredient[];
}>();
</script>

<template>
  <ul>
    <li v-for="ingredient in props.ingredients" :key="ingredient.foodId">
      {{ ingredient.text }}
    </li>
  </ul>
</template>
