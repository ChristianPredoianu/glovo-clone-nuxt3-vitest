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
  <ul class="flex flex-col space-y-2">
    <li
      v-for="order in orderedItems"
      :key="order.id"
      class="border rounded-xl p-2 cursor-pointer font-medium overflow-hidden"
      @click="toggleExpand(order.id!)"
    >
      <div>
        {{ order.id }}
      </div>
      <transition name="expand">
        <div v-if="expanded === order.id" class="font-normal overflow-hidden">
          <!-- Content to display when the li is expanded -->
          More details about the order:
        </div>
      </transition>
    </li>
  </ul>
</template>

<style scoped>
.expand-enter-active,
.expand-leave-active {
  transition: all 0.5s ease-in;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
}

.expand-enter-to,
.expand-leave-from {
  max-height: 500px;
  opacity: 1;
}
</style>
