<script setup lang="ts">
import { replaceRecipeText } from '@/composables/helpers/replaceRecipeText';
import type { IOrder } from '@/types';

const props = defineProps({
  orderedItems: {
    type: Array as PropType<IOrder[]>,
    required: true,
  },
});

const expanded = ref<string | number | null>(null);

const formattedDate = computed(() => {
  const date = new Date();
  date.setDate(date.getDate() + 2);

  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return date.toLocaleDateString('en-US', options);
});

const { isLoaded } = useIsLoaded();

function toggleExpand(id: string | number) {
  expanded.value = expanded.value === id ? null : id;
}
</script>

<template>
  <ul class="space-y-4">
    <li
      v-for="order in orderedItems"
      :key="order.id"
      class="border-2 border-gray-300 rounded-xl p-4 shadow-sm cursor-pointer transition-transform duration-200"
      @click="toggleExpand(order.id!)"
    >
      <div class="flex items-center justify-between">
        <!-- Order Header -->
        <div class="flex justify-between items-center mb-2">
          <div class="text-lg font-semibold text-gray-800">Order #{{ order.id }}</div>
        </div>
        <font-awesome-icon
          :icon="['fa', 'fa-plus']"
          data-test="fa-shipping"
          v-if="isLoaded"
          class="cursor-pointer text-xl"
        />
      </div>
      <!-- Order Details -->
      <transition name="expand">
        <div
          v-if="expanded === order.id"
          class="border-t border-gray-200 mt-4 pt-4 space-y-4"
        >
          <div class="flex items-center justify-between">
            <div
              class="inline-flex items-center gap-2 border rounded-md border-gray-200 p-2"
            >
              <p>Our warehouse</p>
              <font-awesome-icon
                :icon="['fa', 'fa-truck-fast']"
                data-test="fa-shipping"
                v-if="isLoaded"
                class="cursor-pointer text-xl"
              />
            </div>
            <p>Estimated arrival: {{ formattedDate }}</p>
          </div>
          <div
            v-for="orderedProduct in order.products"
            :key="orderedProduct.id"
            class="flex items-center border rounded-md border-gray-200 p-2"
          >
            <!-- Product Image -->
            <img
              src="@/public/glovo.jpg"
              alt="Ordered Product"
              class="w-16 h-16 rounded object-cover flex-shrink-0"
            />
            <!-- Product Details -->
            <div class="flex-1 pl-4">
              <div class="font-medium text-gray-800">
                {{ replaceRecipeText(orderedProduct.label) }}
              </div>
              <div class="text-sm font-medium text-gray-500">
                Price: ${{ orderedProduct.price }}
              </div>
              <div class="text-sm font-medium text-gray-500">
                Quantity: {{ orderedProduct.quantity }}
              </div>
            </div>
          </div>
          <div class="text-md font-medium text-gray-500 py-2 border-t border-t-gray-300">
            Total: {{ order.totalPrice }} $
          </div>
        </div>
      </transition>
    </li>
  </ul>
</template>

<style scoped>
.expand-enter-active,
.expand-leave-active {
  transition: max-height 0.5s ease, opacity 0.5s ease;
  overflow: hidden;
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
