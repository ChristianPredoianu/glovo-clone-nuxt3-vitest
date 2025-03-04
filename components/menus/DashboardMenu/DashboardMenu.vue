<script setup lang="ts">
import { menuItems } from '@/data/dashboardMenuData';

const emit = defineEmits(['changeComponent']);

const activeSection = ref('');

function handleClick(section: string) {
  activeSection.value = section;
  emit('changeComponent', section);
}

onMounted(() => {
  const ItemFavoritesSection = menuItems[0].section;
  activeSection.value = ItemFavoritesSection;
});
</script>

<template>
  <ul class="flex items-center gap-4 mt-4 text-gray-100 font-medium">
    <li
      v-for="menuItem in menuItems"
      :key="menuItem.id"
      :class="[
        'py-2 px-4 cursor-pointer transition-all duration-200 rounded',
        activeSection === menuItem.section
          ? 'bg-green-600 text-gray-100 hover:bg-green-700'
          : 'border border-green-600 text-gray-900 hover:bg-green-700 hover:text-gray-100',
      ]"
      @click="handleClick(menuItem.section)"
    >
      {{ menuItem.name }}
    </li>
  </ul>
</template>
