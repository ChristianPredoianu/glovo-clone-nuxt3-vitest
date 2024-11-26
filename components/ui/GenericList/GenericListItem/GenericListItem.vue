<script setup lang="ts">
import { capitalizeFirstLetter } from '@/helpers/capitalizeFirstLetter';
import type { GenericListProps } from '@/interfaces/interfaces.interface';

const props = defineProps<{
  items: Array<Record<string, any>>;
  field: string;
}>();

function getItemField(item: Record<string, any>, field: string): string {
  const nestedFields = field.split('.');

  let value = item;

  // Traverse the object based on the nested fields
  for (const nestedField of nestedFields) {
    if (value == null) return '';
    value = value[nestedField];
  }
  return value != null ? String(value) : '';
}
</script>

<template>
  <ul class="flex flex-wrap gap-2 justify-around">
    <li
      v-for="(item, key) in props.items"
      :key="key"
      class="bg-orange-200 text-lg font-semibold p-4 rounded-3xl cursor-pointer"
    >
      {{ capitalizeFirstLetter(getItemField(item, props.field || '')) }}
    </li>
  </ul>
</template>
