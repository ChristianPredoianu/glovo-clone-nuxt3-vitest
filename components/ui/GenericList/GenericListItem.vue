<script setup lang="ts">
import { capitalizeFirstLetter } from '@/helpers/capitalizeFirstLetter';
import type { IItem } from '@/interfaces/interfaces.interface';

const props = defineProps({
  items: {
    type: Array as PropType<IItem[]>,
    default: () => [],
  },
  field: {
    type: String,
    default: '',
  },
});

function getItemField(item: IItem, field: string) {
  const nestedFields = field.split('.'); // Split the field by '.' to handle nested properties

  let value = item;

  for (const nestedField of nestedFields) {
    if (value === null || value === undefined) return ''; // Handle null or undefined values
    value = value[nestedField];
  }
  return value != null ? String(value) : '';
}
</script>

<template>
  <li
    class="bg-orange-200 text-lg font-semibold p-4 rounded-3xl cursor-pointer"
    v-for="(item, key) in props.items"
    :key="key"
  >
    {{ capitalizeFirstLetter(getItemField(item, props.field || '')) }}
  </li>
</template>
