<script setup lang="ts">
import { menuItems } from '@/data/dashboardMenuData';

const emit = defineEmits(['changeComponent']);

const activeSection = ref('');

onMounted(() => {
  const ItemFavoritesSection = menuItems[0].section;
  activeSection.value = ItemFavoritesSection;
});

function handleClick(section: string) {
  activeSection.value = section;
  emit('changeComponent', section);
}
</script>

<template>
  <ul class="flex items-center gap-4 mt-4 text-gray-100 font-medium">
    <li
      v-for="item in menuItems"
      :key="item.id"
      :class="[
        'py-2 px-4 cursor-pointer transition-all duration-200 rounded',
        activeSection === item.section
          ? 'bg-green-600 text-gray-100 hover:bg-green-700'
          : 'border border-green-600 text-gray-900 hover:bg-green-700 hover:text-gray-100',
      ]"
      @click="handleClick(item.section)"
    >
      {{ item.name }}
    </li>
  </ul>
</template>
