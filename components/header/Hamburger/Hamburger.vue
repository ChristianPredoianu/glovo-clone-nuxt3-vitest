<script setup lang="ts">
const { openNav, isNavOpen } = useNav();
const { openBackdrop } = useBackdrop();

function openNavigation() {
  openNav();
  openBackdrop();
  console.log('Hamburger clicked, isNavOpen:', isNavOpen.value);
}
</script>

<template>
  <div class="block sm:hidden">
    <button
      @click="openNavigation"
      class="relative flex items-center px-3 py-2 border rounded text-black border-teal-light"
    >
      <svg
        class="fill-current h-3 w-3"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Menu</title>
        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
      </svg>
    </button>
  </div>
</template>
