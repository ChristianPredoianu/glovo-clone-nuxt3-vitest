<script setup lang="ts">
import type { GenericListProps } from '@/interfaces/interfaces.interface';

const props = defineProps<GenericListProps>();
</script>

<template>
  <ul class="flex flex-wrap gap-2 justify-around">
    <GenericListItem :items="items" :field="props.field" />
  </ul>
</template>
