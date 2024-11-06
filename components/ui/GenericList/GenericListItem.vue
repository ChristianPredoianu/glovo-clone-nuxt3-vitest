<script setup lang="ts">
import { capitalizeFirstLetter } from '@/helpers/capitalizeFirstLetter';

interface IItem {
  [key: string]: any;
}

const props = defineProps<{
  items: Record<string, any>[];
  field: string;
}>();

function getItemField(item: IItem, field: string) {
  const nestedFields = field.split('.'); // Split the field by '.' to handle nested properties

  let value = item;

  for (const nestedField of nestedFields) {
    if (value === null || value === undefined) return ''; // Handle null or undefined values
    value = value[nestedField];
  }
  return value;
}
</script>

<template>
  <li
    class="bg-orange-200 text-lg font-semibold p-4 rounded-3xl cursor-pointer"
    v-for="(item, key) in items"
    :key="key"
  >
    {{ capitalizeFirstLetter(getItemField(item, props.field)) }}
  </li>
</template>
