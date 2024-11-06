<script setup lang="ts">
const props = defineProps<{
  items: Record<string, any>[];
  field: string;
}>();
</script>

<template>
  <ul class="flex flex-wrap gap-2 justify-around">
    <GenericListItem :items="items" :field="props.field" />
  </ul>
</template>
