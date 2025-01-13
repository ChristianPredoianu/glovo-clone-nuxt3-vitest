<script setup lang="ts">
import type { IOrder } from '@/types/cart/IOrder';

const props = defineProps({
  orderedItems: {
    type: Array as PropType<IOrder[]>,
    required: true,
  },
});

const expanded = ref<string | number | null>(null);

function toggleExpand(id: string | number) {
  expanded.value = expanded.value === id ? null : id;
}
</script>

<template>
  <ul>
    <li
      v-for="order in orderedItems"
      :key="order.id"
      :class="{ expanded: expanded === order.id }"
      @click="toggleExpand(order.id!)"
    >
      {{ order.id }}
      <div v-if="expanded === order.id" class="expanded-content">
        <!-- Content to display when the li is expanded -->
        More details about the order:
      </div>
    </li>
  </ul>
</template>
