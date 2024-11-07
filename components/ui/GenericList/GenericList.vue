<script setup lang="ts">
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
</script>

<template>
  <ul class="flex flex-wrap gap-2 justify-around">
    <GenericListItem :items="items" :field="props.field" />
  </ul>
</template>
