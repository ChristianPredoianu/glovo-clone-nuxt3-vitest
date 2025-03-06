<script setup lang="ts">
import type { GenericListProps } from '@/types/common';
import { capitalizeFirstLetter } from '@/composables/helpers/capitalizeFirstLetter';

interface Item {
  [key: string]: any;
}

const props = defineProps<GenericListProps>();

function getItemField(item: Item, field: string): string {
  const nestedFields = field.split('.');

  let value: any = item;

  for (const nestedField of nestedFields) {
    if (value === null) return '';
    value = value[nestedField];
  }

  return value != null ? String(value) : '';
}
</script>

<template>
  <ul class="flex flex-wrap gap-4 justify-center">
    <li
      v-for="(item, key) in props.items"
      :key="key"
      class="bg-orange-200 text-lg font-semibold py-3 px-6 rounded-full cursor-pointer transition-all duration-300 ease-in-out transform hover:bg-orange-400 hover:shadow-lg"
    >
      {{ capitalizeFirstLetter(getItemField(item, props.field || '')) }}
    </li>
  </ul>
</template>
