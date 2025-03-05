<script setup lang="ts">
const props = defineProps({
  title: String,
  link: String,
  icon: {
    type: Array as () => string[],
  },
});

const { screenWidth } = useScreenWidth();
const { numberOfCartProducts } = useCart();
const { user } = useAuth();
const isAuthenticated = ref(user);

const shouldShowNavItems = computed(() => {
  return (
    !(screenWidth.value > 768 && props.title === 'Cart') &&
    (screenWidth.value < 640 || props.title !== 'Sign in')
  );
});

const shouldShowAuthNavItems = computed(() => {
  return (
    isAuthenticated.value || (props.title !== 'My Account' && props.title !== 'Dashboard')
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
      <template v-if="shouldShowAuthNavItems">
        {{ props.title }}
      </template>
      <font-awesome-icon :icon="props.icon" v-if="screenWidth < 640" />
    </div>
    <p
      v-if="props.title === 'Cart' && shouldShowNavItems"
      class="hidden ml-1 bg-green-600 text-white rounded-full p-2 w-6 h-6 sm:flex items-center justify-center text-xs font-semibold"
    >
      {{ numberOfCartProducts }}
    </p>
  </li>
</template>
