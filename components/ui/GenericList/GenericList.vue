<script setup lang="ts">
const props = defineProps({
  items: {
    type: Array as PropType<Record<string, any>[]>,
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
