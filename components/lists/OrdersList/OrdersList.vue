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
  <ul class="space-y-4">
    <li
      v-for="order in orderedItems"
      :key="order.id"
      class="border border-gray-200 rounded-xl p-4 shadow-sm cursor-pointer transition-transform duration-200 hover:scale-105"
      @click="toggleExpand(order.id!)"
    >
      <!-- Order Header -->
      <div class="flex justify-between items-center mb-2">
        <div class="text-lg font-semibold text-gray-800">Order #{{ order.id }}</div>
      </div>

      <!-- Order Details -->
      <transition name="expand">
        <div
          v-if="expanded === order.id"
          class="border-t border-gray-200 mt-4 pt-4 space-y-4"
        >
          <div
            v-for="orderedProduct in order.products"
            :key="orderedProduct.id"
            class="flex items-center space-x-4"
          >
            <!-- Product Image -->
            <img
              src="../../../public/glovo.jpg"
              alt="Ordered Product"
              class="w-16 h-16 rounded object-cover flex-shrink-0"
            />
            <!-- Product Details -->
            <div class="flex-1">
              <div class="font-medium text-gray-800">{{ orderedProduct.label }}</div>
              <div class="text-sm text-gray-500">Price: ${{ orderedProduct.price }}</div>
              <div class="text-sm text-gray-500">
                Quantity: {{ orderedProduct.quantity }}
              </div>
            </div>
          </div>
        </div>
      </transition>
    </li>
  </ul>
</template>

<style scoped>
.expand-enter-active,
.expand-leave-active {
  transition: all 0.5s ease-in-out;
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
