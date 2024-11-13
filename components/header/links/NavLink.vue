<script setup lang="ts">
const { screenWidth } = useScreenWidth();

const props = defineProps({
  title: String,
  link: String,
  icon: {
    type: Array as () => string[],
  },
});

const { numberOfCartProducts } = useCart();

const shouldShowNavItems = computed(() => {
  return (
    !(screenWidth.value > 768 && props.title === 'Cart') &&
    (screenWidth.value < 640 || props.title !== 'Sign in')
  );
});
</script>

<template>
  <li
    v-if="shouldShowNavItems"
    class="block sm:flex items-center text-2xl font-semibold text-gray-700 sm:text-sm text-teal-lighter sm:hover:text-white cursor-pointer sm:mr-4"
    :class="{
      'text-xs': screenWidth < 230,
    }"
  >
    <div
      class="w-full flex items-center justify-between border-b-2 sm:mt-1 sm:border-0 py-2 cursor-pointer"
    >
      {{ props.title }}
      <font-awesome-icon :icon="props.icon" v-if="screenWidth < 640" />
    </div>
    <p
      v-if="props.title === 'Cart' && shouldShowNavItems"
      class="ml-1 bg-green-500 text-white rounded-full p-2 w-6 h-6 flex items-center justify-center text-xs font-semibold"
    >
      {{ numberOfCartProducts }}
    </p>
  </li>
</template>
