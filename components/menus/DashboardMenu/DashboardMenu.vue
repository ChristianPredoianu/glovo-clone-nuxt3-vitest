<script setup lang="ts">
const emit = defineEmits(['changeComponent']);

function handleClick(menuItem: string) {
  const component = menuItem;

  emit('changeComponent', component);
}
</script>

<template>
  <ul class="flex">
    <li class="cursor-pointer" @click="handleClick('ItemFavoritesListSection')">
      Your favorites
    </li>
    <li class="cursor-pointer" @click="handleClick('OrdersListSection')">Your orders</li>
  </ul>
</template>
