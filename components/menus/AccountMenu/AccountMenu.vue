<script setup lang="ts">
import { menuData } from '@/data/accountMenuData';
import type { IMenuItem } from '@/interfaces/interfaces.interface';

const emit = defineEmits(['changeComponent']);

const { isLoaded } = useIsLoaded();

function handleClick(menuItem: IMenuItem) {
  const component = menuItem.component;

  emit('changeComponent', component);
}
</script>

<template>
  <ul class="sm:w-3/4 lg:w-2/5 flex flex-col gap-y-1">
    <li
      class="bg-gray-300 py-2"
      v-for="menuItem in menuData"
      :key="menuItem.id"
      @click="handleClick(menuItem)"
    >
      <div class="flex items-center w-full">
        <font-awesome-icon
          data-test="fa-user"
          v-if="isLoaded"
          :icon="menuItem.icon"
          class="text-xl p-2 lg:text-2xl border-r-2 flex-shrink-0 border-gray-500 w-1/6"
        />
        <span class="pl-2 flex-grow">{{ menuItem.menuText }}</span>
        <font-awesome-icon
          data-test="fa-chevron-right"
          v-if="isLoaded"
          :icon="['fa', 'fa-chevron-right']"
          class="text-xl lg:text-2xl flex-shrink-0 pr-2 w-1/6"
        />
      </div>
    </li>
  </ul>
</template>
