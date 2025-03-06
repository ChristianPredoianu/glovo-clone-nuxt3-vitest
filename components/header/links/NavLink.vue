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
const { openModal } = useModal();
const { closeNav } = useNav();

const isAuthenticated = ref(user);

const shouldShowNavItems = computed(() => {
  return (
    !(screenWidth.value > 768 && props.title === 'Cart') &&
    (screenWidth.value < 640 || props.title !== 'Sign in')
  );
});

const isModalLinks = computed(() => {
  return (props.title?.replace(' ', '') === 'Signin' || props.title === 'Cart') ?? false;
});

const shouldDisplayAuthNavLinks = computed(() => {
  return (
    shouldShowNavItems.value &&
    (isAuthenticated.value ||
      (props.title !== 'Dashboard' && props.title !== 'My Account'))
  );
});

function handleModalLinksClick() {
  props.title === 'Sign in' ? openModal('signin') : openModal('cart');
  closeNav();
}
</script>

<template>
  <li
    v-if="shouldDisplayAuthNavLinks"
    class="block sm:flex items-center text-2xl font-semibold text-gray-700 sm:text-sm text-teal-lighter sm:hover:text-gray-900 cursor-pointer sm:mr-4 transition duration-100 ease-in-out"
    :class="{
      'text-xs': screenWidth < 230,
    }"
  >
    <!-- Standard Nav Link -->
    <NuxtLink
      v-if="!isModalLinks"
      :to="props.link"
      @click="closeNav"
      class="w-full"
      aria-label="Navigate to {{ props.title }}"
    >
      <div
        class="w-full flex items-center justify-between border-b-2 sm:mt-1 sm:border-0 py-2 font-semibold cursor-pointer hover:bg-teal-100 transform transition-all duration-200 ease-in-out hover:px-2 hover:rounded-xl focus:ring-2 focus:ring-indigo-500"
      >
        {{ props.title }}
        <font-awesome-icon v-if="screenWidth < 640" :icon="props.icon" class="text-xl" />
      </div>
    </NuxtLink>

    <!-- Modal Trigger Links -->
    <div
      v-else
      @click="handleModalLinksClick"
      class="w-full cursor-pointer"
      aria-label="Open {{ props.title }} modal"
    >
      <div
        class="w-full flex items-center justify-between border-b-2 sm:mt-1 sm:border-0 py-2 cursor-pointer focus:ring-2 focus:ring-indigo-500"
      >
        {{ props.title }}
        <font-awesome-icon v-if="screenWidth < 640" :icon="props.icon" class="text-xl" />
      </div>
    </div>

    <!-- Cart Badge -->
    <p
      v-if="props.title === 'Cart' && shouldShowNavItems"
      class="hidden ml-1 bg-green-600 text-white rounded-full p-2 w-6 h-6 sm:flex items-center justify-center text-xs font-semibold"
    >
      {{ numberOfCartProducts }}
    </p>
  </li>
</template>
