<script setup lang="ts">
import { capitalizeFirstLetter } from '@/helpers/capitalizeFirstLetter';

interface Item {
  [key: string]: any;
}

const props = defineProps({
  items: {
    type: Array as PropType<Item[]>,
    required: true,
    default: () => [],
  },
  field: {
    type: String,
    required: true,
  },
});

function getItemField(item: Item, field: string): string {
  const nestedFields = field.split('.');

  let value: any = item;

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
